import React from "react";

// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

// Prop Type
type MyType = {
    label: string,
    year: number
}

type EffectiveCardProps = {
    data: MyType[]
}

const EffectiveCard: React.FC<EffectiveCardProps> = ({ data }) => {
    return (
        <div>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                style={{
                    width: '240px',
                    height: '320px'
                }}
            >
                {
                    data.map((item, index) => {
                        return <SwiperSlide
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '18px',
                                fontSize: '19px',
                                fontWeight: 'bold',
                                color: '#000',
                                background: 'linear-gradient(#AED6CC, #EFC1C4)',
                            }}
                        >
                            <div className="p-4 d-flex flex-column justify-content-center align-items-center h-100">
                                <p>{item.label}</p>
                                <p>{item.year}</p>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

export default EffectiveCard;
