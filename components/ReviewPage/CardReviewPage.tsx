import React, { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { TextField, Autocomplete, keyframes, Box, Modal, Typography, Button } from '@mui/material';

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

const styleModalOption = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 275,
    height: 275,
    gap: '0',
    borderRadius: '15px',
    borderTopWidth: '3px',
    borderBottomWidth: '6px',
    background: "#FFFFFF",
    borderWidth: '3px, 3px, 5px, 3px',
    borderStyle: 'solid',
    borderColor: '#133266',
    p: 3
};

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
    const { push, asPath } = useRouter();

    const [isFocused, setIsFocused] = useState<boolean>(false);

    // state of search
    const [search, setSearch] = useState<undefined | string>(undefined);

    // state of data
    const [card, setCard] = useState<Value[]>(cards);
    const [filteredOptions, setFilteredOptions] = useState<Value[]>([]);

    //  state of open modal yws or no
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteId, setDeleteId] = useState<number | string | null>(null);

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

    const confirmDelete = () => {
        if (deleteId !== null) {
            setFilteredOptions(currentItems => currentItems.filter(i => i.id !== deleteId));
            setCard(currentItems => currentItems.filter(i => i.id !== deleteId));
            setOpenModal(false);
            setDeleteId(null);
        }
    };

    const onDeleteAction = (id: number | string) => {
        setDeleteId(id);
        setOpenModal(true);
    };

    const onEditAction = (id: number | string, label: string, type: string) => {
        push(`/edit-word/${label}-${asPath.split('/')[2]}-${id}`)
    };

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
            {
                openModal ? (
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModalOption}>
                            <Typography id="modal-modal-title" variant="h6" component="h2"
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    lineHeight: '23.14px',
                                    textAlign: 'left',
                                    color: '#133266',
                                }}>
                                Are You Sure You Want To Delete This Word From The Cards Box?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 10 }} display='flex' alignItems='center' justifyContent='space-between' flexDirection='row'>
                                <Button className='cancel-style' onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button className='delete-style' onClick={confirmDelete}>Delete</Button>
                            </Typography>
                        </Box>
                    </Modal>
                ) : null
            }
        </Fragment >
    )
}

export default CardReviewPage;