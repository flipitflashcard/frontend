import React from 'react';
import { useRouter } from 'next/router';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';

// import components
import AddCardsBoxPage from '@/components/AddCardsBoxPage';

const AddCardBox = () => {
    const { push } = useRouter();

    const backToHomePage = () => {
        push('/flip');
    }

    return (
        <Layout title='Add Card Box'>
            <main className='bg-add-card-box'>
                <Container maxWidth='sm' className='p-4'>
                    <div className='d-flex flex-row align-items-center'>
                        <span className='cursor-pointer' onClick={backToHomePage}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.66668 10.2212L3.66668 21.7798C3.66668 25.8065 6.51868 28.3332 10.5547 28.3332L21.4453 28.3332C25.4813 28.3332 28.3333 25.8198 28.3333 21.7798L28.3333 10.2212C28.3333 6.18117 25.4813 3.6665 21.4453 3.6665L10.5547 3.6665C6.51868 3.6665 3.66668 6.18117 3.66668 10.2212Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.552 15.9999L21.448 15.9999" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.5703 20.9972L10.5516 15.9998L15.5703 11.0025" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h2 className='fw-bold ms-4' style={{ color: '#133266' }}>
                            Add Cards Box
                        </h2>
                    </div>
                    <AddCardsBoxPage />
                </Container>
            </main>
        </Layout>
    )
}

export default AddCardBox;