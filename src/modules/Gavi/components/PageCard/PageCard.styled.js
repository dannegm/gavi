import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { breakpoints } from '@styles/mediaQueries';

export const PageCardImage = styled.img`
    width: 22%;
    aspect-ratio: 1 / 1.4142;
    display: block;
    margin-bottom: 4rem;
    background-color: ${({ theme }) => lighten(0.5, theme.colors.main)};

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
