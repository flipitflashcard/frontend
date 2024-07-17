import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';

// import components
import AddCardsBoxPage from '@/components/AddCardsBoxPage';

// import SVG
import leftSquare from '@/public/Icons/left-square.svg'

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
                            <Image priority src={leftSquare} alt='left-square' width={32} height={32} />
                        </span>
                        <h2 className='fw-bold ms-4' style={{ color: '#133266', fontSize: '35pt' }}>
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