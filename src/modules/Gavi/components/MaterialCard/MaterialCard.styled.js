import styled, { css } from 'styled-components';
import colors from '@styles/colors';
import { breakpoints } from '@styles/mediaQueries';

export const MaterialCardWrapper = styled.div`
    display: flex;
    width: 260px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: content-box;
    border-radius: 2rem;
    box-shadow: 1px 1px 5px 1px rgb(0 0 0 / 40%);
    padding-top: 3rem;
    padding-bottom: 3rem;
    gap: 3rem;

    ${breakpoints.tablet(css`
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `)}
`;

export const MaterialCardLogo = styled.img`
    width: 180px;
    margin: auto;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    display: block;

    ${breakpoints.tablet(css`
        width: 140px;
        padding-left: 3rem;
    `)}
`;

export const MaterialCardPages = styled.p`
    color: ${colors.gray};
    font-size: 2rem;
    font-family: 'Centrale', sans-serif;
    font-weight: bold;
    text-align: center;
    padding: 0 2rem;
    overflow: hidden;

    & b {
        color: ${({ theme }) => theme.colors.main};
    }

    ${breakpoints.tablet(css`
        flex: 1;
        font-size: 1.5rem;
    `)}
`;
