import styled, { css } from 'styled-components';
import colors from '@styles/colors';
import { breakpoints } from '@styles/mediaQueries';

export const HeaderWrapper = styled.div`
    display: block;
`;

export const HeaderBackground = styled.div`
    display: block;
    padding-bottom: 22vw;
    overflow: hidden;
    background-position: center 100%;
    background-size: cover;
    background-image: ${({ theme }) => `url(${theme.header.home})`};

    ${breakpoints.desktop(css`
        background-image: ${({ theme }) => `url(${theme.header.alta})`};
        padding-bottom: 28vw;
    `)}
`;

export const HeaderContent = styled.div`
    display: flex;
    margin: 1rem 80px;
    flex-direction: column;
    gap: 1rem;
    color: ${colors.white};
`;

export const HeaderTitleRow = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    ${breakpoints.desktop(css`
        flex-direction: row;
        height: 120px;
    `)}
    ${breakpoints.tablet(css`
        flex-direction: column;
        height: initial;
    `)}
`;

export const HeaderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;

    ${breakpoints.desktop(css`
        flex: 1;
    `)}
    ${breakpoints.tablet(css`
        flex: none;
    `)}
`;

export const Logo = styled.img`
    display: block;
    width: 8vw;

    ${breakpoints.desktop(css`
        width: 6vw;
    `)}
    ${breakpoints.tablet(css`
        width: 80px;
        margin: auto;
    `)}
`;

export const Title = styled.h1`
    text-align: center;
    font-family: 'Antipasto', sans-serif;
    font-size: 4vw;

    ${breakpoints.desktop(css`
        margin-top: 220px;
        margin-left: -7vw;
        font-size: 40px;
    `)}

    ${breakpoints.tablet(css`
        margin-top: 2rem;
        margin-left: 0;
        font-size: 40px;
    `)}
`;

export const Subtitle = styled.h2`
    text-align: center;
    font-family: 'Antipasto', sans-serif;
    font-size: 3vw;

    ${breakpoints.desktop(css`
        font-size: 40px;
    `)}
`;

export const SubjectWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${breakpoints.desktop(css`
        margin-top: 110px;
        margin-bottom: -50px;
    `)}

    ${breakpoints.tablet(css`
        margin-top: 2rem;
        margin-bottom: -50px;
        transform: scale(0.7);
    `)}
`;

export const ContentWrapper = styled.div`
    display: block;
    flex: 1;
    font-size: 1.32vw;
    font-family: 'Centrale', sans-serif;

    & p {
        display: block;
        margin-bottom: 1em;
        & b {
            font-weight: bold;
        }
    }

    ${breakpoints.desktop(css`
        font-size: 3vw;
    `)}
`;
