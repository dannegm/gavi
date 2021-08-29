import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { FlexboxGrid, Button, Icon, SelectPicker } from 'rsuite';

import { books } from '@assets/data/books';

import TagPicker from '../TagPicker';

const BookForm = ({ grade, onCreate }) => {
    const $tags = useRef(null);
    const [pages, setPages] = useState([]);
    const [book, setBook] = useState(null);
    const [canCreate, setCanCreate] = useState(false);

    const [bookData, setBookData] = useState([]);

    const handlePageChange = (value) => {
        setPages(value);
    };

    const handleBookSelect = (_, item) => {
        setBook(item);
    };

    const handleCreate = () => {
        onCreate({
            ...book,
            pages: pages.map((p) => p.split(',')),
        });
        $tags.current.reset();
        setBook(null);
    };

    useEffect(() => {
        const mappedBooks = books[`${grade}`].map((b) => ({
            ...b,
            id: nanoid(),
            label: `${b.serieCode} - ${b.subjectName}`,
        }));
        setBookData(mappedBooks);
    }, []);

    useEffect(() => {
        setCanCreate(pages.length !== 0 && book !== null);
    }, [pages, book]);

    return (
        <FlexboxGrid style={{ gap: 16 }} align='middle'>
            <FlexboxGrid.Item colspan={10}>
                <SelectPicker
                    block
                    value={book ? book.id : null}
                    valueKey='id'
                    data={bookData}
                    onSelect={handleBookSelect}
                />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item style={{ flex: 1 }}>
                <TagPicker ref={$tags} onChange={handlePageChange} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
                <Button block disabled={!canCreate} onClick={handleCreate}>
                    <Icon icon='plus' />
                </Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
};

BookForm.propTypes = {
    grade: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    onCreate: PropTypes.func,
};

BookForm.defaultProps = {
    grade: 1,
    onCreate: () => null,
};

export default BookForm;
