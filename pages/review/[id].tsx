import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

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
    return (
        <Layout title={`Review-${data.title}`}>
            <main className='bg-search'>
                <Container maxWidth='sm' className='p-4'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        {data.title}
                    </h2>
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
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 2
        },
        {
            label: 'Hello',
            type: 'Verb',
            description: `put (food) into the mouth and chew and swallow it.`,
            example: `"he was eating a hot dog"`,
            id: 3
        },
        {
            label: 'Honey',
            type: 'Verb',
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