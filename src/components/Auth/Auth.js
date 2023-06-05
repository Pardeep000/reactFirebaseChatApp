import { auth, provider } from "../../firebase_config";
import { signInWithPopup } from "firebase/auth";
//
import './Styles.css'
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({setIsAuth}) => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
      <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button className="auth_button" onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};