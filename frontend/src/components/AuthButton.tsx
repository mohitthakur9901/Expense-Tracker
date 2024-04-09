import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider, GithubProvider } from '../firebase/firebase_config';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';


const AuthButton = () => {

    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                console.log(token);

                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage, email, credential);
                // Handle errors and provide user feedback
                // Example: set an error state or display a toast message
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSignInWithGitHub = () => {
        setLoading(true);
        signInWithPopup(auth, GithubProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                console.log(token);

                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage, email, credential);

            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className="flex flex-col gap-4" onClick={handleSignIn}>
            <Button variant="outline" disabled={loading} className="w-full hover:bg-slate-100 py-6">
                <FcGoogle className="h-10 w-10" />
            </Button>
            <Button variant="outline" disabled={loading}  className="w-full hover:bg-slate-100 py-6" onClick={handleSignInWithGitHub}>
                <FaGithub className="h-10 w-10" />
            </Button>
        </div>
    )
}

export default AuthButton