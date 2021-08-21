/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import {} from './Jumbotron.styled';

const Jumbotron = ({ ...props }) => {
    return <>{/* TODO: Content */}</>;
};

Jumbotron.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
};

export default Jumbotron;
