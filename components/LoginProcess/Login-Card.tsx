import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

// import MUI
import {
    Grid,
    Button,
    TextField,
    Box,
    keyframes,
} from '@mui/material';

// create animation for switch
const fadeIn = keyframes`
    0% {
        transform: scale(0) rotateY(180deg);
    }

    100% {
        transform: scale(1) rotateY(0deg);
    }
`;

const fadeOut = keyframes`
    0% {
        transform: scale(0) rotateY(0deg);
    }

    100% {
        transform: scale(1) rotateY(360deg);
    }
`;

const Login_Card = () => {
    const router = useRouter();

    // import state of log-in    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // import state of sign up
    const [signUpEmail, setSignUpEmail] = useState<string>('');

    // import state og sign up validation 
    const [signUpEmailError, setSignUpEmailError] = useState<string>('');

    // import state of log-in validation 
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // state for animation 
    const [loginStep, setLoginStep] = useState<boolean>(true);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email === "" && password === "") {
            setEmailError('Email is required!');
            setPasswordError('Password is required!');
        } else if (email !== '' && password === '') {
            !isValidEmail(email) ? setEmailError('Email is invalid!') : setEmailError('');
            setPasswordError('Password is required!');
        } else if (password !== '' && email === '') {
            password.length >= 8 ? setPasswordError('Password should be no longer than 8 characters.') : setPasswordError('');
            setEmailError('Email is required!');
        } else if (email !== "" && password !== "") {

            if (!isValidEmail(email)) {
                setEmailError('Email is invalid!');
            } else if (password.length >= 8) {
                setPasswordError('Password should be no longer than 8 characters.');
            } else {
                setCookie("token", email);
                router.push('/home');
            }

        }
    };

    const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (signUpEmail !== '') {
            !isValidEmail(signUpEmail) ? setSignUpEmailError('Email is invalid!') : setSignUpEmailError('');
        } else {
            setSignUpEmailError('Email is required!');
        }
    }

    const handleToggleForm = () => {
        setLoginStep((prev) => !prev);
    }

    return (
        <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: `${loginStep ? fadeIn : fadeOut} 1s ease`
            }}
        >
            {
                loginStep ? (
                    <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            value={email}
                            placeholder='FlipIt@gmail.com'
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                            style={{ backgroundColor: 'white', borderRadius: '20px' }}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                            sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                        />
                        <TextField
                            placeholder='******'
                            value={password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            style={{ backgroundColor: 'white', borderRadius: '20px' }}
                            sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                            className='mt-5'
                        />

                        <Grid container className='mt-5'>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className='main-button me-2'
                                    style={{ width: '50%' }}
                                >
                                    Log in
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSignUpSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            value={signUpEmail}
                            placeholder='FlipIt@gmail.com'
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                            style={{ backgroundColor: 'white', borderRadius: '20px' }}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            error={!!signUpEmailError}
                            helperText={signUpEmailError}
                            sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                        />
                        <Grid container className='mt-5'>
                            <Grid item xs className='mt-4'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className='main-button me-2'
                                    style={{ width: '80%' }}
                                >
                                    Sign up | Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }
            <Grid container className='mt-4'>
                <Grid item xs>
                    <Button sx={{ fontSize: "9pt" }}
                        className='text-white fw-bold hover-text'
                        onClick={handleToggleForm}
                    >
                        {loginStep ? 'Register or Forgot Password' : 'Back to Login'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login_Card;