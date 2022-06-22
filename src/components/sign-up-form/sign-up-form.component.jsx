import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utls";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            const { user } = createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot sign up. Email already in use');
            } else {
                console.log("User creation encounted an eror: ", error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-form-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your emailand password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    value={displayName}
                    name="displayName"
                    required
                    onChange={handleChange}
                />

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

                <FormInput
                    label='Confirm Password'
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    required
                    onChange={handleChange}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignupForm
