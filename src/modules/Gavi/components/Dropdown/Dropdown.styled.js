import styled from 'styled-components';
import { rgba } from 'polished';
import colors from '@styles/colors';

export const DropdownWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

export const DropdownTrigger = styled.button`
    position: relative;
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    padding-top: 0.6rem;
    font-family: 'Centrale';
    font-size: 1.2rem;
    text-align: left;
    background-color: ${colors.white};
    border: 2px solid ${({ theme }) => theme.colors.main};
    border-radius: 2rem;
    cursor: pointer;

    &:after {
        content: ' ';
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: ${colors.black};
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
`;

export const DropdownList = styled.div`
    display: block;
    width: 100%;
    position: absolute;
    background-color: ${colors.white};
    border: 2px solid ${({ theme }) => theme.colors.main};
    border-radius: 1rem;
    margin-top: 0.25rem;
    overflow: scroll;
    max-height: 190px;
`;

export const DropdownItemWrapper = styled.button`
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-family: 'Centrale';
    font-size: 1.2rem;
    text-align: left;
    background: transparent;
    border: 0;
    cursor: pointer;

    &:hover {
        background-color: ${rgba(colors.black, 0.1)};
    }
`;
