// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
    // auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utls";

import SignupForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);

    //     if(response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);

    const logGooglePopupUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGooglePopupUser}>Sign In with Google Popup</button>
            <SignupForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */}
        </div>
    )
}

export default Authentication