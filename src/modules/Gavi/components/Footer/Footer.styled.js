import styled from 'styled-components';
import colors from '@styles/colors';

export const FooterWrapper = styled.footer`
    display: block;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.main};
    color: ${colors.white};
    margin-top: 4rem;
`;

export const FooterCopy = styled.p`
    padding: 1rem;
    text-align: center;
    font-family: 'Centrale', sans-serif;
`;

export const FooterDecorator = styled.div`
    width: 100%;
    height: 80px;
    background-position: center;
    background-size: cover;
    background-image: ${({ theme }) => `url(${theme.footer})`};
`;
