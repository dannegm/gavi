import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { flattenDeep } from 'lodash';

import DangerouslyHtml from '@components/DangerouslyHtml';

import { series } from '@assets/data/books';

import { MaterialCardWrapper, MaterialCardLogo, MaterialCardPages } from './MaterialCard.styled';

const pageGroups = (groups) => {
    return groups.map((pages) => {
        if (pages.length === 1) {
            return `<b>${pages[0]}</b>`;
        }
        return `<b>${pages[0]}</b> a <b>${pages[pages.length - 1]}</b>`;
    });
};

const buildPageLabel = (pages) => {
    if (flattenDeep(pages).length === 1) {
        return `<b>${flattenDeep(pages)[0]}</b>`;
    }

    const groups = pageGroups(pages);
    if (groups.length === 1) {
        return `${groups[0]}`;
    }

    const lastGroup = groups.pop();
    return `${groups.join(', ')} y ${lastGroup}`;
};

const MaterialCard = ({ type, pages }) => {
    const theme = useContext(ThemeContext);

    const santillana = {
        ...series.santillana,
        logo: theme.logo,
    };

    const books = {
        ...series,
        santillana,
        vidasaludable: santillana,
    };

    const getPagesCaption = (p) => {
        let label = 'Páginas';

        if (flattenDeep(p).length === 1) {
            label = 'Página';
        }

        return `${label}<br />${buildPageLabel(p)}`;
    };

    return (
        <MaterialCardWrapper>
            <MaterialCardLogo src={books[type].logo} />
            <MaterialCardPages>
                <DangerouslyHtml>{getPagesCaption(pages)}</DangerouslyHtml>
            </MaterialCardPages>
        </MaterialCardWrapper>
    );
};

MaterialCard.propTypes = {
    type: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
    ).isRequired,
};

export default MaterialCard;
