import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.componet";

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { SignUpFormContainer, ButtonsContainer } from './sign-in-form.styles';

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
            await signInAuthUserWithEmailAndPassword(email, password);
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
        <SignUpFormContainer>
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

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign In With Google</Button>
                </ButtonsContainer>
            </form>
        </SignUpFormContainer>
    )
}

export default SignInForm
