import styled, { css } from 'styled-components';
import colors from '@styles/colors';
import { breakpoints } from '@styles/mediaQueries';

export const JumbotronWrapper = styled.div`
    display: block;
    margin: 3rem auto;
    box-sizing: content-box;
    width: 50%;
    padding: 3rem;
    border-radius: 60px;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${colors.white};

    ${breakpoints.desktop(css`
        width: 65%;
    `)}
    ${breakpoints.tablet(css`
        width: 80%;
    `)}
`;

export const JumbotronTitle = styled.h1`
    font-family: 'Centrale', sans-serif;
    font-size: 3vw;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;

    ${breakpoints.tablet(css`
        font-size: 36px;
    `)}

    ${breakpoints.mobile(css`
        font-size: 30px;
    `)}
`;

export const JumbotronContent = styled.div`
    font-family: 'Centrale', sans-serif;
    font-size: 1.5vw;
    text-align: justify;
    margin-bottom: 2rem;

    ${breakpoints.tablet(css`
        font-size: 26px;
    `)}

    ${breakpoints.mobile(css`
        font-size: 20px;
    `)}
`;
