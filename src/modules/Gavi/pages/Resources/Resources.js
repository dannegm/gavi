import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '@gavi/layout/Page';

const Resources = () => {
    const { grade } = useParams();

    return (
        <Page grade={grade} title='Material'>
            <h1>Material</h1>
        </Page>
    );
};

export default Resources;
