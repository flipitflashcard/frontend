import React, { ReactNode, Fragment } from 'react';
import Head from 'next/head';

// import components
import Navbar from './Navbar';

type Props = {
    title: string,
    children: ReactNode
}

const Layout = ({ title, children }: Props) => {
    return (
        <Fragment>
            <Head>
                <title>{`Flip - ${title}`}</title>
                <meta name="description" content="The ready sample for NextJs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='d-flex flex-column justify-content-between align-items-center' /*style={{ height: '100vh' }}*/>
                {children}
                <Navbar />
            </div>
        </Fragment>
    )
}

export default Layout;