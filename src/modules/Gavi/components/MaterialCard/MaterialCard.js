import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import DangerouslyHtml from '@components/DangerouslyHtml';

import booksLogos from '@assets/data/books';

import { MaterialCardWrapper, MaterialCardLogo, MaterialCardPages } from './MaterialCard.styled';

const MaterialCard = ({ type, pages }) => {
    const theme = useContext(ThemeContext);

    const books = {
        ...booksLogos,
        santillana: theme.logo,
    };

    const getPagesCaption = (p) => {
        if (p.length < 2) {
            return `Página <b>${p[0]}</b>`;
        }
        return `Páginas <br /><b>${p[0]}</b> a <b>${p[p.length - 1]}</b>`;
    };

    return (
        <MaterialCardWrapper>
            <MaterialCardLogo src={books[type]} />
            <MaterialCardPages>
                <DangerouslyHtml>{getPagesCaption(pages)}</DangerouslyHtml>
            </MaterialCardPages>
        </MaterialCardWrapper>
    );
};

MaterialCard.propTypes = {
    type: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MaterialCard;
