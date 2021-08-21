import React from 'react';
import PropTypes from 'prop-types';

import { JumbotronWrapper, JumbotronTitle, JumbotronContent } from './Jumbotron.styled';

const Jumbotron = ({ title, content }) => {
    return (
        <JumbotronWrapper>
            <JumbotronTitle>{title}</JumbotronTitle>
            <JumbotronContent>{content}</JumbotronContent>
        </JumbotronWrapper>
    );
};

Jumbotron.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
};

export default Jumbotron;
