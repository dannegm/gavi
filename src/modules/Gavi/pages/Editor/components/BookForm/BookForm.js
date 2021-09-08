import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import {
    FlexboxGrid,
    Button,
    Icon,
    InputGroup,
    Input,
    SelectPicker,
    Tag,
    Tooltip,
    Whisper,
} from 'rsuite';

import { pagesHumanToArray } from '@helpers/utils';

import { books } from '@assets/data/books';

// import TagPicker from '../TagPicker';

const grades = [1, 2, 3, 4, 5, 6].map((g) => ({ value: `${g}`, label: `${g}º Grado` }));

const BookForm = ({ grade, onCreate }) => {
    // const $tags = useRef(null);
    const [selectedGrade, setSelectedGrade] = useState(`${grade}`);
    const [canCreate, setCanCreate] = useState(false);

    const [book, setBook] = useState(null);
    const [pages, setPages] = useState([]);
    const [pagesHuman, setPagesHuman] = useState('');
    const [interactiveLink, setInteractiveLink] = useState('');

    const [bookData, setBookData] = useState([]);

    const handleReset = () => {
        // $tags.current.reset();
        setBook(null);
        setPages([]);
        setPagesHuman('');
        setInteractiveLink('');
    };

    const handlePageChange = (value) => {
        if (`${value}`.match(/^[0-9]{0,}(\s|a|y|,|[0-9]{0,})*$/g)) {
            setPagesHuman(value);
        }
    };

    const handleBookSelect = (_, item) => {
        setBook(item);
    };

    const handleCreate = () => {
        onCreate({
            ...book,
            interactiveLink,
            pages, // .map((p) => p.split(',')),
        });
        handleReset();
    };

    useEffect(() => {
        setPages(pagesHumanToArray(pagesHuman));
    }, [pagesHuman]);

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

            {/* <FlexboxGrid.Item colspan={24}>
                <TagPicker ref={$tags} tooltip='Páginas' onChange={handlePageChange} />
            </FlexboxGrid.Item> */}

            <FlexboxGrid.Item colspan={24}>
                <InputGroup>
                    <Whisper placement='top' speaker={<Tooltip>Páginas (formato humano)</Tooltip>}>
                        <InputGroup.Addon>
                            <Icon icon='file' />
                        </InputGroup.Addon>
                    </Whisper>
                    <Input placeholder='Páginas' value={pagesHuman} onChange={handlePageChange} />
                </InputGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={24}>
                {pages.map((page) => (
                    <Tag key={`page_${page}`}>{page.join(', ')}</Tag>
                ))}
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
