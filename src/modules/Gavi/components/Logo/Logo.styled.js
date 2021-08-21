import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';

export const LogoWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 2rem auto;
    justify-content: center;
`;

export const LogoElement = styled.img`
    width: 250px;

    ${breakpoints.desktop(css`
        width: 150px;
    `)}
    ${breakpoints.tablet(css`
        width: 150px;
    `)}
    ${breakpoints.mobile(css`
        width: 150px;
    `)}
`;
