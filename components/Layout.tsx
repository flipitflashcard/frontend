import React, { ReactNode } from 'react';
import Head from 'next/head';

// import style library
import { Container } from '@mui/material';

// import components
import Header from './Header';

type Props = {
    title: string,
    children: ReactNode
}

const Layout = ({ title, children }: Props) => {
    return (
        <Container maxWidth='md'>
            <Head>
                <title>{`Sample - ${title}`}</title>
                <meta name="description" content="The ready sample for NextJs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='d-flex flex-column'>
                <Header />
                {children}
            </div>
        </Container>
    )
}

export default Layout;