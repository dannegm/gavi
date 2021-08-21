import React from 'react';

import { FooterWrapper, FooterCopy, FooterDecorator } from './Footer.styled';

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterCopy>
                {/* breakline */}
                ©2021 - Editorial Santillana - Todos los derechos reservados
            </FooterCopy>
            <FooterDecorator />
        </FooterWrapper>
    );
};

export default Footer;
