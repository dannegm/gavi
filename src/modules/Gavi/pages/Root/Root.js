import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { Button, FlexboxGrid, Icon } from 'rsuite';

import themes from '@styles/themes';
import { getRunningWeek } from '@helpers/dateHelpers';

import GaviButton from '@gavi/components/Button';
import Logo from '@gavi/components/Logo';

import {
    // breakline
    PageWrapper,
    GradeWrapper,
    EditorButtonWrapper,
} from './Root.styled';

const EDITOR_MODE = `${process.env.REACT_APP_EDITOR_MODE}` === 'true';
const DEFAULT_GRADE = process.env.REACT_APP_DEFAULT_GRADE;

const Root = () => {
    const history = useHistory();
    const [canRender, setCanRender] = useState(false);

    const go = (grade) => {
        history.push(`/aprende${grade}`);
    };

    const goEditor = (grade) => () => {
        history.push(`/editor/${grade}/${getRunningWeek() + 1}`);
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

            {EDITOR_MODE && (
                <FlexboxGrid justify='center' style={{ marginTop: 20 }}>
                    <FlexboxGrid.Item colspan={8}>
                        <FlexboxGrid.Item>
                            <Button block size='lg' appearance='primary' onClick={goEditor(1)}>
                                <Icon icon='dashboard' /> Abrir editor
                            </Button>
                        </FlexboxGrid.Item>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            )}

            <PageWrapper>
                <GradeWrapper>
                    <ThemeProvider theme={themes.grade1}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Primer grado'
                            onClick={() => go(1)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(1)}>
                                    <Icon icon='dashboard' /> Editar Primer Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade2}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Segundo grado'
                            onClick={() => go(2)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(2)}>
                                    <Icon icon='dashboard' /> Editar Segundo Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade3}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Tercer grado'
                            onClick={() => go(3)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(3)}>
                                    <Icon icon='dashboard' /> Editar Tercer Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade4}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Cuarto grado'
                            onClick={() => go(4)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(4)}>
                                    <Icon icon='dashboard' /> Editar Cuarto Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade5}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Quinto grado'
                            onClick={() => go(5)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(5)}>
                                    <Icon icon='dashboard' /> Editar Quinto Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>

                <GradeWrapper>
                    <ThemeProvider theme={themes.grade6}>
                        <Logo />
                        <GaviButton
                            icon='arrow-forward'
                            label='Sexto grado'
                            onClick={() => go(6)}
                        />
                        {EDITOR_MODE && (
                            <EditorButtonWrapper>
                                <Button onClick={goEditor(6)}>
                                    <Icon icon='dashboard' /> Editar Sexto Grado
                                </Button>
                            </EditorButtonWrapper>
                        )}
                    </ThemeProvider>
                </GradeWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;
