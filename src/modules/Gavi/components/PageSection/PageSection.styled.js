import styled from 'styled-components';

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
`;

export const PageSectionGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
`;
