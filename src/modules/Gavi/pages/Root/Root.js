import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import themes from '@styles/themes';

import Button from '@gavi/components/Button';
import Logo from '@gavi/components/Logo';

import {
    // breakline
    PageWrapper,
    GradeWrapper,
} from './Root.styled';

const Root = () => {
    const history = useHistory();

    const go = (grade) => {
        history.push(`/${grade}`);
    };

    return (
        <>
            <Helmet>
                <title>Gavi - Santillana</title>
            </Helmet>

            <PageWrapper>
                <GradeWrapper>
                    <ThemeProvider theme={themes.grade1}>
                        <Logo />
                        <Button icon='arrow-forward' label='Primer Grado' onClick={() => go(1)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade2}>
                        <Logo />
                        <Button icon='arrow-forward' label='Segundo Grado' onClick={() => go(2)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade3}>
                        <Logo />
                        <Button icon='arrow-forward' label='Tercer Grado' onClick={() => go(3)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade4}>
                        <Logo />
                        <Button icon='arrow-forward' label='Cuarto Grado' onClick={() => go(4)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade5}>
                        <Logo />
                        <Button icon='arrow-forward' label='Quito Grado' onClick={() => go(5)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade6}>
                        <Logo />
                        <Button icon='arrow-forward' label='Sexto Grado' onClick={() => go(6)} />
                    </ThemeProvider>
                </GradeWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;
