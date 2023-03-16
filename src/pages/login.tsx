import {auth , provider} from '../config/firebase'; 
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const  Login = () => { 
    // Navigate to the home page after sign in.
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
      // Sign in using a popup.
       const result = await signInWithPopup(auth, provider)
       navigate('/');
       
    }
    return  (
      <div>
        <p>Sign in with Google to continue</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
     </div>
      );
    };
