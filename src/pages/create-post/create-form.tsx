import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'


export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    //interface for creating post
    interface CreateFormData {
        title: string;
        description: string;
    }
    // yup schema for validation
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required")
    });
    // handling errors with yup
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    });


    const postsRef = collection(db, 'posts');


    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            id :user?.uid,
        })
        navigate('/main');
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input type="text" placeholder="Title" {...register("title")} />
                <p style={{ color: "red" }}>{errors.title?.message}</p>
                <textarea placeholder="Description"
                    {...register("description")} />
                <p style={{ color: "red" }}>{errors.description?.message}</p>
                <input type="Submit" className='submitForm' />
            </form>
        </div>
    );
}