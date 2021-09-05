import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { flattenDeep } from 'lodash';

import DangerouslyHtml from '@components/DangerouslyHtml';

import { series } from '@assets/data/books';

import Button from '../Button';
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

const MaterialCard = ({ serie, pages, interactiveLink }) => {
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
            <MaterialCardLogo src={books[serie].logo} />

            <MaterialCardPages show={pages && Boolean(pages.length)}>
                <DangerouslyHtml>{getPagesCaption(pages)}</DangerouslyHtml>
            </MaterialCardPages>

            <MaterialCardPages show={interactiveLink && interactiveLink.trim() !== ''}>
                <Button link label='Interactivo' href={interactiveLink} target='_blank' />
            </MaterialCardPages>
        </MaterialCardWrapper>
    );
};

MaterialCard.propTypes = {
    serie: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
    ),
    interactiveLink: PropTypes.string,
};
MaterialCard.defaultProps = {
    pages: [],
    interactiveLink: '',
};

export default MaterialCard;
