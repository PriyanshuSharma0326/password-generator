import React, { useState } from 'react';
import '../styles/InputForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'

function InputForm() {
    const [passwordLength, setPasswordLength] = useState(8);
    const [password, setPassword] = useState('');

    const [formCheckboxes, setFormInputs] = useState({
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true
    })

    const handlePasswordLengthChange = (e) => {
        const length = parseInt(e.target.value);
        setPasswordLength(length);
    };

    const inputHandler = (e) => {
        setFormInputs({
            ...formCheckboxes, 
            [e.target.name]: e.target.checked
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formCheckboxes);

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_-+=[]{}|:;"<>,.?/';
      
        let validChars = '';
        let generatedPassword = '';
      
        if (formCheckboxes.includeUppercase) validChars += uppercaseChars;
        if (formCheckboxes.includeLowercase) validChars += lowercaseChars;
        if (formCheckboxes.includeNumbers) validChars += numberChars;
        if (formCheckboxes.includeSymbols) validChars += symbolChars;
      
        const validCharsLength = validChars.length;
      
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * validCharsLength);
            generatedPassword += validChars.charAt(randomIndex);
        }

        setPassword(generatedPassword);
    }

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy: ', error);
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>Password Generator</h1>

            <div className="password-container">
                <p>{password}</p>

                <FontAwesomeIcon onClick={copyToClipboard} className='clip-icon' icon={faClipboard} />
            </div>

            <form action="" className="password-form" onSubmit={handleSubmit}>
                <div className="length-input">
                    <label htmlFor="password-length">Password Length</label>

                    <input 
                        type="number" 
                        value={passwordLength} 
                        onChange={handlePasswordLengthChange}
                        name="passwordLength" 
                        id="password-length" 
                        min='6' 
                        max='20' 
                    />
                </div>

                    <div className="conditional-input">
                        <label htmlFor="uppercase">Include uppercase letters</label>
                        <input 
                            type="checkbox" 
                            name="includeUppercase" 
                            id="uppercase" 
                            checked={formCheckboxes.includeUppercase}
                            onChange={inputHandler}
                        />
                    </div>
                    
                    <div className="conditional-input">
                        <label htmlFor="lowercase">Include lowercase letters</label>
                        <input 
                            type="checkbox" 
                            name="includeLowercase" 
                            id="lowercase" 
                            checked={formCheckboxes.includeLowercase}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="conditional-input">
                        <label htmlFor="numeric">Include numbers</label>
                        <input 
                            type="checkbox" 
                            name="includeNumbers" 
                            id="numeric" 
                            checked={formCheckboxes.includeNumbers}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className="conditional-input">
                        <label htmlFor="symbolic">Include symbols</label>
                        <input 
                            type="checkbox" 
                            name="includeSymbols" 
                            id="symbolic" 
                            checked={formCheckboxes.includeSymbols}
                            onChange={inputHandler}
                        />
                    </div>

                    <button className="generate-password-button">
                        Generate Password
                    </button>
            </form>
        </div>
    );
}

export default InputForm;
