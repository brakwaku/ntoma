import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";

import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user)

            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert('Cannot sign in. Wrong email and/or password');
                    break;
                case "auth/user-not-found":
                    alert('User with this email not found');
                    break;
                default:
                    console.log("User sign in encounted an eror: ", error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-form-container">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email"
                    value={email}
                    name="email"
                    required
                    onChange={handleChange}
                />

                <FormInput
                    label='Password'
                    type="password"
                    value={password}
                    name="password"
                    required
                    onChange={handleChange}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
