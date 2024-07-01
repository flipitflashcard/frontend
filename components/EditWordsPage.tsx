import React, { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { TextField, FormControl, Box, FormHelperText, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface Props {
    chiocedWord: {
        label: string,
        description: string,
        example: string,
        type: string,
        id: number
    },
    cardsBox: {
        label: string,
        number: number,
        id: number
    }[],
    chiocedCardBox: {
        label: string,
        number: number,
        id: number
    }
}

const EditWordsPage = ({ chiocedWord, cardsBox, chiocedCardBox }: Props) => {
    const { push } = useRouter();

    // states of edit word
    const [label, setLabel] = useState<string>(chiocedWord.label);
    const [labelError, setLabelError] = useState<string>('');

    const [type, setType] = useState<string>(chiocedWord.type);
    const [typeError, setTypeError] = useState<boolean>(false);

    const [description, setDescription] = useState<string>(chiocedWord.description);
    const [descriptionError, setDescriptionError] = useState<string>('');

    const [example, setExample] = useState<string>(chiocedWord.example);
    const [exampleError, setExampleError] = useState<string>('');

    const [cardBox, setCardBox] = useState<string>(chiocedCardBox.label);
    const [cardBoxError, setCardBoxError] = useState<boolean>(false);

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

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleChangeBox = (event: SelectChangeEvent) => {
        setCardBox(event.target.value as string);
    };

    const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let hasError = false;

        if (label === "") {
            setLabelError('Word is required!');
            hasError = true;
        } else {
            setLabelError('');
        }

        if (type === "") {
            setTypeError(true);
            hasError = true;
        } else {
            setTypeError(false);
        }

        if (description === "") {
            setDescriptionError('Description is required!');
            hasError = true;
        } else {
            setDescriptionError('');
        }

        if (example === "") {
            setExampleError('Example is required!');
            hasError = true;
        } else {
            setExampleError('');
        }

        if (cardBox === "") {
            setCardBoxError(true);
            hasError = true;
        } else {
            setCardBoxError(false);
        }

        if (!hasError) {
            const path = localStorage.getItem('path');
            if (path) {
                push(path);
                localStorage.removeItem('path');
            }
        }
    };

    const addSaveChanges = () => {
        const designNavbarElement = document.querySelector('.design-navbar');

        if (designNavbarElement && !document.querySelector('.save-change')) {
            const newCardsBoxElement = document.createElement('div');
            newCardsBoxElement.className = 'save-change';
            newCardsBoxElement.innerHTML = `
        <button class='btn-save-change' type='submit'>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z" fill="#133266"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8135 15.1229C10.6225 15.1229 10.4295 15.0499 10.2835 14.9029L7.90951 12.5299C7.61651 12.2369 7.61651 11.7629 7.90951 11.4699C8.20251 11.1769 8.67651 11.1769 8.96951 11.4699L10.8135 13.3119L15.0295 9.09695C15.3225 8.80395 15.7965 8.80395 16.0895 9.09695C16.3825 9.38995 16.3825 9.86395 16.0895 10.1569L11.3435 14.9029C11.1975 15.0499 11.0055 15.1229 10.8135 15.1229Z" fill="#133266"/>
        </svg>
          Save Changes
        </button>
      `;
            const existingSecondChild = designNavbarElement.children[0];
            designNavbarElement.insertBefore(newCardsBoxElement, existingSecondChild);

            const button = newCardsBoxElement.querySelector('.btn-save-change');
            if (button) {
                button.addEventListener('click', () => {
                    const formElement = document.querySelector('form');
                    if (formElement) {
                        formElement.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }
                });
            }
        }
    }

    useEffect(() => {
        addSaveChanges();
    }, [])

    return (
        <Fragment>
            <Box component="form" onSubmit={handleSaveChanges} noValidate sx={{ overflowY: 'scroll', height: `${height - 220}px` }} display='flex' flexDirection="column" className='scrollable-div'>
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
                        label="Type"
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
                    {typeError ? (
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
                    ) : null}
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
                        InputProps={{
                            sx: {
                                borderRadius: '10px',
                                border: '3px solid #133266',
                                backgroundColor: '#AEBED6'
                            },
                        }}
                        FormHelperTextProps={{
                            sx: {
                                backgroundColor: 'transparent',
                                fontSize: '12pt'
                            },
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
                        InputProps={{
                            sx: {
                                borderRadius: '10px',
                                border: '3px solid #133266',
                                backgroundColor: '#AEBED6'
                            },
                        }}
                        FormHelperTextProps={{
                            sx: {
                                backgroundColor: 'transparent',
                                fontSize: '12pt'
                            },
                        }}
                        error={!!exampleError}
                        helperText={exampleError}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cardBox}
                        label="Age"
                        onChange={handleChangeBox}
                        sx={{
                            backgroundColor: '#EFC1C4',
                            borderRadius: '50px',
                            border: '2px solid var(--Indigo, #133266)',
                            mt: 5,
                            '& .MuiSelect-select': {
                                padding: '15px 14px',
                                width: '85%'
                            },
                        }}
                        IconComponent={() => (
                            <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99998 2.33331C4.87531 2.33331 2.33331 4.87531 2.33331 7.99998C2.33331 11.1246 4.87531 13.6666 7.99998 13.6666C11.1246 13.6666 13.6666 11.1246 13.6666 7.99998C13.6666 4.87531 11.1246 2.33331 7.99998 2.33331ZM7.99998 14.6666C4.32398 14.6666 1.33331 11.676 1.33331 7.99998C1.33331 4.32398 4.32398 1.33331 7.99998 1.33331C11.676 1.33331 14.6666 4.32398 14.6666 7.99998C14.6666 11.676 11.676 14.6666 7.99998 14.6666Z" fill="#133266" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 9.86259C7.86733 9.86259 7.73933 9.80992 7.64599 9.71525L5.33199 7.39125C5.13666 7.19525 5.13799 6.87859 5.33333 6.68392C5.52933 6.48925 5.84599 6.48925 6.04066 6.68525L7.99999 8.65459L9.95999 6.68525C10.1547 6.48925 10.4713 6.48925 10.6673 6.68392C10.8627 6.87859 10.8633 7.19525 10.6687 7.39125L8.35399 9.71525C8.26066 9.80992 8.13266 9.86259 7.99999 9.86259Z" fill="#133266" />
                            </svg>
                        )}
                    >
                        {cardsBox.map((item) => (
                            <MenuItem key={item.id} value={item.label}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    {cardBoxError ? (
                        <FormHelperText
                            sx={{
                                color: 'var(--Indigo, #ef3427)',
                                fontWeight: 'bold',
                                fontSize: '11pt',
                                marginTop: '8px',
                            }}
                        >
                            Please select a Card Box
                        </FormHelperText>
                    ) : null}
                </FormControl>

            </Box>
        </Fragment>
    )
}

export default EditWordsPage;
