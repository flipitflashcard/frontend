import React, { useState } from 'react';
import Link from 'next/link';

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

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    const [step, setStep] = useState<number>(0);
    const [email, setEmail] = useState<string>('');
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    // state for animation 
    const [isRectangleVisible, setRectangleVisible] = useState<boolean>(true);
    const [isOtherComponentVisible, setOtherComponentVisible] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const goToLogin = () => {
        setRectangleVisible(false);
        setOtherComponentVisible(true);
    }

    return (
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
            <Container component="main" maxWidth="xs" className='design-login'>
                {
                    isRectangleVisible &&
                    <div >
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Welcome to FlipIt
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
                                            onClick={goToLogin}
                                        >
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
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
                <Copyright sx={{ mt: 3, mb: 4 }} />
            </Container>
        </Grid>
    )
}

export default Login;
