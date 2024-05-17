import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme, ...props }) => ({
    background: props.backgroundColor,
    borderRadius: props.roundness,
    fontSize: props.textSize,
    color: props.textColor,
    height: props.height || 'auto',
    width: props.width || 'auto',
    maxWidth: props.width ? 'none' : '400px',
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginBottom: props.marginBottom,
    boxShadow: props.boxShadow,
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.7)',
        opacity: props.hoverTextOpacity,
    },
}));

const CustomButton = ({
    roundness = '25px',
    backgroundColor = 'rgba(255, 255, 255, 0.5)', // Default background color
    boxShadow = '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
    textSize = '18px',
    textColor = 'white',
    hoverTextOpacity = 1, // Default hover effect increases text opacity
    width,
    height,
    marginRight = 'auto', // New property for margin right
    marginTop = '20px', // New property for margin top
    marginLeft = 'auto', // New property for margin left
    marginBottom = '20px', // New property for margin bottom
    children,
    ...props
}) => {
    return (
        <StyledButton
            backgroundColor={backgroundColor}
            roundness={roundness}
            textSize={textSize}
            textColor={textColor}
            hoverTextOpacity={hoverTextOpacity}
            width={width}
            height={height}
            marginTop={marginTop}
            marginLeft={marginLeft}
            marginRight={marginRight}
            marginBottom={marginBottom}
            boxShadow={boxShadow}
            {...props}
        >
            <span className="button-text">
                {children}
            </span>
        </StyledButton>
    );
};

export default CustomButton;
