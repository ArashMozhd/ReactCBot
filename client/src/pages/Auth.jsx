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
    const [dialog, setDialog] = useState({
        open: false,
        type: 'success',
        title: '',
        message: '',
        transparency: 0.9,
        color: ''
    });

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
        setError('');
    };

    const handleDialogClose = () => {
        setDialog(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const url = type === 'login' ? 'http://127.0.0.1:8000/login' : 'http://127.0.0.1:8000/register';
        const body = type === 'login'
            ? JSON.stringify({ email: loginEmail, password: loginPassword })
            : JSON.stringify({ full_name: registerFullName, email: registerEmail, password: registerPassword });
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            const data = await response.json();
            setDialog({
                open: true,
                type: response.ok ? 'success' : 'failure',
                title: response.ok ? 'Awesome!' : 'Sorry!',
                message: data.message || (response.ok ? 'Operation successful' : 'Operation failed'),
                transparency: 0.8,
                color: ''
            });
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-1">
            <div className="login-page-1-wrapper">
                <article>
                    <header>
                        <img src={tabIndex === 0 ? loginLogo : registerLogo} alt="Logo" className="auth-logo" />
                        <Typography variant="h5" component="h1" gutterBottom align="center" className="auth-header">
                            {tabIndex === 0 ? 'Login' : 'Registration'}
                        </Typography>
                    </header>
                    <Tabs value={tabIndex} onChange={handleTabChange} centered className="custom-tab">
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {tabIndex === 0 && (
                        <form onSubmit={(e) => handleSubmit(e, 'login')} className="auth-form">
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
                            <CustomButton
                                type="submit"
                                roundness="25px"
                                transparency={0.5}
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                                textSize="18px"
                                textColor="white"
                                hoverTextOpacity={1}
                                width="180px"
                                height="auto"
                                marginTop="20px"
                                marginLeft="auto"
                                marginBottom="20px"
                            >
                                {loading ? <CircularProgress size={24} /> : 'Login'}
                            </CustomButton>
                        </form>
                    )}
                    {tabIndex === 1 && (
                        <form onSubmit={(e) => handleSubmit(e, 'register')} className="auth-form">
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
                            <CustomButton
                                type="submit"
                                roundness="25px"
                                transparency={0.5}
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                                textSize="18px"
                                textColor="white"
                                hoverTextOpacity={1}
                                width="180px"
                                height="auto"
                                marginTop="20px"
                                marginLeft="auto"
                                marginBottom="15px"
                            >
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
                open={dialog.open} 
                handleClose={handleDialogClose} 
                type={dialog.type} 
                title={dialog.title} 
                message={dialog.message} 
                transparency={dialog.transparency}
                color={dialog.color}
            />
        </div>
    );
}

export default Auth;
