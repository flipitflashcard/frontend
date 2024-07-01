import React, { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';

// import context
import { clickChecking } from '@/context/Exceptional';

// import components
import CardViewPage from '@/components/CardViewPage';

interface Props {
    data: {
        data: [],
        title: string
    };
}

const CardView = ({ data }: Props) => {
    const { push } = useRouter();

    // add context
    const { cardViewCounter, setOutCardViewCounter } = clickChecking();

    const backToReview = () => {
        push(`/review/${data.title}`)
    }

    useEffect(() => {
        setOutCardViewCounter(1);
    }, [])

    return (
        <Layout title='Cards View'>
            <div className='bg-card-title-view'>
                <Container maxWidth='sm' className='p-3'>
                    <div className='d-flex flex-row align-items-center justify-content-between mt-2'>
                        <span onClick={backToReview}>
                            <h2 style={{ color: "white", cursor: 'pointer' }}>Done</h2>
                        </span>
                        <span className='cursor-pointer'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.4527 26.8857V8.72864" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M27.8895 21.4242L22.4524 26.8864L17.0154 21.4242" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.21462 5.11053V23.2676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.77783 10.572L9.21487 5.1098L14.6519 10.572" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <div className='d-flex flex-row align-items-center justify-content-center mt-4'>
                        <h4 style={{ color: "white" }}>
                            {cardViewCounter <= data.data.length ? cardViewCounter : data.data.length} of {data.data.length}
                        </h4>
                    </div>
                </Container>
            </div>
            <div className='bg-card-view-body'>
                <Container maxWidth='sm' className='p-4'>
                    <CardViewPage slides={data.data} title={data.title} />
                </Container>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { resolvedUrl } = context;

    const url_details = decodeURIComponent(resolvedUrl).split('/');
    const title = url_details[url_details.length - 1];

    const data = [
        {
            label: 'Eat',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 1
        },
        {
            label: 'Snack',
            type: 'Noun',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 2
        },
        {
            label: 'Hello',
            type: 'Adverb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 3
        },
        {
            label: 'Honey',
            type: 'Adjective',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 4
        },
        {
            label: 'Pure',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 5
        },
    ]

    return {
        props: {
            data: {
                data,
                title
            }
        }
    };
};

export default CardView;