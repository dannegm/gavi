import styled from 'styled-components';

import { MaterialCardWrapper } from '@gavi/components/MaterialCard/MaterialCard.styled';

export const NavigationWrapper = styled.div`
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
`;

export const MaterialCardGrid = styled.div`
    width: 55%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 4rem;

    & ${MaterialCardWrapper} {
        width: 30%;
    }
`;
