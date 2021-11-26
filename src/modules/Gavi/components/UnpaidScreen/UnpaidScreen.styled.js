import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { breakpoints } from '@styles/mediaQueries';

export const Wrapper = styled.div`
    display: block;
`;

export const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => rgba(theme.colors.main, 0.5)};
    backdrop-filter: blur(1rem);
`;

export const Window = styled.div`
    display: block;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    color: white;
    width: 35%;

    ${breakpoints.desktop(css`
        width: 50%;
    `)}

    ${breakpoints.tablet(css`
        width: 75%;
    `)}

    ${breakpoints.mobile(css`
        width: 90%;
    `)}
`;

export const Title = styled.div`
    display: block;
    text-align: center;
    font-size: 2rem;
`;

export const Description = styled.div`
    display: block;
    text-align: center;
    font-size: 1.5rem;
`;

export const Container = styled.div`
    display: block;
`;
