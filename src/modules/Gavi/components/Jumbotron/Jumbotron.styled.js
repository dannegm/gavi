import styled from 'styled-components';
import colors from '@styles/colors';

export const JumbotronWrapper = styled.div`
    display: block;
    margin: 3rem auto;
    box-sizing: content-box;
    width: 50%;
    padding: 3rem;
    border-radius: 60px;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${colors.white};
`;

export const JumbotronTitle = styled.h1`
    font-family: 'Centrale', sans-serif;
    font-size: 3vw;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

export const JumbotronContent = styled.div`
    font-family: 'Centrale', sans-serif;
    font-size: 1.5vw;
    text-align: justify;
    margin-bottom: 2rem;
`;
