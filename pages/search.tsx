import React from 'react';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';
import CardSearchPage from '@/components/CardSearchPage';

const Search = () => {
    return (
        <Layout title='Search'>
            <main className='bg-search'>
                <Container maxWidth='sm' className='p-4'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        Search
                    </h2>
                    <CardSearchPage />
                </Container>
            </main>
        </Layout>
    )
}

export default Search;