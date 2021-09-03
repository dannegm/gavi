import React from 'react';
import PropTypes from 'prop-types';

import List from '@components/List';
import DangerouslyHtml from '@components/DangerouslyHtml';

import PageCard from '../PageCard';

import { PageSectionWrapper, PageSectionTitle, PageSectionGrid } from './PageSection.styled';

const PageSection = ({ title, folder, identifier, pages, getPageUrl }) => {
    const pagesPayload = pages.map((page) => ({
        src: getPageUrl(folder, identifier, page),
        alt: `Folder: ${folder} | Identifier: ${identifier} | Pag: ${page}`,
    }));

    const formattedTitle = title
        .split(' ')
        .map((word, index) => {
            return index % 2 === 0 ? word : `<b>${word}</b>`;
        })
        .join(' ');

    return (
        <PageSectionWrapper>
            <PageSectionTitle>
                <DangerouslyHtml>{formattedTitle}</DangerouslyHtml>
            </PageSectionTitle>
            <PageSectionGrid>
                <List items={pagesPayload} component={PageCard} />
            </PageSectionGrid>
        </PageSectionWrapper>
    );
};

PageSection.propTypes = {
    title: PropTypes.node.isRequired,
    folder: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.number),
    getPageUrl: PropTypes.func.isRequired,
};

PageSection.defaultProps = {
    pages: [],
};

export default PageSection;
