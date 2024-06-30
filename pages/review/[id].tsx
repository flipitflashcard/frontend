import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

// import MUI Components
import { Container } from '@mui/material';

// import main layer and other components
import Layout from '@/components/Layout';
import CardReviewPage from '@/components/ReviewPage/CardReviewPage';

interface Props {
    data: {
        title: string;
        data: []
    };
}

const Review = ({ data }: Props) => {
    const { push } = useRouter();

    const backToHomePage = () => {
        push('/home');
    }

    const goToCardView = () => {
        push(`/card-view/${data.title}`);
    }

    return (
        <Layout title={`Review-${data.title}`}>
            <main className='bg-search'>
                <Container maxWidth='sm' className='p-4'>
                    <div className='d-flex flex-row align-items-center justify-content-between'>
                        <span className='cursor-pointer' onClick={backToHomePage}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.66668 10.2212L3.66668 21.7798C3.66668 25.8065 6.51868 28.3332 10.5547 28.3332L21.4453 28.3332C25.4813 28.3332 28.3333 25.8198 28.3333 21.7798L28.3333 10.2212C28.3333 6.18117 25.4813 3.6665 21.4453 3.6665L10.5547 3.6665C6.51868 3.6665 3.66668 6.18117 3.66668 10.2212Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.552 15.9999L21.448 15.9999" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.5703 20.9972L10.5516 15.9998L15.5703 11.0025" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h2 className='fw-bold' style={{ color: '#133266' }}>
                            {data.title}
                        </h2>
                        <span className='cursor-pointer' onClick={goToCardView}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 3.33331C22.9945 3.33331 28.6667 9.00418 28.6667 16C28.6667 22.9958 22.9945 28.6666 16 28.6666C9.0042 28.6666 3.33333 22.9958 3.33333 16C3.33333 9.00418 9.0042 3.33331 16 3.33331Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 15.9935C20 14.912 14.4567 11.4522 13.8279 12.0743C13.1991 12.6964 13.1386 19.2321 13.8279 19.9128C14.5172 20.5959 20 17.075 20 15.9935Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <CardReviewPage cards={data.data} />
                </Container>
            </main>
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
                title,
                data
            }
        }
    };
};

export default Review;