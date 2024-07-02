import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';
import CardReviewPage from '@/components/ReviewPage/CardReviewPage';

interface Props {
    data: {
        data: []
    };
}

const Search = ({ data }: Props) => {
    return (
        <Layout title='Search'>
            <main className='bg-search'>
                <Container maxWidth='sm' className='p-4'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        Search
                    </h2>
                    <CardReviewPage cards={data.data} />
                </Container>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
                data
            }
        }
    };
};

export default Search;