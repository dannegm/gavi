import React from 'react';
import PropTypes from 'prop-types';

import {} from './PageCard.styled';

const PageCard = ({ ...props }) => {
    return <>{/* TODO: Content */}</>;
};

PageCard.propTypes = {
    pageId: PropTypes.string,
};

PageCard.defaultProps = {
    pageId: undefined,
};

export default PageCard;
