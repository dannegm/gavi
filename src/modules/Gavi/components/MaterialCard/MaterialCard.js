import React from 'react';
import PropTypes from 'prop-types';

import { MaterialCardWrapper, MaterialCardLogo, MaterialCardPages } from './MaterialCard.styled';

const MaterialCard = ({ image, from, to }) => {
    return (
        <MaterialCardWrapper>
            <MaterialCardLogo src={image} />
            <MaterialCardPages>
                Páginas <br />
                <b>{from}</b> a <b>{to}</b>
            </MaterialCardPages>
        </MaterialCardWrapper>
    );
};

MaterialCard.propTypes = {
    image: PropTypes.string.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
};

export default MaterialCard;
