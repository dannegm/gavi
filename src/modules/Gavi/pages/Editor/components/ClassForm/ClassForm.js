import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { FlexboxGrid, Divider, Panel, Button, ButtonGroup, DatePicker, Icon } from 'rsuite';

import { FORMAT_COMMON, formatDate } from '@helpers/dateHelpers';

import SubjectForm from '../SubjectForm';
import SubjectItem from '../SubjectItem';

import { FormControl, FormLabel, Spacer } from './ClassForm.styled';

const ClassForm = ({ onCancel, onCreate }) => {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const [showSubjectForm, setShowSubjectForm] = useState(true);
    const [canAddSubject, setCanAddSubject] = useState(false);
    const [canCreate, setCanCreate] = useState(false);

    const [subjects, setSubjects] = useState([]);

    const handleDateSelect = (val) => {
        setSelectedDate(val);
        setDatePickerOpen(false);
    };

    const handleAddSubject = ({ subject, learn, books }) => {
        const copySubjects = [...subjects];
        copySubjects.push({
            id: nanoid(),
            subject,
            learn,
            books,
        });
        setSubjects(copySubjects);
        setShowSubjectForm(false);
    };

    const handleRemoveSubject = (subject) => {
        const filteredSubjects = subjects.filter((s) => s.id !== subject.id);
        setSubjects(filteredSubjects);
    };

    const handleCreate = () => {
        onCreate({
            subjects,
            grade: selectedGrade,
            date: formatDate(selectedDate, FORMAT_COMMON),
        });
    };

    const handleCancel = () => {
        setSelectedGrade(null);
        setSelectedDate(new Date());
        setDatePickerOpen(false);
        setShowSubjectForm(false);
        setCanAddSubject([]);
        onCancel();
    };

    useEffect(() => {
        setCanAddSubject(!!selectedGrade && !!selectedDate);
        setCanCreate(!!selectedGrade && !!selectedDate && !!subjects.length);
    }, [selectedGrade, selectedDate, subjects]);

    return (
        <Panel header='Creando clase' bordered style={{ borderTop: '4px solid #334750' }}>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}>
                    <FormControl>
                        <FormLabel>Grado</FormLabel>
                        <ButtonGroup block>
                            <Button
                                active={selectedGrade === 1}
                                onClick={() => setSelectedGrade(1)}
                            >
                                1
                            </Button>
                            <Button
                                active={selectedGrade === 2}
                                onClick={() => setSelectedGrade(2)}
                            >
                                2
                            </Button>
                            <Button
                                active={selectedGrade === 3}
                                onClick={() => setSelectedGrade(3)}
                            >
                                3
                            </Button>
                            <Button
                                active={selectedGrade === 4}
                                onClick={() => setSelectedGrade(4)}
                            >
                                4
                            </Button>
                            <Button
                                active={selectedGrade === 5}
                                onClick={() => setSelectedGrade(5)}
                            >
                                5
                            </Button>
                            <Button
                                active={selectedGrade === 6}
                                onClick={() => setSelectedGrade(6)}
                            >
                                6
                            </Button>
                        </ButtonGroup>
                    </FormControl>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={6}>
                    <FormControl>
                        <FormLabel>Fecha</FormLabel>
                        <DatePicker
                            block
                            value={selectedDate}
                            cleanable={false}
                            open={datePickerOpen}
                            onSelect={handleDateSelect}
                            onClick={() => setDatePickerOpen(true)}
                        />
                    </FormControl>
                </FlexboxGrid.Item>

                <Spacer />

                <FlexboxGrid.Item colspan={6}>
                    <FormControl>
                        <FormLabel>&nbsp;</FormLabel>
                        <Button
                            block
                            disabled={!canAddSubject}
                            onClick={() => setShowSubjectForm(true)}
                        >
                            <Icon icon='plus' /> Añadir materia
                        </Button>
                    </FormControl>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {canAddSubject && showSubjectForm && (
                <>
                    <Divider />
                    <SubjectForm
                        grade={selectedGrade}
                        onCancel={() => setShowSubjectForm(false)}
                        onCreate={handleAddSubject}
                    />
                </>
            )}

            <Divider />

            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}>
                    {subjects.length === 0 ? (
                        <Button
                            block
                            size='lg'
                            disabled={!canAddSubject}
                            onClick={() => setShowSubjectForm(true)}
                        >
                            <Icon icon='plus' /> Añadir materia
                        </Button>
                    ) : (
                        <>
                            {subjects.map((subject, index) => (
                                <div key={subject.id} style={{ marginTop: index === 0 ? 0 : 10 }}>
                                    <SubjectItem
                                        onRemove={() => handleRemoveSubject(subject)}
                                        {...subject}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <Divider />

            <FlexboxGrid justify='end' style={{ gap: 16 }}>
                <FlexboxGrid.Item colspan={6}>
                    <Button block appearance='subtle' onClick={handleCancel}>
                        Cancelar
                    </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <Button block appearance='primary' disabled={!canCreate} onClick={handleCreate}>
                        <Icon icon='save' /> Guardar
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
};

ClassForm.propTypes = {
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
};

ClassForm.defaultProps = {
    onCancel: () => null,
    onCreate: () => null,
};

export default ClassForm;
