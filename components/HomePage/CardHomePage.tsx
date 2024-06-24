import React, { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { TextField, Autocomplete, keyframes, Box, Modal, Grid, Button, Snackbar } from '@mui/material';

// import context
import { clickChecking } from '@/context/Exceptional';

// import components
import EffectiveCard from '../EffectiveCard';
import ListItem from './ListItem';

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

const EffectStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "transparent",
    border: "none",
    outline: "none",
    p: 4,
};

const NewCardStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    transform: "translate(-50%, -50%)",
    bgcolor: "#AEBED6",
    border: "3px solid #133266",
    borderRadius: "15px",
    p: 4,
};

type Value = {
    label: string,
    number: number,
    id: number
}

const CardHomePage = () => {
    const { push } = useRouter();

    // add context
    const { openEffectCard, handleChangeClick } = clickChecking();

    // state of search
    const [search, setSearch] = useState<undefined | string>(undefined);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isNewCardOpen, setIsNewCardOpen] = useState<boolean>(false);

    // state of new card 
    const [topic, setTopic] = useState<string>('');

    // import state of state of new card validation 
    const [topicError, setTopicError] = useState<string>('');

    // state of data
    const [card, setCard] = useState<Value[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<Value[]>([]);

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        {
            label: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { label: 'The Good, the Bad and the Ugly', year: 1966 },
        { label: 'Fight Club', year: 1999 },
        {
            label: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            label: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { label: 'Forrest Gump', year: 1994 },
        { label: 'Inception', year: 2010 },
        {
            label: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { label: 'Goodfellas', year: 1990 },
        { label: 'The Matrix', year: 1999 },
        { label: 'Seven Samurai', year: 1954 },
        {
            label: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { label: 'City of God', year: 2002 },
        { label: 'Se7en', year: 1995 },
        { label: 'The Silence of the Lambs', year: 1991 },
        { label: "It's a Wonderful Life", year: 1946 },
        { label: 'Life Is Beautiful', year: 1997 },
        { label: 'The Usual Suspects', year: 1995 },
        { label: 'Léon: The Professional', year: 1994 },
        { label: 'Spirited Away', year: 2001 },
        { label: 'Saving Private Ryan', year: 1998 },
        { label: 'Once Upon a Time in the West', year: 1968 },
        { label: 'American History X', year: 1998 },
        { label: 'Interstellar', year: 2014 },
        { label: 'Casablanca', year: 1942 },
        { label: 'City Lights', year: 1931 },
        { label: 'Psycho', year: 1960 },
        { label: 'The Green Mile', year: 1999 },
        { label: 'The Intouchables', year: 2011 },
        { label: 'Modern Times', year: 1936 },
        { label: 'Raiders of the Lost Ark', year: 1981 },
        { label: 'Rear Window', year: 1954 },
        { label: 'The Pianist', year: 2002 },
        { label: 'The Departed', year: 2006 },
        { label: 'Terminator 2: Judgment Day', year: 1991 },
        { label: 'Back to the Future', year: 1985 },
        { label: 'Whiplash', year: 2014 },
        { label: 'Gladiator', year: 2000 },
        { label: 'Memento', year: 2000 },
        { label: 'The Prestige', year: 2006 },
        { label: 'The Lion King', year: 1994 },
        { label: 'Apocalypse Now', year: 1979 },
        { label: 'Alien', year: 1979 },
        { label: 'Sunset Boulevard', year: 1950 },
        {
            label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
            year: 1964,
        },
        { label: 'The Great Dictator', year: 1940 },
        { label: 'Cinema Paradiso', year: 1988 },
        { label: 'The Lives of Others', year: 2006 },
        { label: 'Grave of the Fireflies', year: 1988 },
        { label: 'Paths of Glory', year: 1957 },
        { label: 'Django Unchained', year: 2012 },
        { label: 'The Shining', year: 1980 },
        { label: 'WALL·E', year: 2008 },
        { label: 'American Beauty', year: 1999 },
        { label: 'The Dark Knight Rises', year: 2012 },
        { label: 'Princess Mononoke', year: 1997 },
        { label: 'Aliens', year: 1986 },
        { label: 'Oldboy', year: 2003 },
        { label: 'Once Upon a Time in America', year: 1984 },
        { label: 'Witness for the Prosecution', year: 1957 },
        { label: 'Das Boot', year: 1981 },
        { label: 'Citizen Kane', year: 1941 },
        { label: 'North by Northwest', year: 1959 },
        { label: 'Vertigo', year: 1958 },
        {
            label: 'Star Wars: Episode VI - Return of the Jedi',
            year: 1983,
        },
        { label: 'Reservoir Dogs', year: 1992 },
        { label: 'Braveheart', year: 1995 },
        { label: 'M', year: 1931 },
        { label: 'Requiem for a Dream', year: 2000 },
        { label: 'Amélie', year: 2001 },
        { label: 'A Clockwork Orange', year: 1971 },
        { label: 'Like Stars on Earth', year: 2007 },
        { label: 'Taxi Driver', year: 1976 },
        { label: 'Lawrence of Arabia', year: 1962 },
        { label: 'Double Indemnity', year: 1944 },
        {
            label: 'Eternal Sunshine of the Spotless Mind',
            year: 2004,
        },
        { label: 'Amadeus', year: 1984 },
        { label: 'To Kill a Mockingbird', year: 1962 },
        { label: 'Toy Story 3', year: 2010 },
        { label: 'Logan', year: 2017 },
        { label: 'Full Metal Jacket', year: 1987 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: '2001: A Space Odyssey', year: 1968 },
        { label: "Singin' in the Rain", year: 1952 },
        { label: 'Toy Story', year: 1995 },
        { label: 'Bicycle Thieves', year: 1948 },
        { label: 'The Kid', year: 1921 },
        { label: 'Inglourious Basterds', year: 2009 },
        { label: 'Snatch', year: 2000 },
        { label: '3 Idiots', year: 2009 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ];

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string | Value | null) => {
        (typeof value === 'string' || value === null) ? setSearch(undefined) : setSearch(value.label);
    };

    const handleAddNewCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (topic === "") {
            setTopicError('Topic is required!');
        } else {
            setTopicError('');
            const newCard = { label: topic, number: card.length + 1, id: card.length + 1 };
            setCard([...card, newCard]);
            setTopic('');
            setIsNewCardOpen(false);
        }
    }

    const addNewCardsBox = () => {
        const designNavbarElement = document.querySelector('.design-navbar');

        if (designNavbarElement && !document.querySelector('.new-cards-box')) {
            const newCardsBoxElement = document.createElement('div');
            newCardsBoxElement.className = 'new-cards-box';
            newCardsBoxElement.innerHTML = `
        <button class='btn-new-cards-box'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7366 2.7619H8.08461C6.00461 2.7539 4.29961 4.4109 4.25061 6.4909V17.3399C4.21561 19.3899 5.84861 21.0809 7.89961 21.1169C7.96061 21.1169 8.02261 21.1169 8.08461 21.1149H16.0726C18.1416 21.0939 19.8056 19.4089 19.8026 17.3399V8.0399L14.7366 2.7619Z" stroke="#133266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.4743 2.75011V5.65911C14.4743 7.07911 15.6233 8.23011 17.0433 8.23411H19.7973" stroke="#133266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.2937 12.9142H9.39371" stroke="#133266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.8445 15.3639V10.4639" stroke="#133266" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          New Cards Box
        </button>
      `;
            const existingSecondChild = designNavbarElement.children[0];
            designNavbarElement.insertBefore(newCardsBoxElement, existingSecondChild);

            const button = newCardsBoxElement.querySelector('.btn-new-cards-box');
            if (button) {
                button.addEventListener('click', () => push('/add-card-box'));
            }
        }
    }

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
        setCard([
            {
                label: 'Common Verbs',
                number: 253,
                id: 1
            },
            {
                label: 'Dommon Verbs',
                number: 300,
                id: 2
            },
            {
                label: 'Xommon Verbs',
                number: 265,
                id: 3
            },
            {
                label: 'Aommon Verbs',
                number: 265,
                id: 4
            },
            {
                label: 'Wommon Verbs',
                number: 265,
                id: 5
            },
            {
                label: 'Rommon Verbs',
                number: 265,
                id: 6
            },
            {
                label: 'Tommon Verbs',
                number: 265,
                id: 7
            }
        ])
        addNewCardsBox();
    }, []);

    useEffect(() => {
        setFilteredOptions(card.filter(option =>
            option.label.toLowerCase().includes((search || '').toLowerCase())
        ));
    }, [search, card]);

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (): void => {
        setIsFocused(false);
    };

    function onCompleteLeft(id: number | string) {
        setFilteredOptions((currentItems) => {
            return currentItems.filter((i) => i.id !== id);
        });
        setCard((currentItems) => {
            return currentItems.filter((i) => i.id !== id);
        });
    }

    function onCompleteRight(id: number | string) {
        handleChangeClick();
    }

    return (
        <Fragment>
            <div className='position-relative' style={{ marginTop: '35px' }}>
                <Autocomplete
                    freeSolo
                    value={search}
                    onChange={handleChange}
                    sx={{ border: '1px solid #133266', "& fieldset": { border: 'none' }, backgroundColor: '#EFC1C4', borderRadius: '20px' }}
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
                                onFocus={handleFocus}
                                onBlur={handleBlur}
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
            <div className='scrollable-div' style={{ overflowY: 'scroll', height: `${height - 300}px` }}>
                {
                    filteredOptions.map((item, index) => {
                        return <ListItem
                            {...item}
                            key={item.id}
                            index={index}
                            onCompleteLeft={onCompleteLeft}
                            onCompleteRight={onCompleteRight} />
                    })
                }
            </div>
            {
                openEffectCard ? (
                    <Modal
                        open={openEffectCard}
                        onClose={handleChangeClick}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={EffectStyle}>
                            <EffectiveCard data={top100Films} />
                        </Box>
                    </Modal>
                ) : (
                    null
                )
            }
            {/* {
                isNewCardOpen ? (
                    <Modal
                        open={isNewCardOpen}
                        onClose={() => setIsNewCardOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ backgroundColor: 'rgb(0 0 0 / 45%)' }}
                    >
                        <Box component="form" onSubmit={handleAddNewCard} noValidate sx={NewCardStyle}>
                            <TextField
                                value={topic}
                                id="topic"
                                label="Topic"
                                placeholder="Common Verbs"
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
                                sx={{ border: 'none', "& fieldset": { border: '1px solid black', borderRadius: '20px' } }}
                            />
                            <Grid container className="mt-3">
                                <Grid item xs textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="main-button"
                                        style={{ width: '50%' }}
                                    >
                                        Confirm
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </Modal>
                ) : (
                    null
                )
            } */}
        </Fragment>
    )
}

export default CardHomePage;