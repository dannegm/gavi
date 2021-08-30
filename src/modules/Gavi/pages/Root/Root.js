import React, { useEffect, useState } from 'react';
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

const DEFAULT_GRADE = process.env.REACT_APP_DEFAULT_GRADE;

const Root = () => {
    const history = useHistory();
    const [canRender, setCanRender] = useState(false);

    const go = (grade) => {
        history.push(`/aprende${grade}`);
    };

    useEffect(() => {
        if (DEFAULT_GRADE !== undefined) {
            go(DEFAULT_GRADE);
        } else {
            setCanRender(true);
        }
    }, []);

    if (!canRender) {
        return <></>;
    }

    return (
        <>
            <Helmet>
                <title>Gavi - Santillana</title>
            </Helmet>

            <PageWrapper>
                <GradeWrapper>
                    <ThemeProvider theme={themes.grade1}>
                        <Logo />
                        <Button icon='arrow-forward' label='Primer grado' onClick={() => go(1)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade2}>
                        <Logo />
                        <Button icon='arrow-forward' label='Segundo grado' onClick={() => go(2)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade3}>
                        <Logo />
                        <Button icon='arrow-forward' label='Tercer grado' onClick={() => go(3)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade4}>
                        <Logo />
                        <Button icon='arrow-forward' label='Cuarto grado' onClick={() => go(4)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade5}>
                        <Logo />
                        <Button icon='arrow-forward' label='Quinto grado' onClick={() => go(5)} />
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade6}>
                        <Logo />
                        <Button icon='arrow-forward' label='Sexto grado' onClick={() => go(6)} />
                    </ThemeProvider>
                </GradeWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;
