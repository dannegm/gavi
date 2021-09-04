import styled, { css, keyframes } from 'styled-components';
import { rgba, lighten } from 'polished';
import { breakpoints } from '@styles/mediaQueries';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const zoomIn = keyframes`
    from {
        transform: scale(0.5);
    }
    to {
        transform: scale(1);
    }
`;

export const PageCardWrapper = styled.div`
    width: 22%;
    aspect-ratio: 1 / 1.4142;
    display: block;
    margin-bottom: 4rem;

    ${breakpoints.desktop(css`
        width: 20%;
    `)}
    ${breakpoints.tablet(css`
        width: 30%;
    `)}
    ${breakpoints.mobile(css`
        width: 40%;
    `)}
`;

export const PageCardOverlay = styled.div`
    position: fixed;
    inset: 0 0 0 0;
    background-color: ${({ theme }) => rgba(theme.colors.main, 0.75)};
    backdrop-filter: blur(8px);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 0.2s ease-in;
`;

export const PageCardImage = styled.img`
    display: block;
    max-width: 90%;
    max-height: 90%;
    box-shadow: 4px 4px 12px 0px rgba(0 0 0 / 25%);
    animation: ${zoomIn} 0.1s ease-in;
`;

export const PageCardPreview = styled.img`
    object-fit: cover;
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1.4142;
    background-color: ${({ theme }) => lighten(0.5, theme.colors.main)};
    box-shadow: 4px 4px 12px 0px rgba(0 0 0 / 25%);
    cursor: pointer;
`;
