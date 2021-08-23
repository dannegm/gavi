import React from 'react';
import PropTypes from 'prop-types';

// import placeholderPage from '@assets/images/imagen.png';

import { PageCardImage } from './PageCard.styled';

const PageCard = ({ src }) => {
    return <PageCardImage src={src} />;
};
PageCard.propTypes = {
    src: PropTypes.string.isRequired,
};

export default PageCard;
