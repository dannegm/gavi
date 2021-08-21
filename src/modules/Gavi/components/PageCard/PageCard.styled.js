import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';

export const PageCardImage = styled.img`
    width: 22%;
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
