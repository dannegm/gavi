import React from 'react';
import PropTypes from 'prop-types';

import { FlexboxGrid, List, Panel, Button, Icon } from 'rsuite';

import BookItem from '../BookItem';

const SubjectItem = ({ subject, learn, books, onRemove }) => {
    return (
        <Panel bordered>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24}>
                    <h5>{subject.label}</h5>
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

            <FlexboxGrid justify='end' style={{ marginTop: 16 }}>
                <FlexboxGrid.Item>
                    <Button block onClick={onRemove}>
                        <Icon icon='close' /> Quitar
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
};

SubjectItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    subject: PropTypes.any.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    book: PropTypes.arrayOf(PropTypes.any),
    learn: PropTypes.string,
    onRemove: PropTypes.func,
};

SubjectItem.defaultProps = {
    book: [],
    learn: '',
    onRemove: () => null,
};

export default SubjectItem;
