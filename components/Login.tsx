import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import Image from 'next/image';

// import MUI
import {
    Grid,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    InputAdornment
} from '@mui/material';

// import icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Copyright() {
    return (
        <>
            <Typography
                variant="body2"
                color="#133266"
                fontWeight='bold'
                fontSize='14pt'
                align="center"
                className='mt-5'
            >
                Flipy
            </Typography>
            <Typography variant="body2"
                color="#133266"
                fontWeight='bold'
                align="center"
                className='mb-3 mt-2'
            >
                {'All Right Reserved '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

const Login = () => {

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

    // spinner
    const [spinner, setSpinner] = useState<boolean>(true);

    setTimeout(() => {
        setSpinner(false);
    }, 3000)

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email === "" && password === "") {
            setEmailError('Email is required!');
            setPasswordError('Password is required!');
        } else if (password === "") {
            setPasswordError('Password is required!');
        } else if (email === "" && password === "") {
            setEmailError('Email is required!');
        } else if (email !== "" && !isValidEmail(email)) {
            setEmailError('Email must be valid!');
        } else if (email !== "" && password !== "") {
            setEmailError('');
            setPasswordError('');
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

            <Grid
                container
                spacing={2}
                className='bg-login'
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                textAlign='center'
            >
                {
                    spinner ?
                        <Box sx={{ display: 'flex' }} >
                            <Image
                                className='animation-show-login'
                                src='./Images/Flipit-Logo-WB.svg'
                                width={200}
                                height={200}
                                layout='responsive'
                                alt='spinner'
                            />
                        </Box >
                        :
                        <Container component="main" maxWidth="xs" className='design-login'>
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
                                    {/* <Typography component="h1" variant="h5">
                                        Welcome to FlipIt
                                    </Typography> */}
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                        <TextField
                                            value={email}
                                            placeholder='FlipIt@gmail.com'
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
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
                                            value={password}
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
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
                                                <Button sx={{ fontSize: "9pt" }} className='text-white fw-bold hover-text'>
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
                            <Copyright />
                        </Container>
                }

            </Grid>


        </div>
    )
}

export default Login;
