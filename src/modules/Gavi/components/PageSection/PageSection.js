import React from 'react';
import PropTypes from 'prop-types';

import List from '@components/List';

import PageCard from '../PageCard';

import { PageSectionWrapper, PageSectionTitle, PageSectionGrid } from './PageSection.styled';

const PageSection = ({ title, pages }) => {
    return (
        <PageSectionWrapper>
            <PageSectionTitle>{title}</PageSectionTitle>
            <PageSectionGrid>
                <List items={pages} component={PageCard} />
            </PageSectionGrid>
        </PageSectionWrapper>
    );
};

PageSection.propTypes = {
    title: PropTypes.node.isRequired,
    pages: PropTypes.arrayOf([PropTypes.string]),
};

PageSection.defaultProps = {
    pages: [],
};

export default PageSection;
