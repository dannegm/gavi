import React from 'react';
import PropTypes from 'prop-types';

import subjects from '@assets/data/subjects';

import { SubjectBadgeWrapper, SubjectBadgeIcon, SubjectBadgeLabel } from './SubjectBadge.styled';

const SubjectBadge = ({ code, index, onClick }) => {
    const { name, color, icon } = subjects[code];

    const handleClick = (ev) => {
        ev.preventDefault();
        onClick?.({ code, index });
    };

    return (
        <SubjectBadgeWrapper color={color} onClick={handleClick}>
            <SubjectBadgeIcon src={icon} />
            <SubjectBadgeLabel>{name}</SubjectBadgeLabel>
        </SubjectBadgeWrapper>
    );
};

SubjectBadge.propTypes = {
    code: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

SubjectBadge.defaultProps = {
    onClick: () => null,
};

export default SubjectBadge;
