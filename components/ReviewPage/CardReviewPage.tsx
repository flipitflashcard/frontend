import React, { useState, Fragment, useEffect } from 'react';

// import MUI Components
import { TextField, Autocomplete, keyframes, Box } from '@mui/material';

// import components
import ListItemBox from './ListItemBox';

const shakeLabel = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }`;

type Value = {
    label: string,
    type: string,
    description: string,
    example: string,
    id: string | number
}

interface Props {
    cards: []
}

const CardReviewPage = ({ cards }: Props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // state of search
    const [search, setSearch] = useState<undefined | string>(undefined);

    // state of data
    const [card, setCard] = useState<Value[]>(cards);
    const [filteredOptions, setFilteredOptions] = useState<Value[]>([]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string | Value | null) => {
        (typeof value === 'string' || value === null) ? setSearch(undefined) : setSearch(value.label);
    };

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

    useEffect(() => {
        setFilteredOptions(card.filter(option =>
            option.label.toLowerCase().includes((search || '').toLowerCase())
        ));
    }, [search, card]);

    function onDeleteAction(id: number | string) {
        setFilteredOptions((currentItems) => {
            return currentItems.filter((i) => i.id !== id);
        });
        setCard((currentItems) => {
            return currentItems.filter((i) => i.id !== id);
        });
    }

    function onEditAction(id: number | string) {
    }

    return (
        <Fragment>
            <div className='position-relative' style={{ marginTop: '35px' }}>
                <Autocomplete
                    freeSolo
                    value={search}
                    onChange={handleChange}
                    sx={{ border: '1px solid #133266', "& fieldset": { border: 'none' }, backgroundColor: '#AEBED6', borderRadius: '20px' }}
                    renderInput={(params) => (
                        <div style={{ position: 'relative' }}>
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.7666" cy="11.7666" r="8.98856" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.0183 18.4851L21.5423 22" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    ),
                                    sx: {
                                        animation: isFocused ? `${shakeLabel} 0.3s ease-in-out` : '',
                                    },
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            {
                                search === undefined ? (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 40,
                                            transform: isFocused ? 'translate(-30px, -40px)' : '',
                                            padding: '0 5px',
                                            pointerEvents: 'none',
                                            transition: 'transform 0.3s ease-in-out',
                                            fontSize: '15px',
                                            color: '#133266'
                                        }}
                                    >
                                        Search for a Cards Box
                                    </Box>
                                )
                                    : (
                                        <></>
                                    )
                            }
                        </div>
                    )}
                    options={filteredOptions}
                    fullWidth
                />
            </div>
            <div className='scrollable-div' style={{ overflowY: 'scroll', height: `${height - 250}px` }}>
                {
                    filteredOptions.map((item, index) => {
                        return <ListItemBox
                            {...item}
                            key={item.id}
                            index={index}
                            onDeleteAction={onDeleteAction}
                            onEditAction={onEditAction} />
                    })
                }
            </div>
        </Fragment>
    )
}

export default CardReviewPage;