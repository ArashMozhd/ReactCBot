import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(({ theme, ...props }) => ({
    width: props.width || '100%',
    height: props.height || 'auto',
    marginTop: props.marginTop || '10px',
    marginBottom: props.marginBottom || '10px',
    '& .MuiOutlinedInput-root': {
        borderRadius: props.borderRadius || '35px',
        height: props.height || '50px',
    },
    '& .MuiOutlinedInput-input': {
        color: props.inputColor || 'white',
        padding: props.padding || '12px 16px',
    },
    '& .MuiInputLabel-root': {
        color: props.labelColor || 'rgba(255, 255, 255, 0.8)',
        marginTop: props.labelMarginTop || '-5px',
        marginLeft: props.labelMarginLeft || '0px',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: props.labelFocusedColor || 'rgba(255, 255, 255, 1)',
        marginTop: props.labelFocusedMarginTop || '-5px',
        marginLeft: props.labelFocusedMarginLeft || '-10px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: props.borderColor || 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: props.hoverBorderColor || 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: props.focusedBorderColor || 'rgba(255, 255, 255, 1)',
    },
}));

const CustomTextField = ({
    label,
    type,
    value,
    onChange,
    width,
    height,
    borderRadius,
    inputColor,
    padding,
    labelColor,
    labelMarginTop,
    labelMarginLeft,
    labelFocusedColor,
    labelFocusedMarginTop,
    labelFocusedMarginLeft,
    borderColor,
    hoverBorderColor,
    focusedBorderColor,
    marginTop,
    marginBottom,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <StyledTextField
            fullWidth
            label={label}
            margin="normal"
            variant="outlined"
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={onChange}
            width={width}
            height={height}
            borderRadius={borderRadius}
            inputColor={inputColor}
            padding={padding}
            labelColor={labelColor}
            labelMarginTop={labelMarginTop}
            labelMarginLeft={labelMarginLeft}
            labelFocusedColor={labelFocusedColor}
            labelFocusedMarginTop={labelFocusedMarginTop}
            labelFocusedMarginLeft={labelFocusedMarginLeft}
            borderColor={borderColor}
            hoverBorderColor={hoverBorderColor}
            focusedBorderColor={focusedBorderColor}
            marginTop={marginTop}
            marginBottom={marginBottom}
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
            {...props}
        />
    );
};

export default CustomTextField;
