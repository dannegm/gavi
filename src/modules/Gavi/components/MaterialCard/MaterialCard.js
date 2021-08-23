import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import logoGratuitos from '@assets/images/gratuitos.png';
import logoDetectives from '@assets/images/detectives.png';

import { MaterialCardWrapper, MaterialCardLogo, MaterialCardPages } from './MaterialCard.styled';

const MaterialCard = ({ type, pages }) => {
    const theme = useContext(ThemeContext);

    const books = {
        santillana: theme.logo,
        gratuito: logoGratuitos,
        detectives: logoDetectives,
    };

    const getPagesCaption = (p) => {
        if (p.length > 1) {
            return `Páginas ${p[0]} a ${p[p.length - 1]}`;
        }

        return `Página ${p[0]}`;
    };

    return (
        <MaterialCardWrapper>
            <MaterialCardLogo src={books[type]} />
            <MaterialCardPages>{getPagesCaption(pages)}</MaterialCardPages>
        </MaterialCardWrapper>
    );
};

MaterialCard.propTypes = {
    type: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MaterialCard;
