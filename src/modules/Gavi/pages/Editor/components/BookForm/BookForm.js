import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import {
    FlexboxGrid,
    Button,
    Icon,
    InputGroup,
    Input,
    SelectPicker,
    Tooltip,
    Whisper,
} from 'rsuite';

import { books } from '@assets/data/books';

import TagPicker from '../TagPicker';

const grades = [1, 2, 3, 4, 5, 6].map((g) => ({ value: `${g}`, label: `${g}º Grado` }));

const BookForm = ({ grade, onCreate }) => {
    const $tags = useRef(null);
    const [selectedGrade, setSelectedGrade] = useState(`${grade}`);
    const [canCreate, setCanCreate] = useState(false);

    const [book, setBook] = useState(null);
    const [pages, setPages] = useState([]);
    const [interactiveLink, setInteractiveLink] = useState('');

    const [bookData, setBookData] = useState([]);

    const handleReset = () => {
        $tags.current.reset();
        setBook(null);
        setPages([]);
        setInteractiveLink('');
    };

    const handlePageChange = (value) => {
        setPages(value);
    };

    const handleBookSelect = (_, item) => {
        setBook(item);
    };

    const handleCreate = () => {
        onCreate({
            ...book,
            interactiveLink,
            pages: pages.map((p) => p.split(',')),
        });
        handleReset();
    };

    useEffect(() => {
        setCanCreate(book !== null && (pages.length !== 0 || interactiveLink.trim() !== ''));
    }, [interactiveLink, pages, book]);

    useEffect(() => {
        setSelectedGrade(`${grade}`);
        handleReset();
    }, [grade]);

    useEffect(() => {
        setBook(null);
        const mappedBooks = books[`${selectedGrade}`].map((b) => ({
            ...b,
            id: nanoid(),
            label: `${b.serieCode} - ${b.subjectName} ${selectedGrade}`,
        }));
        setBookData(mappedBooks);
    }, [selectedGrade]);

    return (
        <FlexboxGrid style={{ gap: 16 }} align='middle'>
            <FlexboxGrid.Item colspan={24}>
                <SelectPicker
                    block
                    cleanable={false}
                    searchable={false}
                    data={grades}
                    value={selectedGrade}
                    onSelect={(val) => setSelectedGrade(val)}
                />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
                <SelectPicker
                    block
                    value={book ? book.id : null}
                    valueKey='id'
                    data={bookData}
                    onSelect={handleBookSelect}
                />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={24}>
                <TagPicker ref={$tags} tooltip='Páginas' onChange={handlePageChange} />
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={24}>
                <InputGroup>
                    <Whisper placement='top' speaker={<Tooltip>Interactivo (opcional)</Tooltip>}>
                        <InputGroup.Addon>
                            <Icon icon='lightbulb-o' />
                        </InputGroup.Addon>
                    </Whisper>
                    <Input
                        placeholder='http://'
                        value={interactiveLink}
                        onChange={(val) => setInteractiveLink(val)}
                    />
                </InputGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={24}>
                <Button block disabled={!canCreate} onClick={handleCreate}>
                    <Icon icon='plus' />
                </Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
};

BookForm.propTypes = {
    grade: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
    onCreate: PropTypes.func,
};

BookForm.defaultProps = {
    grade: '1',
    onCreate: () => null,
};

export default BookForm;
