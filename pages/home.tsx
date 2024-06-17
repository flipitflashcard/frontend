import React from 'react';

// import MUI Components
import { Container } from '@mui/material';

// import main layer and other components
import Layout from '@/components/Layout';
import CardHomePage from '@/components/HomePage/CardHomePage';


const home = () => {

    return (
        <Layout title='Home'>
            <main className='bg-home'>
                <Container maxWidth='sm' className='p-4'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        Cards
                    </h2>
                    <CardHomePage />
                </Container>
            </main>
        </Layout>
    )
}

export default home;