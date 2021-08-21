import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import List from '@components/List';
import useClickOutside from '@hooks/useClickOutside';

import {
    DropdownWrapper,
    DropdownTrigger,
    DropdownList,
    DropdownItemWrapper,
} from './Dropdown.styled';

const getLabel = (obj, labelKey) => {
    return typeof obj !== 'object' ? `${obj}` : obj[labelKey];
};

const DropdownItem = ({ label, selected, disabled, onClick }) => (
    <DropdownItemWrapper selected={selected} disabled={disabled} onClick={onClick}>
        {label}
    </DropdownItemWrapper>
);

DropdownItem.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
    selected: false,
    disabled: false,
    onClick: () => null,
};

const Dropdown = ({ placeholder, items, value, labelKey, onSelect }) => {
    const [label, setLabel] = useState(placeholder);
    const [isOpen, setIsOpen] = useState(false);

    const $dropdown = useClickOutside(() => {
        setIsOpen(false);
    });

    const dropdownItems = items.map((item) => {
        return {
            label: getLabel(item, labelKey),
            selected: item === value,
            onClick: () => {
                setIsOpen(false);
                onSelect(item);
            },
        };
    });

    const toggleList = (ev) => {
        ev.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setLabel(value === undefined ? placeholder : getLabel(value, labelKey));
    }, [value]);

    return (
        <DropdownWrapper ref={$dropdown}>
            <DropdownTrigger onClick={toggleList}>{label}</DropdownTrigger>
            {isOpen && (
                <DropdownList>
                    <List items={dropdownItems} component={DropdownItem} />
                </DropdownList>
            )}
        </DropdownWrapper>
    );
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    labelKey: PropTypes.string,
    onSelect: PropTypes.func,
};

Dropdown.defaultProps = {
    placeholder: 'Choose...',
    value: undefined,
    labelKey: 'label',
    onSelect: () => null,
};

export default Dropdown;
