import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';

export const PageSectionWrapper = styled.div`
    display: block;
    margin-top: 2rem;
    margin-bottom: 4rem;
`;

export const PageSectionTitle = styled.h1`
    font-size: 3.2rem;
    font-family: 'Centrale', sans-serif;
    font-weight: bold;
    text-align: center;
    margin-bottom: 4rem;

    & b {
        color: ${({ theme }) => theme.colors.main};
    }

    ${breakpoints.tablet(css`
        font-size: 36px;
    `)}
    ${breakpoints.mobile(css`
        font-size: 30px;
    `)}
`;

export const PageSectionGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
`;
