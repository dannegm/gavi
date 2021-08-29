import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import placeholderPage from '@assets/images/imagen.png';

import {
    PageCardWrapper,
    PageCardOverlay,
    PageCardImage,
    PageCardPreview,
} from './PageCard.styled';

const PageCard = ({ src }) => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <PageCardWrapper>
            {showPreview && (
                <PageCardOverlay onClick={() => setShowPreview(false)}>
                    <PageCardImage src={src} onClick={(ev) => ev.stopPropagation()} />
                </PageCardOverlay>
            )}
            <PageCardPreview src={src} onClick={() => setShowPreview(true)} />
        </PageCardWrapper>
    );
};
PageCard.propTypes = {
    src: PropTypes.string.isRequired,
};

export default PageCard;
