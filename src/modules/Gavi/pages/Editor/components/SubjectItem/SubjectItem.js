import React from 'react';
import PropTypes from 'prop-types';

import { FlexboxGrid, List, Panel, Button, Icon } from 'rsuite';

import BookItem from '../BookItem';

const SubjectItem = ({ subject, learn, books, onRemove }) => {
    return (
        <Panel bordered style={{ borderTop: '4px solid #dedede' }}>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={16}>
                    <h6>{subject.label}</h6>
                </FlexboxGrid.Item>
                <div style={{ flex: 1 }} />
                <FlexboxGrid.Item>
                    <Button block size='xs' onClick={onRemove}>
                        <Icon icon='close' />
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24} style={{ marginTop: 16 }}>
                    <p>{learn}</p>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {books.length > 0 && (
                <List hover style={{ marginTop: 16 }}>
                    {books.map((book, index) => (
                        <List.Item key={book.id} index={index}>
                            <BookItem book={book} />
                        </List.Item>
                    ))}
                </List>
            )}
        </Panel>
    );
};

SubjectItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    subject: PropTypes.any.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    books: PropTypes.arrayOf(PropTypes.any),
    learn: PropTypes.string,
    onRemove: PropTypes.func,
};

SubjectItem.defaultProps = {
    books: [],
    learn: '',
    onRemove: () => null,
};

export default SubjectItem;
