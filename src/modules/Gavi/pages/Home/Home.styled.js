import styled from 'styled-components';

export const HeaderContentWrapper = styled.div`
    text-align: center;
`;

export const Headline = styled.h1`
    font-size: 2.143rem;
    text-align: center;
    font-weight: normal;
    font-family: 'Antipasto', sans-serif;

    & > b {
        color: ${({ theme }) => theme.colors.main};
        font-weight: normal;
    }
`;
