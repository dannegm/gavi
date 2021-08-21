import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-eva-icons';

import { ButtonWrapper, ButtonIcon, ButtonLabel } from './Button.styled';

const Button = ({ icon, label, disabled, onClick }) => {
    const handleClick = (ev) => {
        ev.preventDefault();
        onClick(ev);
    };
    return (
        <ButtonWrapper disabled={disabled} onClick={handleClick}>
            {icon && (
                <ButtonIcon>
                    <Icon name={icon} />
                </ButtonIcon>
            )}
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonWrapper>
    );
};

Button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    icon: undefined,
    disabled: false,
};

export default Button;
