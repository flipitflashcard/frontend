import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// import MUI Components
import { Container } from '@mui/material';

// import main layer and other components
import Layout from '@/components/Layout';
import CardSearchPage from '@/components/CardSearchPage';

interface Props {
    title: string;
}

const Review = ({ title }: Props) => {
    return (
        <Layout title='Search'>
            <main className='bg-search'>
                <Container maxWidth='sm' className='p-4'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        {title}
                    </h2>
                    <CardSearchPage />
                </Container>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { resolvedUrl } = context;

    const url_details = decodeURIComponent(resolvedUrl).split('/');
    const title = url_details[url_details.length - 1];

    return {
        props: {
            title
        }
    };
};

export default Review;