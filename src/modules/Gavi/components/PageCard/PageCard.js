import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import placeholderPage from '@assets/images/imagen.png';

import {
    PageCardWrapper,
    PageCardOverlay,
    PageCardImage,
    PageCardPreview,
} from './PageCard.styled';

const PageCard = ({ src, alt }) => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <PageCardWrapper>
            {showPreview && (
                <PageCardOverlay onClick={() => setShowPreview(false)}>
                    <PageCardImage src={src} alt={alt} onClick={(ev) => ev.stopPropagation()} />
                </PageCardOverlay>
            )}
            <PageCardPreview src={src} onClick={() => setShowPreview(true)} />
        </PageCardWrapper>
    );
};
PageCard.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
};
PageCard.defaultProps = {
    alt: '',
};

export default PageCard;
