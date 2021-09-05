import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';
import { ButtonWrapper } from '@gavi/components/Button/Button.styled';

export const PageWrapper = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;

    ${breakpoints.desktop(css`
        grid-template-columns: repeat(2, 1fr);
    `)}
    ${breakpoints.mobile(css`
        grid-template-columns: repeat(1, 1fr);
    `)}
`;

export const GradeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & ${ButtonWrapper} {
        width: 240px;
        margin: auto;
    }
`;

export const EditorButtonWrapper = styled.div`
    display: block;
    margin-top: 20px;
    text-align: center;
`;
