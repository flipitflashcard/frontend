import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// import MUI Components
import { Container } from '@mui/material';

// import main layer and other components
import Layout from '@/components/Layout';

// import components
import EditWordsPage from '@/components/EditWordsPage';

interface Props {
    data: {
        chiocedWord: {
            label: string,
            description: string,
            example: string
            type: string
            id: number
        },
        cardsBox: {
            label: string,
            number: number,
            id: number
        }[],
        chiocedCardBox: {
            label: string,
            number: number,
            id: number
        }
    };
}

const EditWord = ({ data }: Props) => {
    const { push, asPath } = useRouter();

    const backToReviewPage = () => {
        push(`/review/${asPath.split('/')[2].split('-')[1]}`);
    }

    return (
        <Layout title={`Edit Word`}>
            <main className='bg-edit'>
                <Container maxWidth='sm' className='p-4'>
                    <div className='d-flex flex-row align-items-center'>
                        <span className='cursor-pointer' onClick={backToReviewPage}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.66668 10.2212L3.66668 21.7798C3.66668 25.8065 6.51868 28.3332 10.5547 28.3332L21.4453 28.3332C25.4813 28.3332 28.3333 25.8198 28.3333 21.7798L28.3333 10.2212C28.3333 6.18117 25.4813 3.6665 21.4453 3.6665L10.5547 3.6665C6.51868 3.6665 3.66668 6.18117 3.66668 10.2212Z" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.552 15.9999L21.448 15.9999" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.5703 20.9972L10.5516 15.9998L15.5703 11.0025" stroke="#133266" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <h2 className='fw-bold ms-4' style={{ color: '#133266' }}>
                            Edit Word
                        </h2>
                    </div>
                    <EditWordsPage chiocedWord={data.chiocedWord} cardsBox={data.cardsBox} chiocedCardBox={data.chiocedCardBox} />
                </Container>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { resolvedUrl } = context;

    const url_details = decodeURIComponent(resolvedUrl).split('/');
    const id = parseInt(url_details[2].split('-')[2]);
    const boxName = url_details[2].split('-')[1];

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
    const chiocedWord = data.find((item) => item.id === id);

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
    const chiocedCardBox = cardsBox.find((item) => item.label === boxName);

    return {
        props: {
            data: {
                chiocedWord,
                cardsBox,
                chiocedCardBox
            }
        }
    };
};

export default EditWord;