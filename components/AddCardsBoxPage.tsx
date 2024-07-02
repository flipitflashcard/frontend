import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { TextField, Box, Grid, Button } from '@mui/material';

const NewCardStyle = {
    width: '275px',
    height: '275px',
    borderTopWidth: '3px',
    borderBottomWidth: '6px',
    borderStyle: 'solid',
    borderColor: '#133266',
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#ffffff",
    borderRadius: "15px",
    p: 2,
};

const AddCardsBoxPage = () => {
    const { push } = useRouter();

    // state of new card 
    const [topic, setTopic] = useState<string>('');

    // import state of state of new card validation 
    const [topicError, setTopicError] = useState<string>('');

    const [height, setHeight] = useState<number>(0);
    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleAddNewCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (topic === "") {
            setTopicError('Name is required!');
        } else {
            setTopicError('');

        }
    }

    const backToHomePage = () => {
        push('/flip');
    }

    const handleSaveChanges = () => {
        push('/flip');
    }

    return (
        <Fragment>
            <div style={{ height: `${height - 100}px` }}>
                <Box component="form" onSubmit={handleAddNewCard} noValidate sx={NewCardStyle} display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
                    <TextField
                        value={topic}
                        id="topic"
                        placeholder="Enter The name..."
                        multiline
                        margin="normal"
                        fullWidth
                        name="topic"
                        autoFocus
                        autoComplete="topic"
                        variant="outlined"
                        onChange={(e) => setTopic(e.target.value)}
                        error={!!topicError}
                        helperText={topicError}
                        InputProps={{
                            sx: {
                                backgroundColor: '#f9f9f9',
                                borderRadius: '20px',
                            },
                        }}
                        FormHelperTextProps={{
                            sx: {
                                backgroundColor: 'transparent',
                                fontSize: '12pt'
                            },
                        }}
                        sx={{ border: 'none', "& fieldset": { border: '3px solid #133266', borderRadius: '20px' } }}
                    />
                    <Grid container className="mt-3">
                        <Grid item xs={6} textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                className="discard-style"
                                onClick={backToHomePage}
                            >
                                Discard
                            </Button>
                        </Grid>
                        <Grid item xs={6} textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                className="save-style"
                                onClick={handleSaveChanges}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </div>
        </Fragment>
    )
}

export default AddCardsBoxPage;