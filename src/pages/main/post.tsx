import {
   doc,
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Post as IPost } from "./main";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}
interface Like {
  likeId : string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setlikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setlikes(data.docs.map((doc) => ({ userId: doc.data().userId , likeId : doc.id })));
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setlikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId : newDoc.id }] : [{ userId: user?.uid , likeId : newDoc.id}]
        );
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("userId", "==", user?.uid),
        where("postId", "==", post.id)
      );

      const likeToDeleteData= await getDocs(likeToDeleteQuery);

      const likeId = likeToDeleteData.docs[0].id;

      const likeToDelete = doc(
        db,
        "likes",
        likeId
      );
      await deleteDoc(likeToDelete);
      if (user) {
        setlikes((prev) => prev && prev.filter((like) => like.likeId  !== likeId)
        );
      }
    } catch (erro) {
      console.log(erro);
    }
  };
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
      </div>
      <div>
        <button onClick={hasUserLiked?removeLike : addLike}>
          {" "}
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}{" "}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
