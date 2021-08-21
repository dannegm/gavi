import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '@gavi/layout/Page';

const Downloadables = () => {
    const { grade } = useParams();

    return (
        <Page grade={grade} title='Descargables'>
            <h1>Descargables</h1>
        </Page>
    );
};

export default Downloadables;
