import React from 'react';
import Button from '@mui/material/Button';
import '../styles/CustomButton.css';

const CustomButton = ({
    roundness = '25px',
    transparency = 0.5,
    text,
    textSize = '18px',
    textColor = 'white',
    hoverTextOpacity = 1, // Default hover effect increases text opacity
    width,
    height,
    children,
    ...props
}) => {
    const dynamicStyles = {
        background: `rgba(255, 255, 255, ${transparency})`,
        borderRadius: roundness,
        fontSize: textSize,
        color: textColor, // Set text color dynamically
        height: height || 'auto',
        width: width || 'auto',
        maxWidth: width ? 'none' : '400px',
    };

    return (
        <Button
            className="custom-button"
            style={dynamicStyles}
            {...props}
        >
            <span className="button-text">
                {children}
            </span>
        </Button>
    );
};

export default CustomButton;
