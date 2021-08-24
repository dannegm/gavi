import styled, { css } from 'styled-components';
import { breakpoints } from '@styles/mediaQueries';

import { MaterialCardWrapper } from '@gavi/components/MaterialCard/MaterialCard.styled';

export const NavigationWrapper = styled.div`
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    ${breakpoints.tablet(css`
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    `)}
`;

export const MaterialCardGrid = styled.div`
    width: 55%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: nowrap;
    margin-top: 4rem;
    gap: 2rem;

    & ${MaterialCardWrapper} {
        width: 30%;
    }

    ${breakpoints.tablet(css`
        width: 90%;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & ${MaterialCardWrapper} {
            width: 100%;
            margin-bottom: 2rem;
        }
    `)}
`;
