import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonToolbar, ButtonGroup, Button, Container, Content, FlexboxGrid, Icon } from 'rsuite';

import useGradeData from '@gavi/hooks/useGradeData';
import { getWeekDays } from '@helpers/dateHelpers';
import { downloadJson } from '@helpers/utils';

import JsonView from './components/JsonView';
import ScheduleForm from './components/ScheduleForm';

import { Spacer } from './Editor.styled';

const Editor = () => {
    const $uploader = useRef();
    const history = useHistory();
    const { grade, week } = useParams();

    const [weeks, setWeeks] = useState(getWeekDays(week));

    const {
        // breakline
        gradeData,
        setGrade,
        upsertSchedule,
        loadScheduleData,
    } = useGradeData(grade);

    const handleSetGrade = (value) => {
        history.push(`/editor/${value}/${week}`);
        window.location.reload();
    };

    const handlePrevWeek = () => {
        if (week > 1) {
            history.push(`/editor/${grade}/${+week - 1}`);
        }
    };

    const handleNextWeek = () => {
        history.push(`/editor/${grade}/${+week + 1}`);
    };

    const handleScheduleCreate = (newClass) => {
        upsertSchedule(newClass);
    };

    const handleUpload = (event) => {
        const [importedFile] = event.target.files;
        const $fileReader = new FileReader();
        $fileReader.onloadend = () => {
            loadScheduleData($fileReader.result);
        };
        $fileReader.readAsText(importedFile);
    };

    const handleDownload = () => {
        downloadJson(gradeData, `grade${grade}.json`);
    };

    useEffect(() => {
        setGrade(grade);
    }, [grade]);

    useEffect(() => {
        setWeeks(getWeekDays(week));
    }, [week]);

    return (
        <Container>
            <Content>
                <FlexboxGrid justify='center'>
                    <FlexboxGrid.Item colspan={14}>
                        <FlexboxGrid
                            align='middle'
                            style={{ gap: 8, marginTop: 20, marginBottom: 10 }}
                        >
                            <FlexboxGrid.Item>
                                <ButtonGroup block>
                                    {[1, 2, 3, 4, 5, 6].map((g) => (
                                        <Button
                                            key={`grade_nav_${g}`}
                                            appearance={
                                                `${grade}` === `${g}` ? 'primary' : 'default'
                                            }
                                            active={`${grade}` === `${g}`}
                                            onClick={() => handleSetGrade(g)}
                                        >
                                            {g}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </FlexboxGrid.Item>

                            <Spacer />

                            <FlexboxGrid.Item>
                                <ButtonToolbar>
                                    <ButtonGroup>
                                        <Button appearance='ghost' onClick={handlePrevWeek}>
                                            <Icon icon='chevron-left' />
                                        </Button>
                                        <Button
                                            disabled
                                            appearance='ghost'
                                            style={{
                                                color: 'black',
                                                opacity: 1,
                                            }}
                                        >
                                            Semana {week}
                                        </Button>
                                        <Button appearance='ghost' onClick={handleNextWeek}>
                                            <Icon icon='chevron-right' />
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </FlexboxGrid.Item>

                            <Spacer />

                            <FlexboxGrid.Item>
                                <input
                                    ref={$uploader}
                                    style={{ display: 'none' }}
                                    type='file'
                                    accept='application/json'
                                    onChange={handleUpload}
                                />
                                <Button onClick={() => $uploader.current.click()}>
                                    <Icon icon='upload' /> Importar
                                </Button>
                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item>
                                <Button onClick={handleDownload}>
                                    <Icon icon='download' /> Exportar
                                </Button>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>

                        <JsonView name={`grade${grade}.json`} data={gradeData} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

                <FlexboxGrid style={{ gap: 20, margin: 20 }}>
                    {weeks.map((weekDay) => (
                        <FlexboxGrid.Item key={`weekDay_${weekDay}`} style={{ flex: 1 }}>
                            {gradeData[weekDay] ? (
                                <ScheduleForm
                                    type='update'
                                    date={weekDay}
                                    grade={grade}
                                    data={gradeData[weekDay]}
                                    onSave={handleScheduleCreate}
                                />
                            ) : (
                                <ScheduleForm
                                    type='create'
                                    date={weekDay}
                                    grade={grade}
                                    onSave={handleScheduleCreate}
                                />
                            )}
                        </FlexboxGrid.Item>
                    ))}
                </FlexboxGrid>
            </Content>
        </Container>
    );
};

export default Editor;
