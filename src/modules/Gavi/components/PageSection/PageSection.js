import React from 'react';
import PropTypes from 'prop-types';

import {} from './PageSection.styled';

const PageSection = ({ ...props }) => {
    return <>{/* TODO: Content */}</>;
};

PageSection.propTypes = {
    title: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf([PropTypes.string]),
};

PageSection.defaultProps = {
    pages: [],
};

export default PageSection;
