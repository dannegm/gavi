import styled from 'styled-components';

export const TagPickerWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    & .rs-tag + .rs-tag {
        margin: 0;
    }
`;
