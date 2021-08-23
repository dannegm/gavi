import React from 'react';
import PropTypes from 'prop-types';

import List from '@components/List';

import PageCard from '../PageCard';

import { PageSectionWrapper, PageSectionTitle, PageSectionGrid } from './PageSection.styled';

const PageSection = ({ title, book, pages, getPageUrl }) => {
    const pagesPayload = pages.map((page) => ({
        src: getPageUrl({ book, page }),
    }));

    return (
        <PageSectionWrapper>
            <PageSectionTitle>{title}</PageSectionTitle>
            <PageSectionGrid>
                <List items={pagesPayload} component={PageCard} />
            </PageSectionGrid>
        </PageSectionWrapper>
    );
};

PageSection.propTypes = {
    title: PropTypes.node.isRequired,
    book: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.number),
    getPageUrl: PropTypes.func.isRequired,
};

PageSection.defaultProps = {
    pages: [],
};

export default PageSection;
