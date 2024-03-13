import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

// import MUI
import {
    Grid,
    Button,
    TextField,
    Box,
    Typography,
    InputAdornment
} from '@mui/material';

// import icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Login_Card = () => {
    const router = useRouter();

    // import state of log-in    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // import state of log-in validation 
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // state for animation 
    const [isRectangleVisible, setRectangleVisible] = useState<boolean>(true);
    const [isOtherComponentVisible, setOtherComponentVisible] = useState<boolean>(false);
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
            !isValidEmail(email) ? setEmailError('Email is invalid!') : setEmailError('');
            password.length >= 8 ? setPasswordError('Password should be no longer than 8 characters.') : setPasswordError('');
        } else {
            setCookie("email", email, {
                path: "/",
                domain: 'https://FlipIt.com',
                // httpOnly: false,
                sameSite: 'lax',
            });
            setCookie("password", password, {
                path: "/",
                domain: 'https://FlipIt.com',
                // httpOnly: false,
                sameSite: 'lax',
            });
        }
    };

    const goToLogin = () => {
        setRectangleVisible(false);
        setOtherComponentVisible(true);
    }

    return (
        <div>
            {
                isRectangleVisible &&
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                                    startIcon={<PersonAddIcon />}
                                    className='main-button me-2'
                                    style={{ width: '50%' }}
                                >
                                    Log in
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container className='mt-4'>
                            <Grid item xs>
                                <Button sx={{ fontSize: "9pt" }}
                                    className='text-white fw-bold hover-text'
                                    onClick={goToLogin}
                                >
                                    Register or Forgot Password
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            }
            {
                isOtherComponentVisible &&
                <div className='card.visible'>
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Login to FlipIt
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <TextField
                                value={email}
                                placeholder='EnLo@gmail.com'
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                InputProps={{
                                    className: 'custom-input',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className='main-button'
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Button
                                        className='seconde-button'
                                        startIcon={<ThreeSixtyIcon />}
                                        variant="contained"
                                    >
                                        Log In
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            }
        </div>
    )
}

export default Login_Card;