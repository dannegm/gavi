import styled from 'styled-components';
import { darken } from 'polished';
import colors from '@styles/colors';

export const SubjectBadgeWrapper = styled.button.attrs({
    type: 'button',
})`
    position: relative;
    display: flex;
    width: 240px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({ color }) => color};
    border: none;
    border-radius: 4rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(2px);
        background-color: ${({ color }) => darken(0.02, color)};
    }
`;

export const SubjectBadgeIcon = styled.img`
    position: absolute;
    left: -28px;
    width: 80px;
`;

export const SubjectBadgeLabel = styled.div`
    font-family: 'Antipasto', sans-serif;
    font-size: 1.4rem;
    text-align: center;
    color: ${colors.white};
    padding: 1.5rem 1rem;
    padding-left: 3rem;
    padding-top: 1.7rem;
`;
