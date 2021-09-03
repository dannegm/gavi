import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { FlexboxGrid, Divider, List, Panel, Button, Icon, Input, SelectPicker } from 'rsuite';

import subjects from '@assets/data/subjects';

import BookForm from '../BookForm';
import BookItem from '../BookItem';

const mappedSubjects = Object.values(subjects).map((subject) => ({
    ...subject,
    label: `${subject.code} - ${subject.name}`,
}));

const SubjectForm = ({ grade, onCancel, onCreate, style }) => {
    const [subject, setSubject] = useState(null);
    const [learn, setLearn] = useState('');
    const [books, setBooks] = useState([]);

    const [canCreate, setCanCreate] = useState(false);

    const handleSubjectSelect = (_, item) => {
        setSubject(item);
    };

    const handleLearnChange = (val) => {
        setLearn(val);
    };

    const handleBookCreate = (book) => {
        const copyBooks = [...books];
        copyBooks.push({
            id: nanoid(),
            ...book,
        });
        setBooks(copyBooks);
    };

    const handleRemoveBook = (book) => {
        const filteredBooks = books.filter((b) => b.id !== book.id);
        setBooks(filteredBooks);
    };

    const handleCreate = () => {
        onCreate({
            subject,
            learn,
            books,
        });
        setSubject(null);
        setLearn('');
        setBooks([]);
    };

    const handleCancel = () => {
        setSubject(null);
        setLearn('');
        setBooks([]);
        onCancel();
    };

    useEffect(() => {
        setCanCreate(!!subject);
    }, [subject]);

    return (
        <Panel
            header='Materia'
            bordered
            style={{
                ...style,
                borderTop: '4px solid #07222c',
                borderBottom: '4px solid #07222c',
            }}
        >
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}>
                    <SelectPicker
                        block
                        size='lg'
                        value={subject ? subject.code : null}
                        valueKey='code'
                        data={mappedSubjects}
                        onSelect={handleSubjectSelect}
                    />
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24} style={{ marginTop: 16 }}>
                    <Input
                        componentClass='textarea'
                        rows={4}
                        placeholder='Aprendizaje'
                        value={learn}
                        onChange={handleLearnChange}
                    />
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <Divider>Libros</Divider>

            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}>
                    <BookForm grade={grade} onCreate={handleBookCreate} />
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {books.length === 0 && <Divider />}

            {books.length > 0 && (
                <List hover style={{ marginTop: 16 }}>
                    {books.map((book, index) => (
                        <List.Item key={book.id} index={index}>
                            <BookItem
                                book={book}
                                onRemove={() => handleRemoveBook(book)}
                                canRemove
                            />
                        </List.Item>
                    ))}
                </List>
            )}

            <FlexboxGrid justify='space-between' style={{ marginTop: 16 }}>
                <FlexboxGrid.Item colspan={11}>
                    <Button block size='sm' appearance='subtle' onClick={handleCancel}>
                        Cancelar
                    </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11}>
                    <Button
                        block
                        size='sm'
                        appearance='primary'
                        disabled={!canCreate}
                        onClick={handleCreate}
                    >
                        <Icon icon='save' /> Guardar
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
};

SubjectForm.propTypes = {
    grade: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.any,
};

SubjectForm.defaultProps = {
    style: {},
    grade: 1,
    onCancel: () => null,
    onCreate: () => null,
};

export default SubjectForm;
