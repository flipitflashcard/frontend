import React, { useState, Fragment, useEffect } from 'react';

// import MUI Components
import { TextField, FormControl, Box, FormHelperText, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';


interface Props {
    chiocedWord: {
        label: string,
        description: string,
        example: string
        type: string
        id: number
    }
}

const EditWordsPage = ({ chiocedWord }: Props) => {

    // states of edit word
    const [label, setLabel] = useState<string>(chiocedWord.label);
    const [labelError, setLabelError] = useState<string>('');

    const [type, setType] = useState<string>(chiocedWord.type);
    const [typeError, setTypeError] = useState<boolean>(false);

    const [description, setDescription] = useState<string>(chiocedWord.description);
    const [descriptionError, setDescriptionError] = useState<string>('');

    const [example, setExample] = useState<string>(chiocedWord.example);
    const [exampleError, setExampleError] = useState<string>('');


    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleLoginSubmit = () => {

    }

    return (
        <Fragment>
            <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 3 }} display='flex' flexDirection="column">
                <FormControl fullWidth>
                    <TextField
                        value={label}
                        placeholder='Enter The Word...'
                        margin="normal"
                        required
                        fullWidth
                        id="label"
                        name="label"
                        autoComplete="label"
                        autoFocus
                        variant="outlined"
                        InputProps={{
                            sx: {
                                backgroundColor: '#EFC1C4',
                                borderRadius: '50px',
                                border: '3px solid var(--Indigo, #133266)',
                                fontWeight: 'bold',
                                mt: 5
                            },
                        }}
                        FormHelperTextProps={{
                            sx: {
                                backgroundColor: 'transparent',
                                fontSize: '12pt'
                            },
                        }}
                        onChange={(e) => setLabel(e.target.value)}
                        error={!!labelError}
                        helperText={labelError}
                        sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                    />
                </FormControl>

                <hr style={{ backgroundColor: '#133266', height: '3px' }} />

                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Age"
                        onChange={handleChangeType}
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '50px',
                            border: '2px solid var(--Indigo, #133266)',
                            width: '160px',
                            mt: 3,
                            '& .MuiSelect-select': {
                                padding: '10px 14px',
                                width: '50%'
                            },
                        }}
                        IconComponent={() => (
                            <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99998 2.33331C4.87531 2.33331 2.33331 4.87531 2.33331 7.99998C2.33331 11.1246 4.87531 13.6666 7.99998 13.6666C11.1246 13.6666 13.6666 11.1246 13.6666 7.99998C13.6666 4.87531 11.1246 2.33331 7.99998 2.33331ZM7.99998 14.6666C4.32398 14.6666 1.33331 11.676 1.33331 7.99998C1.33331 4.32398 4.32398 1.33331 7.99998 1.33331C11.676 1.33331 14.6666 4.32398 14.6666 7.99998C14.6666 11.676 11.676 14.6666 7.99998 14.6666Z" fill="#133266" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 9.86259C7.86733 9.86259 7.73933 9.80992 7.64599 9.71525L5.33199 7.39125C5.13666 7.19525 5.13799 6.87859 5.33333 6.68392C5.52933 6.48925 5.84599 6.48925 6.04066 6.68525L7.99999 8.65459L9.95999 6.68525C10.1547 6.48925 10.4713 6.48925 10.6673 6.68392C10.8627 6.87859 10.8633 7.19525 10.6687 7.39125L8.35399 9.71525C8.26066 9.80992 8.13266 9.86259 7.99999 9.86259Z" fill="#133266" />
                            </svg>
                        )}
                    >
                        <MenuItem value='Verb'>Verb</MenuItem>
                        <MenuItem value='Noun'>Noun</MenuItem>
                        <MenuItem value='Adjective'>Adjective</MenuItem>
                        <MenuItem value='Adverb'>Adverb</MenuItem>
                    </Select>
                    {typeError ?
                        <FormHelperText
                            sx={{
                                color: 'var(--Indigo, #ef3427)',
                                fontWeight: 'bold',
                                fontSize: '11pt',
                                marginTop: '8px',
                            }}
                        >
                            Please select a type
                        </FormHelperText>
                        :
                        null
                    }
                </FormControl>

                <FormControl sx={{ mt: 5 }}>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder='Enter the Description...'
                        multiline
                        maxRows={4}
                        minRows={4}
                        inputProps={{ maxLength: 250 }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{
                            borderRadius: '10px',
                            border: '3px solid #133266',
                            backgroundColor: '#AEBED6'
                        }}
                        error={!!descriptionError}
                        helperText={descriptionError}
                    />
                </FormControl>

                <FormControl sx={{ mt: 3 }}>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder='Enter the Example...'
                        multiline
                        maxRows={2}
                        minRows={2}
                        inputProps={{ maxLength: 125 }}
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                        sx={{
                            borderRadius: '10px',
                            border: '3px solid #133266',
                            backgroundColor: '#AEBED6'
                        }}
                        error={!!exampleError}
                        helperText={exampleError}
                    />
                </FormControl>

                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Age"
                        onChange={handleChangeType}
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '50px',
                            border: '2px solid var(--Indigo, #133266)',
                            width: '160px',
                            mt: 3,
                            '& .MuiSelect-select': {
                                padding: '10px 14px',
                                width: '50%'
                            },
                        }}
                        IconComponent={() => (
                            <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99998 2.33331C4.87531 2.33331 2.33331 4.87531 2.33331 7.99998C2.33331 11.1246 4.87531 13.6666 7.99998 13.6666C11.1246 13.6666 13.6666 11.1246 13.6666 7.99998C13.6666 4.87531 11.1246 2.33331 7.99998 2.33331ZM7.99998 14.6666C4.32398 14.6666 1.33331 11.676 1.33331 7.99998C1.33331 4.32398 4.32398 1.33331 7.99998 1.33331C11.676 1.33331 14.6666 4.32398 14.6666 7.99998C14.6666 11.676 11.676 14.6666 7.99998 14.6666Z" fill="#133266" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 9.86259C7.86733 9.86259 7.73933 9.80992 7.64599 9.71525L5.33199 7.39125C5.13666 7.19525 5.13799 6.87859 5.33333 6.68392C5.52933 6.48925 5.84599 6.48925 6.04066 6.68525L7.99999 8.65459L9.95999 6.68525C10.1547 6.48925 10.4713 6.48925 10.6673 6.68392C10.8627 6.87859 10.8633 7.19525 10.6687 7.39125L8.35399 9.71525C8.26066 9.80992 8.13266 9.86259 7.99999 9.86259Z" fill="#133266" />
                            </svg>
                        )}
                    >
                        <MenuItem value='Verb'>Verb</MenuItem>
                        <MenuItem value='Noun'>Noun</MenuItem>
                        <MenuItem value='Adjective'>Adjective</MenuItem>
                        <MenuItem value='Adverb'>Adverb</MenuItem>
                    </Select>
                    {typeError ?
                        <FormHelperText
                            sx={{
                                color: 'var(--Indigo, #ef3427)',
                                fontWeight: 'bold',
                                fontSize: '11pt',
                                marginTop: '8px',
                            }}
                        >
                            Please select a type
                        </FormHelperText>
                        :
                        null
                    }
                </FormControl>

            </Box>
        </Fragment>
    )
}

export default EditWordsPage;