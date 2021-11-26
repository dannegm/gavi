import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import themes from '@styles/themes';

import { getGradeString } from '@gavi/helpers/utils';

import { PageWrapper } from './Page.styled';

import UnpaidScreen from '../../components/UnpaidScreen';

const Page = ({ grade, title, children }) => {
    const helmetOptions = {
        encodeSpecialCharacters: true,
        titleTemplate: '%s - Santillana',
        defaultTitle: 'Gavi',
    };

    const theme = themes[getGradeString(grade)];

    return (
        <ThemeProvider theme={theme}>
            <Helmet {...helmetOptions}>
                <title>{title}</title>
            </Helmet>
            <UnpaidScreen>
                <PageWrapper>{children}</PageWrapper>
            </UnpaidScreen>
        </ThemeProvider>
    );
};

Page.propTypes = {
    grade: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Page.defaultProps = {
    grade: 1,
    title: 'Gavi',
};

export default Page;
