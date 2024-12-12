import React, { useState } from 'react';
import styles from '../entidades/login/login.module.css';

interface InputFieldProps {
    type?: "text" | "password" | "date";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    label: string; 
    isFilled?: boolean; 
}

const InputField: React.FC<InputFieldProps> = ({ type = "text", value, onChange, label, isFilled = false }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(value !== "" ? true : false);

    return (
        <div
            className={`${styles.container_data} ${isFilled || isFocused || value ? styles["input-filled"] : ""}`}
            data-label={label}
        >
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus} 
                onBlur={handleBlur} 
            />
        </div>
    );
};

export default InputField;
