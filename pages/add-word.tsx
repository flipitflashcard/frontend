import React from 'react';
import { GetServerSideProps } from 'next';

// import MUI Components
import { Container } from '@mui/material';

// import main layer
import Layout from '@/components/Layout';

// import components
import AddWordsPage from '@/components/AddWordsPage';

interface Props {
    data: {
        cardsBox: {
            label: string,
            number: number,
            id: number
        }[],
    };
}

const AddWord = ({ data }: Props) => {
    return (
        <Layout title='Add Word'>
            <main className='bg-edit'>
                <Container maxWidth='sm' className='p-4'>
                    <div className='d-flex flex-row align-items-center'>
                        <h2 className='fw-bold' style={{ color: '#133266', fontSize: '35pt' }}>
                            Add Word
                        </h2>
                    </div>
                    <AddWordsPage cardsBox={data.cardsBox} />
                </Container>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const cardsBox = [
        {
            label: 'Common Verbs',
            number: 253,
            id: 1
        },
        {
            label: 'Dommon Verbs',
            number: 300,
            id: 2
        },
        {
            label: 'Xommon Verbs',
            number: 265,
            id: 3
        },
        {
            label: 'Aommon Verbs',
            number: 265,
            id: 4
        },
        {
            label: 'Wommon Verbs',
            number: 265,
            id: 5
        },
        {
            label: 'Rommon Verbs',
            number: 265,
            id: 6
        },
        {
            label: 'Tommon Verbs',
            number: 265,
            id: 7
        }
    ]

    return {
        props: {
            data: {
                cardsBox,
            }
        }
    };
};

export default AddWord;