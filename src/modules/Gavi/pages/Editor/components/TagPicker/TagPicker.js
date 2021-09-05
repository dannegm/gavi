import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { trim } from 'lodash';

import { Icon, IconButton, Input, Tag, Tooltip, Whisper } from 'rsuite';

import { TagPickerWrapper } from './TagPicker.styled';

const TagPicker = forwardRef(({ tooltip, onChange }, $ref) => {
    const [tags, setTags] = useState([]);
    const [typing, setTyping] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const handleTagChange = (value) => {
        if (`${value}`.match(/^[0-9]{0,}(,[0-9]{0,})*$/g)) {
            setTagInput(value);
        }
    };

    const handleTagConfirm = () => {
        if (tagInput.trim() !== '') {
            const copyTags = [...tags];
            copyTags.push(trim(tagInput, ','));
            setTags(copyTags);
        }
        setTagInput('');
        setTyping(false);
    };

    const handleTagRemove = (tag) => {
        const filtered = tags.filter((t) => t !== tag);
        setTags(filtered);
    };

    const handleAddClick = () => {
        setTyping(true);
    };

    const reset = () => {
        setTags([]);
    };

    const setValue = (value) => {
        setTags(value);
    };

    const handleWrapperClick = (ev) => {
        setTyping(!typing);
        ev.stopPropagation();
        ev.preventDefault();
    };

    useEffect(() => {
        onChange(tags);
    }, [tags]);

    useImperativeHandle($ref, () => ({
        reset,
        setValue,
    }));

    return (
        <TagPickerWrapper focused={typing} onClick={handleWrapperClick}>
            {tooltip.trim() !== '' ? (
                <Whisper placement='top' speaker={<Tooltip>{tooltip}</Tooltip>}>
                    <Icon icon='file' />
                </Whisper>
            ) : (
                <Icon icon='file' />
            )}
            {tags.map((tag) => (
                <Tag closable key={`tag_${tag}`} onClose={() => handleTagRemove(tag)}>
                    {tag}
                </Tag>
            ))}
            {typing && (
                <Input
                    size='xs'
                    style={{ width: 70 }}
                    value={tagInput}
                    onChange={handleTagChange}
                    onPressEnter={handleTagConfirm}
                    onBlur={handleTagConfirm}
                    autoFocus
                />
            )}
            {!typing && (
                <IconButton
                    size='xs'
                    appearance='ghost'
                    icon={<Icon icon='plus' />}
                    onClick={handleAddClick}
                />
            )}
        </TagPickerWrapper>
    );
});

TagPicker.propTypes = {
    tooltip: PropTypes.string,
    onChange: PropTypes.func,
};

TagPicker.defaultProps = {
    tooltip: '',
    onChange: () => null,
};

export default TagPicker;
