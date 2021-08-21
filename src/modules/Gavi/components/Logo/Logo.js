import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { LogoWrapper, LogoElement } from './Logo.styled';

const Logo = () => {
    const theme = useContext(ThemeContext);

    return (
        <LogoWrapper>
            <LogoElement src={theme.logo} alt='' />
        </LogoWrapper>
    );
};

export default Logo;
