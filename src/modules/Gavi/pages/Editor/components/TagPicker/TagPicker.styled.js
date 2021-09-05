import styled, { css } from 'styled-components';

export const TagPickerWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    border: 1px solid #e5e5ea;
    border-radius: 6px;
    transition: border-color ease-in-out 0.3s;
    padding: 4px 8px;

    ${({ focused }) =>
        focused &&
        css`
            border-color: #1675e0;
        `}

    &:hover {
        border-color: #1675e0;
    }

    & .rs-tag + .rs-tag {
        margin: 0;
    }
`;
