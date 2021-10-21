import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { FlexboxGrid, Divider, Panel, Badge, Button, Icon, Tag, List } from 'rsuite';

import subjectsData from '@assets/data/subjects';

import { formatDate } from '@helpers/dateHelpers';

import SubjectForm from '../SubjectForm';
import SubjectItem from '../SubjectItem';

import { Spacer } from './ScheduleForm.styled';

const ScheduleForm = ({ type, date, grade, data, onSave }) => {
    const [hasChanges, setHasChanges] = useState(false);
    const [showSubjectForm, setShowSubjectForm] = useState(false);

    const [subjects, setSubjects] = useState([]);

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
        setHasChanges(true);
    };

    const handleRemoveSubject = (subject) => {
        const filteredSubjects = subjects.filter((s) => s.id !== subject.id);
        setSubjects(filteredSubjects);
        setHasChanges(true);
    };

    const handleCreate = () => {
        onSave({
            date,
            subjects,
            grade,
        });

        setShowSubjectForm(false);
        setSubjects([]);
        setHasChanges(false);
    };

    const handleSort = ({ oldIndex, newIndex }) => {
        setSubjects((d) => {
            const moveData = d.splice(oldIndex, 1);
            const newData = [...d];
            newData.splice(newIndex, 0, moveData[0]);
            return newData;
        });
        setHasChanges(true);
    };

    const handlePreview = () => {
        window.open(`./#/aprende${grade}/materias/${date}`, '_blank');
    };

    useEffect(() => {
        if (data) {
            const subs = data.map(({ subjectCode: code, books, learn }) => {
                return {
                    id: nanoid(),
                    books,
                    learn,
                    subject: {
                        code,
                        label: `${code} - ${subjectsData[code]?.name}`,
                    },
                };
            });
            setSubjects(subs);
        }
    }, [data]);

    const editedStyles = { backgroundColor: hasChanges ? '#ffedf5' : 'white' };

    return (
        <Panel
            header={
                <FlexboxGrid align='middle' style={{ gap: 10 }}>
                    <FlexboxGrid.Item>
                        <b>{formatDate(new Date(date), 'MMM D')}</b>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <Tag color='blue'>{subjects.length}</Tag>
                    </FlexboxGrid.Item>

                    <Spacer />

                    <FlexboxGrid.Item>
                        <Button size='xs' onClick={handlePreview}>
                            <Icon icon='external-link-square' /> Preview
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            }
            style={{
                ...editedStyles,
                borderTop: `4px solid ${type !== 'create' ? '#334750' : '#dedede'}`,
            }}
            bordered
        >
            {showSubjectForm && (
                <>
                    <SubjectForm
                        grade={grade}
                        onCancel={() => setShowSubjectForm(false)}
                        onCreate={handleAddSubject}
                        style={{
                            marginLeft: -20,
                            marginRight: -20,
                        }}
                    />
                    <Divider />
                </>
            )}

            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}>
                    <Button block size='lg' onClick={() => setShowSubjectForm(true)}>
                        <Icon icon='plus' /> Añadir materia
                    </Button>

                    <List sortable onSort={handleSort} style={editedStyles}>
                        {subjects.map((subject, index) => (
                            <List.Item key={subject.id} index={index} style={editedStyles}>
                                <SubjectItem
                                    onRemove={() => handleRemoveSubject(subject)}
                                    {...subject}
                                />
                            </List.Item>
                        ))}
                    </List>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {subjects.length < 1 && <Divider />}

            <FlexboxGrid justify='end' style={{ gap: 16 }}>
                <FlexboxGrid.Item colspan={24}>
                    <Badge
                        content={subjects.length}
                        style={{
                            display: 'block',
                            width: '100%',
                        }}
                    >
                        <Button block appearance='primary' onClick={handleCreate}>
                            <Icon icon='save' /> {type === 'create' ? 'Crear' : 'Guardar'}
                        </Button>
                    </Badge>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
};

ScheduleForm.propTypes = {
    type: PropTypes.oneOf(['create', 'update']),
    date: PropTypes.string.isRequired,
    grade: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
    onSave: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any,
};

ScheduleForm.defaultProps = {
    type: 'create',
    data: undefined,
    onSave: () => null,
};

export default ScheduleForm;
