import React from 'react';
import PropTypes from 'prop-types';

import { FlexboxGrid, Icon, IconButton, Tag } from 'rsuite';

const BookItem = ({ book, canRemove, onRemove }) => {
    const pages = book.pages.map((p) => p.join(', '));
    return (
        <FlexboxGrid style={{ gap: 16 }} align='middle'>
            <FlexboxGrid.Item colspan={12}>{book.label}</FlexboxGrid.Item>
            <FlexboxGrid.Item style={{ flex: 1 }}>
                {pages.map((page) => (
                    <Tag key={`page_${page}`}>{page}</Tag>
                ))}
            </FlexboxGrid.Item>
            {canRemove && (
                <FlexboxGrid.Item>
                    <IconButton
                        size='xs'
                        color='red'
                        icon={<Icon icon='close' />}
                        appearance='ghost'
                        onClick={onRemove}
                    />
                </FlexboxGrid.Item>
            )}
        </FlexboxGrid>
    );
};

BookItem.propTypes = {
    onRemove: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    book: PropTypes.any.isRequired,
    canRemove: PropTypes.bool,
};

BookItem.defaultProps = {
    onRemove: () => null,
    canRemove: false,
};

export default BookItem;
