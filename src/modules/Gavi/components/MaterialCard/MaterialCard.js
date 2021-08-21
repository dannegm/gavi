import React from 'react';
import PropTypes from 'prop-types';

import {} from './MaterialCard.styled';

const MaterialCard = ({ ...props }) => {
    return <>{/* TODO: Content */}</>;
};

MaterialCard.propTypes = {
    image: PropTypes.string.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
};

export default MaterialCard;
