/**
 * Functional component for rendering a card view page with swiper functionality.
 * 
 * @param slides An array of objects containing data for each slide to be displayed.
 * @returns JSX element representing the card view page with swiper functionality.
 */

import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// import swiper 
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectCreative } from 'swiper/modules';

// import context
import { clickChecking } from '@/context/Exceptional';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import MUI Components
import { Box, Button, Grid } from '@mui/material';


type Slide = {
    label: string;
    description: string;
    example: string;
    type: string;
    id: number;
};

type Props = {
    slides: Slide[];
    title: string;
};

const CardViewPage = ({ slides, title }: Props) => {
    const { push, asPath } = useRouter();

    // add context
    const { handleChangeNextViewCounter, handleChangePrevViewCounter } = clickChecking();

    // swiper
    const swiperRef = useRef(null);
    const [prevIndex, setPrevIndex] = useState<number>(0);

    // flip state
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

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

    /// Handles the slide change event in the Swiper component.
    /// This function is called whenever the active slide in the Swiper component changes. It updates the `isFlipped` state, calls the appropriate `handleChangeNextViewCounter` or `handleChangePrevViewCounter` function from the `clickChecking` context, and updates the `prevIndex` state.
    /// @param swiper The Swiper instance that triggered the slide change event.
    const handleSlideChange = (swiper: SwiperType) => {
        const currentIndex = swiper.activeIndex;
        const isNext = currentIndex > prevIndex;
        setIsFlipped(false);
        isNext ? handleChangeNextViewCounter() : handleChangePrevViewCounter();
        setPrevIndex(currentIndex);
    };

    return (
        <Fragment>
            <div style={{ height: `${height - 120}px` }} className='d-flex align-items-center'>
                <Swiper
                    ref={swiperRef}
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-120%', 0, -500],
                        },
                        next: {
                            shadow: true,
                            translate: ['120%', 0, -500],
                        },
                    }}
                    modules={[EffectCreative]}
                    className="mySwiper2"
                    onSlideChange={(swiper) => handleSlideChange(swiper)}
                    style={{
                        width: '300px',
                        height: '500px'
                    }}
                >
                    {
                        slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="card-container">
                                    <div className={`card ${isFlipped ? 'flipped' : ''}`} style={{ border: 'none' }}>
                                        <div className="card-face card-front">
                                            <Box className='d-flex flex-row-reverse justify-content-between w-100 align-items-center'>
                                                <section>
                                                    <Button style={{ minWidth: '0' }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.7499 4.5C11.6589 4.5 11.4349 4.525 11.3159 4.763L9.48992 8.414C9.20092 8.991 8.64392 9.392 7.99992 9.484L3.91192 10.073C3.64192 10.112 3.54992 10.312 3.52192 10.396C3.49692 10.477 3.45692 10.683 3.64292 10.861L6.59892 13.701C7.06992 14.154 7.28392 14.807 7.17192 15.446L6.47592 19.456C6.43292 19.707 6.58992 19.853 6.65992 19.903C6.73392 19.959 6.93192 20.07 7.17692 19.942L10.8319 18.047C11.4079 17.75 12.0939 17.75 12.6679 18.047L16.3219 19.941C16.5679 20.068 16.7659 19.957 16.8409 19.903C16.9109 19.853 17.0679 19.707 17.0249 19.456L16.3269 15.446C16.2149 14.807 16.4289 14.154 16.8999 13.701L19.8559 10.861C20.0429 10.683 20.0029 10.476 19.9769 10.396C19.9499 10.312 19.8579 10.112 19.5879 10.073L15.4999 9.484C14.8569 9.392 14.2999 8.991 14.0109 8.413L12.1829 4.763C12.0649 4.525 11.8409 4.5 11.7499 4.5ZM6.94692 21.5C6.53392 21.5 6.12392 21.37 5.77292 21.114C5.16692 20.67 4.86992 19.937 4.99892 19.199L5.69492 15.189C5.72092 15.04 5.66992 14.889 5.55992 14.783L2.60392 11.943C2.05992 11.422 1.86492 10.652 2.09492 9.937C2.32692 9.214 2.94092 8.697 3.69792 8.589L7.78592 8C7.94392 7.978 8.07992 7.881 8.14792 7.743L9.97492 4.091C10.3119 3.418 10.9919 3 11.7499 3C12.5079 3 13.1879 3.418 13.5249 4.091L15.3529 7.742C15.4219 7.881 15.5569 7.978 15.7139 8L19.8019 8.589C20.5589 8.697 21.1729 9.214 21.4049 9.937C21.6349 10.652 21.4389 11.422 20.8949 11.943L17.9389 14.783C17.8289 14.889 17.7789 15.04 17.8049 15.188L18.5019 19.199C18.6299 19.938 18.3329 20.671 17.7259 21.114C17.1109 21.565 16.3099 21.626 15.6309 21.272L11.9779 19.379C11.8349 19.305 11.6639 19.305 11.5209 19.379L7.86792 21.273C7.57592 21.425 7.26092 21.5 6.94692 21.5Z" fill="#133266" />
                                                        </svg>
                                                    </Button>
                                                    <Button style={{ minWidth: '0' }}
                                                        onClick={() => {
                                                            push(`/edit-word/${slide.label}-${title}-${slide.id}`);
                                                            localStorage.setItem('path', asPath);
                                                        }}
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11.0208 6.00092L16.473 10.188" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Button>
                                                </section>
                                                <section>
                                                    <Button style={{ minWidth: '0' }}>
                                                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.33585 16.0002C3.33213 17.6397 3.25897 19.876 4.27329 20.7119C5.21942 21.4916 5.8853 21.2907 7.61264 21.4175C9.34121 21.5454 12.9893 26.6267 15.8017 25.0194C17.2525 23.8786 17.3603 21.4868 17.3603 16.0002C17.3603 10.5136 17.2525 8.12182 15.8017 6.98096C12.9893 5.37252 9.34121 10.455 7.61264 10.5829C5.8853 10.7097 5.21942 10.5088 4.27329 11.2885C3.25897 12.1244 3.33213 14.3607 3.33585 16.0002Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M26.1124 7.87201C29.5125 12.7667 29.5237 19.2232 26.1124 24.1274" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M22.7751 11.0859C24.5236 14.1401 24.5236 17.87 22.7751 20.9147" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Button>
                                                </section>
                                            </Box>
                                            <Box component='h2' mt={18} className='fw-bold' fontSize={40} color='#133266'>{slide.label}</Box>
                                            <Box mt={18}>
                                                <Button className='flip-btn' onClick={() => setIsFlipped(true)}>
                                                    Flip
                                                </Button>
                                            </Box>
                                        </div>
                                        <div className="card-face card-back">
                                            <Box className='d-flex flex-row-reverse justify-content-between w-100 align-items-center'>
                                                <section>
                                                    <Button style={{ minWidth: '0' }}>
                                                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.33585 16.0002C3.33213 17.6397 3.25897 19.876 4.27329 20.7119C5.21942 21.4916 5.8853 21.2907 7.61264 21.4175C9.34121 21.5454 12.9893 26.6267 15.8017 25.0194C17.2525 23.8786 17.3603 21.4868 17.3603 16.0002C17.3603 10.5136 17.2525 8.12182 15.8017 6.98096C12.9893 5.37252 9.34121 10.455 7.61264 10.5829C5.8853 10.7097 5.21942 10.5088 4.27329 11.2885C3.25897 12.1244 3.33213 14.3607 3.33585 16.0002Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M26.1124 7.87201C29.5125 12.7667 29.5237 19.2232 26.1124 24.1274" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M22.7751 11.0859C24.5236 14.1401 24.5236 17.87 22.7751 20.9147" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Button>
                                                    <Button style={{ minWidth: '0' }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.7499 4.5C11.6589 4.5 11.4349 4.525 11.3159 4.763L9.48992 8.414C9.20092 8.991 8.64392 9.392 7.99992 9.484L3.91192 10.073C3.64192 10.112 3.54992 10.312 3.52192 10.396C3.49692 10.477 3.45692 10.683 3.64292 10.861L6.59892 13.701C7.06992 14.154 7.28392 14.807 7.17192 15.446L6.47592 19.456C6.43292 19.707 6.58992 19.853 6.65992 19.903C6.73392 19.959 6.93192 20.07 7.17692 19.942L10.8319 18.047C11.4079 17.75 12.0939 17.75 12.6679 18.047L16.3219 19.941C16.5679 20.068 16.7659 19.957 16.8409 19.903C16.9109 19.853 17.0679 19.707 17.0249 19.456L16.3269 15.446C16.2149 14.807 16.4289 14.154 16.8999 13.701L19.8559 10.861C20.0429 10.683 20.0029 10.476 19.9769 10.396C19.9499 10.312 19.8579 10.112 19.5879 10.073L15.4999 9.484C14.8569 9.392 14.2999 8.991 14.0109 8.413L12.1829 4.763C12.0649 4.525 11.8409 4.5 11.7499 4.5ZM6.94692 21.5C6.53392 21.5 6.12392 21.37 5.77292 21.114C5.16692 20.67 4.86992 19.937 4.99892 19.199L5.69492 15.189C5.72092 15.04 5.66992 14.889 5.55992 14.783L2.60392 11.943C2.05992 11.422 1.86492 10.652 2.09492 9.937C2.32692 9.214 2.94092 8.697 3.69792 8.589L7.78592 8C7.94392 7.978 8.07992 7.881 8.14792 7.743L9.97492 4.091C10.3119 3.418 10.9919 3 11.7499 3C12.5079 3 13.1879 3.418 13.5249 4.091L15.3529 7.742C15.4219 7.881 15.5569 7.978 15.7139 8L19.8019 8.589C20.5589 8.697 21.1729 9.214 21.4049 9.937C21.6349 10.652 21.4389 11.422 20.8949 11.943L17.9389 14.783C17.8289 14.889 17.7789 15.04 17.8049 15.188L18.5019 19.199C18.6299 19.938 18.3329 20.671 17.7259 21.114C17.1109 21.565 16.3099 21.626 15.6309 21.272L11.9779 19.379C11.8349 19.305 11.6639 19.305 11.5209 19.379L7.86792 21.273C7.57592 21.425 7.26092 21.5 6.94692 21.5Z" fill="#133266" />
                                                        </svg>
                                                    </Button>
                                                    <Button style={{ minWidth: '0' }}
                                                        onClick={() => {
                                                            push(`/edit-word/${slide.label}-${title}-${slide.id}`);
                                                            localStorage.setItem('path', asPath);
                                                        }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11.0208 6.00092L16.473 10.188" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Button>
                                                </section>
                                                <section className='type-design'>
                                                    {slide.type}
                                                </section>
                                            </Box>
                                            <Box mt={10} color='#133266' display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                                                <Box component='h2' fontWeight='bold' fontSize={40} >{slide.label}</Box>
                                                <Box mt={4}>{slide.description}</Box>
                                                <Box mt={2}>{slide.example}</Box>
                                            </Box>
                                            <Grid container spacing={1} display='flex' alignItems='center' justifyContent='space-between' flexDirection='row' mt={10}>
                                                <Grid xs={6} item>
                                                    <Button startIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="11.7666" cy="11.7666" r="8.98856" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" fill="#133266" />
                                                        <circle cx="14.5" cy="8.5" r="1.5" fill="#133266" />
                                                        <path d="M15.5 16C15.5 16 14.5 14 11.5 14C8.5 14 8 16 8 16" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    } className='forgot-btn'>
                                                        Forgot
                                                    </Button>
                                                </Grid>
                                                <Grid xs={6} item>
                                                    <Button onClick={(swiper) => setIsFlipped(false)} startIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="11.7666" cy="11.7666" r="8.98856" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" fill="#133266" />
                                                        <circle cx="14.5" cy="8.5" r="1.5" fill="#133266" />
                                                        <path d="M8 14C8 14 9 16 12 16C15 16 15.5 14 15.5 14" stroke="#133266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    } className='know-btn'>
                                                        Know
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </Fragment >
    )
}

export default CardViewPage;
