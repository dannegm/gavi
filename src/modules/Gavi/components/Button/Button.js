import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-eva-icons';

import { ButtonWrapper, ButtonIcon, ButtonLabel } from './Button.styled';

const Button = ({ icon, label, disabled, link, href, target, onClick }) => {
    const handleClick = (ev) => {
        ev.preventDefault();
        onClick(ev);
    };

    return link ? (
        <ButtonWrapper as='a' disabled={disabled} href={href} target={target}>
            {icon && (
                <ButtonIcon>
                    <Icon name={icon} />
                </ButtonIcon>
            )}
            <ButtonLabel>{label}</ButtonLabel>
        </ButtonWrapper>
    ) : (
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
    link: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    icon: undefined,
    disabled: false,
    link: false,
    href: '',
    target: '',
    onClick: () => null,
};

export default Button;
