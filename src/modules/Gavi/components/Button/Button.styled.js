import styled from 'styled-components';
import { darken } from 'polished';
import colors from '@styles/colors';

export const ButtonWrapper = styled.button.attrs({
    type: 'button',
})`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.main};
    border: none;
    border-radius: 2rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(2px);
        background-color: ${({ theme }) => darken(0.02, theme.colors.main)};
    }

    &[disabled] {
        background-color: ${colors.gray};
    }
`;

export const ButtonLabel = styled.div`
    font-family: 'Antipasto', sans-serif;
    font-size: 1.286rem;
    text-align: center;
    color: ${colors.white};
    padding: 0.8rem 2rem;
    padding-top: 1.2rem;
`;

export const ButtonIcon = styled.div`
    display: block;
    width: 38px;
    height: 38px;
    margin: 8px;
    background-color: ${colors.white};
    border-radius: 50%;

    & svg {
        fill: ${({ theme }) => theme.colors.main};
        width: 38px;
        height: 38px;
    }

    & + ${ButtonLabel} {
        padding-left: 1rem;
    }
`;
