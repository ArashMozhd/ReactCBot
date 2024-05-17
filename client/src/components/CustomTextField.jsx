import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/CustomTextField.css';

const CustomTextField = ({ label, type, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            className="custom-text-field"
            fullWidth
            label={label}
            margin="normal"
            variant="outlined"
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: type === 'password' && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default CustomTextField;
