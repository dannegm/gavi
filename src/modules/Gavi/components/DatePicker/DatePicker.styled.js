import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';

export const DatePickerWrapper = styled.div`
    width: 780px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ${breakpoints.desktop(css`
        width: 100%;
        flex: none;
    `)}
`;

export const Description = styled.div`
    flex: 1;
    font-family: 'Centrale', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 3rem;

    ${breakpoints.desktop(css`
        width: 60%;
        flex: none;
    `)}
`;

export const Row = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const Col = styled.div`
    flex: 1;
    ${breakpoints.desktop(css`
        flex: none;
        width: 20%;
    `)}
    ${breakpoints.tablet(css`
        flex: none;
        width: 35%;
    `)}
    ${breakpoints.mobile(css`
        flex: none;
        width: 60%;
    `)}
`;
