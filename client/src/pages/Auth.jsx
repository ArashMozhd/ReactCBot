import React, { useState } from 'react';
import { Typography, Tabs, Tab, CircularProgress } from '@mui/material';
import CustomButton from '../components/CustomButton';
import CustomTextField from '../components/CustomTextField';
import loginLogo from '../assets/login.gif';
import registerLogo from '../assets/register.gif';
import '../styles/Auth.css';
import FireflyAnimation from '../components/FireflyAnimation';
import NotificationDialog from '../components/NotificationDialog';

function Auth() {
    const [tabIndex, setTabIndex] = useState(0);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerFullName, setRegisterFullName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('success');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTransparency, setDialogTransparency] = useState(0.9);
    const [dialogColor, setDialogColor] = useState('');

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
        setError('');
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
        setLoading(false);
        if (response.ok) {
            setDialogType('success');
            setDialogTitle('Awesome!');
            setDialogMessage('Login successful');
        } else {
            const data = await response.json();
            setDialogType('failure');
            setDialogTitle('Sorry!');
            setDialogMessage(data.message || 'Login failed');
        }
        setDialogTransparency(0.8);
        setDialogColor('');
        setOpenDialog(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: registerFullName, email: registerEmail, password: registerPassword }),
        });
        setLoading(false);
        if (response.ok) {
            setDialogType('success');
            setDialogTitle('Awesome!');
            setDialogMessage('Registration succeeded!');
        } else {
            const data = await response.json();
            setDialogType('failure');
            setDialogTitle('Sorry!');
            setDialogMessage(data.message || 'Registration failed!');
        }
        setDialogTransparency(0.8);
        setDialogColor('');
        setOpenDialog(true);
    };

    return (
        <div className="login-page-1" style={{ opacity: 0.8 }}>
            <div className="login-page-1-wrapper">
                <article>
                    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={tabIndex === 0 ? loginLogo : registerLogo} alt="Logo" style={{ width: 50, height: 50, marginRight: 10 }} />
                        <Typography 
                            variant="h5" 
                            component="h1" 
                            gutterBottom 
                            align="center" 
                            sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                        >
                            {tabIndex === 0 ? 'Login' : 'Registration'}
                        </Typography>
                    </header>
                    <Tabs 
                        value={tabIndex} 
                        onChange={handleTabChange} 
                        centered
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: 'darkgray' },
                            '& .MuiTab-root': { color: 'rgba(0, 0, 0, 0.54)' },
                            '& .Mui-selected': { color: 'darkgray' }
                        }}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {tabIndex === 0 && (
                        <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
                            <CustomTextField
                                label="Email"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <CustomTextField
                                label="Password"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <CustomButton type="submit">
                                {loading ? <CircularProgress size={24} /> : 'Login'}
                            </CustomButton>
                        </form>
                    )}
                    {tabIndex === 1 && (
                        <form onSubmit={handleRegister} style={{ textAlign: 'center' }}>
                            <CustomTextField
                                label="Full Name"
                                type="text"
                                value={registerFullName}
                                onChange={(e) => setRegisterFullName(e.target.value)}
                                required
                            />
                            <CustomTextField
                                label="Email"
                                type="email"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required
                            />
                            <CustomTextField
                                label="Password"
                                type="password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                            <CustomButton type="submit" className="submit-btn" width='50'>
                                {loading ? <CircularProgress size={24} /> : 'Register'}
                            </CustomButton>
                        </form>
                    )}
                </article>
                <div className="login-page-1-drops">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <FireflyAnimation side="top" speedRange={[10, 20]} intervalRange={[100, 300]} />
            <FireflyAnimation side="left" speedRange={[10, 20]} intervalRange={[100, 300]} />

            <NotificationDialog 
                open={openDialog} 
                handleClose={handleDialogClose} 
                type={dialogType} 
                title={dialogTitle} 
                message={dialogMessage} 
                transparency={dialogTransparency}
                color={dialogColor}
            />
        </div>
    );
}

export default Auth;
