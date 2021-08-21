import styled, { css } from 'styled-components';
import colors from '@styles/colors';
import { breakpoints } from '@styles/mediaQueries';

export const MaterialCardWrapper = styled.div`
    display: flex;
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
    `)}
`;

export const MaterialCardLogo = styled.img`
    width: 60%;
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

    & b {
        color: ${({ theme }) => theme.colors.main};
    }

    ${breakpoints.tablet(css`
        flex: 1;
    `)}
`;
