import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import themes from '@styles/themes';

import { PageWrapper } from './Page.styled';

const getGradeString = (grade) => {
    const grades = ['none', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6'];
    return grades[grade];
};

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
            <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
    );
};

Page.propTypes = {
    grade: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Page.defaultProps = {
    grade: 1,
    title: 'Gavi',
};

export default Page;
