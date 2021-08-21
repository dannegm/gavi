import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { PageWrapper } from './Page.styled';

const Page = ({ title, children }) => {
    const helmetOptions = {
        encodeSpecialCharacters: true,
        titleTemplate: '%s - Santillana',
        defaultTitle: 'Gavi',
    };

    return (
        <>
            <Helmet {...helmetOptions}>
                <title>{title}</title>
            </Helmet>
            <PageWrapper>{children}</PageWrapper>
        </>
    );
};

Page.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Page.defaultProps = {
    title: 'Gavi',
};

export default Page;
