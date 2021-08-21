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
    `)}
`;

export const HeaderContent = styled.div`
    display: flex;
    width: 50%;
    margin: 1rem auto;
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
    `)}
`;

export const HeaderTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
`;

export const Logo = styled.img`
    display: block;
    width: 8vw;
`;

export const Title = styled.h1`
    text-align: center;
    font-family: 'Antipasto', sans-serif;
    font-size: 4vw;
`;

export const Subtitle = styled.h2`
    text-align: center;
    font-family: 'Antipasto', sans-serif;
    font-size: 3vw;
`;

export const SubjectWrapper = styled.div``;

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
`;
