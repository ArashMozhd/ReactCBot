import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const NotificationDialog = ({ open, handleClose, type, title, message, transparency = 0.9, color }) => {
    const isSuccess = type === 'success';
    const defaultColor = isSuccess ? '#82ce34' : '#ef513a';
    const dialogColor = color || defaultColor;

    const dialogStyle = {
        textAlign: 'center',
        padding: '50px 20px 20px',
        borderRadius: 10,
        minWidth: '280px',
        maxWidth: '90%',
        backgroundColor: `rgba(${parseInt(dialogColor.slice(1, 3), 16)}, ${parseInt(dialogColor.slice(3, 5), 16)}, ${parseInt(dialogColor.slice(5, 7), 16)}, ${transparency})`,
        position: 'relative',
        overflow: 'visible',
    };

    const iconBoxStyle = {
        position: 'absolute',
        top: '-45px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
    };

    const iconStyle = {
        fontSize: '50px',
        color: dialogColor,
    };

    const buttonStyle = {
        backgroundColor: dialogColor,
        color: '#fff',
        borderRadius: '4px',
        padding: '10px 20px',
        margin: '0 auto',
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: dialogStyle,
            }}
            sx={{
                overflow: 'visible'
            }}
        >
            <Box sx={iconBoxStyle}>
                {isSuccess ? <CheckIcon style={iconStyle} /> : <CloseIcon style={iconStyle} />}
            </Box>
            <DialogTitle sx={{ paddingTop: '60px', fontWeight: 'bold', fontSize: '20px' }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center', fontSize: '14px' }}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={buttonStyle}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationDialog;
