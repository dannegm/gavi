import styled, { css } from 'styled-components';
import colors from '@styles/colors';
import { breakpoints } from '@styles/mediaQueries';

import normalArrowLeft from '@assets/images/arrow_left.png';
import normalArrowRight from '@assets/images/arrow_right.png';

import { LogoElement } from '../Logo/Logo.styled';

export const DateNavigatorWrapper = styled.div`
    width: 50%;
    margin: auto;
    display: block;
`;

export const NavigatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4rem;
`;

export const ArrowButton = styled.button.attrs({
    type: 'button',
})`
    flex: none;
    background-color: transparent;
    border: 0;
    color: ${colors.white};
    width: 128px;
    height: 128px;

    ${breakpoints.tablet(css`
        width: 80px;
        height: 80px;
    `)}
`;

export const ArrowIcon = styled.div`
    display: block;
    width: 128px;
    height: 128px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 0.2s;
    cursor: pointer;

    ${breakpoints.tablet(css`
        width: 80px;
        height: 80px;
    `)}

    ${({ left }) =>
        left &&
        css`
            background-image: url(${normalArrowLeft});
            &:hover {
                background-image: ${({ theme }) => `url(${theme.arrows.left})`};
            }
            &:active {
                transform: translateX(-1rem);
            }
        `}

    ${({ right }) =>
        right &&
        css`
            background-image: url(${normalArrowRight});
            &:hover {
                background-image: ${({ theme }) => `url(${theme.arrows.right})`};
            }
            &:active {
                transform: translateX(1rem);
            }
        `}
`;

export const LogoWrapper = styled.div`
    flex: none;
    & ${LogoElement} {
        width: 200px;
    }
`;

export const DateWrapper = styled.p`
    font-family: 'Centrale', sans-serif;
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;

    & > b {
        color: ${({ theme }) => theme.colors.main};
    }
`;
