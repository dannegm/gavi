import React from 'react';
import PropTypes from 'prop-types';

import { Button, FlexboxGrid, Icon, IconButton, Tag } from 'rsuite';

const BookItem = ({ book, canRemove, onRemove }) => {
    const pages = book.pages.map((p) => p.join(', '));
    return (
        <FlexboxGrid align='top' justify='space-between'>
            <FlexboxGrid.Item colspan={canRemove ? 20 : 24}>
                <FlexboxGrid style={{ gap: 10 }} align='middle'>
                    <FlexboxGrid.Item colspan={24}>{book.label}</FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={24}
                        style={{ display: (book.pages || []).length ? 'block' : 'none' }}
                    >
                        {pages.map((page) => (
                            <Tag key={`page_${page}`}>{page}</Tag>
                        ))}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                        colspan={24}
                        style={{
                            display: (book.interactiveLink || '').trim() !== '' ? 'block' : 'none',
                        }}
                    >
                        <Button color='cyan' size='xs' href={book.interactiveLink} target='_blank'>
                            Ver interactivo
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
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
