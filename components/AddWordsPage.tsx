import React, { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { TextField, FormControl, Box, FormHelperText, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface Props {
    cardsBox: {
        label: string,
        number: number,
        id: number
    }[],

}

const AddWordsPage = ({ cardsBox }: Props) => {
    const { reload } = useRouter();

    // states of edit word
    const [label, setLabel] = useState<string>('');
    const [labelError, setLabelError] = useState<string>('');

    const [type, setType] = useState<string>('');
    const [typeError, setTypeError] = useState<boolean>(false);

    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');

    const [example, setExample] = useState<string>('');
    const [exampleError, setExampleError] = useState<string>('');

    const [cardBox, setCardBox] = useState<string>('');
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
            reload();
        }
    };

    const addAddWords = () => {
        const designNavbarElement = document.querySelector('.design-navbar');

        if (designNavbarElement && !document.querySelector('.add-words')) {
            const newCardsBoxElement = document.createElement('div');
            newCardsBoxElement.className = 'add-words';
            newCardsBoxElement.innerHTML = `
        <button class='btn-add-words' type='submit'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5771 22.3686H7.75312C4.31212 22.3686 2.00012 19.9536 2.00012 16.3596V8.04562C2.00012 4.45162 4.31212 2.03662 7.75312 2.03662H11.4921C11.9061 2.03662 12.2421 2.37262 12.2421 2.78662C12.2421 3.20062 11.9061 3.53662 11.4921 3.53662H7.75312C5.16912 3.53662 3.50012 5.30662 3.50012 8.04562V16.3596C3.50012 19.0986 5.16912 20.8686 7.75312 20.8686H16.5771C19.1611 20.8686 20.8311 19.0986 20.8311 16.3596V12.3316C20.8311 11.9176 21.1671 11.5816 21.5811 11.5816C21.9951 11.5816 22.3311 11.9176 22.3311 12.3316V16.3596C22.3311 19.9536 20.0181 22.3686 16.5771 22.3686Z" fill="#133266"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.86774 15.4282H11.8447C12.2247 15.4282 12.5807 15.2812 12.8497 15.0122L20.3587 7.50324C20.6667 7.19524 20.8367 6.78524 20.8367 6.34924C20.8367 5.91224 20.6667 5.50124 20.3587 5.19324L19.1417 3.97624C18.5047 3.34124 17.4687 3.34124 16.8307 3.97624L9.35774 11.4492C9.09874 11.7082 8.95174 12.0522 8.94274 12.4172L8.86774 15.4282ZM11.8447 16.9282H8.09874C7.89674 16.9282 7.70274 16.8462 7.56174 16.7012C7.42074 16.5572 7.34374 16.3622 7.34874 16.1592L7.44274 12.3802C7.46174 11.6282 7.76474 10.9212 8.29674 10.3882H8.29774L15.7707 2.91524C16.9927 1.69524 18.9797 1.69524 20.2017 2.91524L21.4187 4.13224C22.0117 4.72424 22.3377 5.51124 22.3367 6.34924C22.3367 7.18724 22.0107 7.97324 21.4187 8.56424L13.9097 16.0732C13.3587 16.6242 12.6247 16.9282 11.8447 16.9282Z" fill="#133266"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.731 9.9166C19.539 9.9166 19.347 9.8436 19.201 9.6966L14.635 5.1306C14.342 4.8376 14.342 4.3626 14.635 4.0696C14.928 3.7766 15.402 3.7766 15.695 4.0696L20.261 8.6366C20.554 8.9296 20.554 9.4036 20.261 9.6966C20.115 9.8436 19.923 9.9166 19.731 9.9166Z" fill="#133266"/>
        </svg>

          Add to Cards
        </button>
      `;
            const existingSecondChild = designNavbarElement.children[0];
            designNavbarElement.insertBefore(newCardsBoxElement, existingSecondChild);

            const button = newCardsBoxElement.querySelector('.btn-add-words');
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
        addAddWords();
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
                        defaultValue='nothing'
                        displayEmpty
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '50px',
                            border: '2px solid var(--Indigo, #133266)',
                            width: '170px',
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
                        <MenuItem value="">
                            <em>Select Tag</em>
                        </MenuItem>
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
                        displayEmpty
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
                        <MenuItem value="">
                            Search for Box Cards
                        </MenuItem>
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

export default AddWordsPage;
