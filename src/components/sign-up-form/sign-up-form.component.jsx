import { useState } from "react";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign up with your emailand password</h1>
            <form onSubmit={() => { }}>
                <label>Display Name</label>
                <input type="text" value={displayName} name="displayName" required onChange={handleChange} />

                <label>Email</label>
                <input type="email" value={email} name="email" required onChange={handleChange} />

                <label>Password</label>
                <input type="password" value={password} name="password" required onChange={handleChange} />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} name="confirmPassword" required onChange={handleChange} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm
