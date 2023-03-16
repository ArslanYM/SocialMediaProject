import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';

export const Navbar = () => {
  //sign out function
  const signUserOut = async () => {
    await signOut(auth);
  }
  //imported from react-firebase-hooks
  const [user] = useAuthState(auth);
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/'> Home</Link>
        <Link to='/login'> Login</Link>
      </div>
      <div className='user'>
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} alt="Profile Picture" width="20" height="20" />
          </>
        )}

        <button onClick={signUserOut}>Log Out</button>
      </div>

    </div>
  );
};
