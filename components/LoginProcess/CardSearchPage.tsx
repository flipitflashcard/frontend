import React, { useState, Fragment, useEffect } from 'react';

// import MUI Components
import { TextField, Autocomplete, keyframes, Box, SelectChangeEvent } from '@mui/material';

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
    year: number
}

const CardSearchPage = () => {

    // state of search
    const [search, setSearch] = useState<string | undefined>(undefined);

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string | Value | null) => {
        if (typeof value === 'string' || value === null) {
            setSearch(undefined);
        } else {
            setSearch(value.label);
        }
    };
    
    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (): void => {
        setIsFocused(false);
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

    const card = [
        {
            word: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`
        },
        {
            word: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`
        },
        {
            word: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`
        },
        {
            word: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`
        },
        {
            word: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`
        },
    ]

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
                                        Search for a word
                                    </Box>
                                )
                                    : (
                                        <></>
                                    )
                            }
                        </div>
                    )}
                    options={top100Films}
                    fullWidth
                />
            </div>
            <div className='scrollable-div' style={{ overflowY: 'scroll', height: `${height - 280}px` }}>
                {
                    card.map((item, index) => {
                        return <div className='card-global-page mt-4' key={index} >
                            <div className='d-flex fex-row align-items-center'>
                                <h3 className='me-3 fw-bold'>{item.word}</h3>
                                <span className='border-type'>{item.type}</span>
                            </div>
                            <div className='mt-3'>
                                {item.description}
                            </div>
                            <div className='mt-3'>
                                {item.example}
                            </div>
                        </div>
                    })
                }
            </div>
        </Fragment>
    )
}

export default CardSearchPage;