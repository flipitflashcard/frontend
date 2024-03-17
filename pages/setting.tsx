import React from 'react';

// import MUI Components
import { Container } from '@mui/material';

// import main layer and other components
import Layout from '@/components/Layout';
import SettingStructure from '@/components/SettingStructure';

const Setting = () => {
    return (
        <Layout title='Setting'>
            <main className='bg-setting'>
                <Container maxWidth='xs' className='p-5'>
                    <h2 className='fw-bold' style={{ color: '#133266' }}>
                        Setting
                    </h2>
                    <SettingStructure />
                </Container>
            </main>
        </Layout>
    )
}

export default Setting;