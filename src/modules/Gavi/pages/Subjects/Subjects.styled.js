import styled from 'styled-components';
import { SubjectBadgeWrapper } from '@gavi/components/SubjectBadge/SubjectBadge.styled';

export const NavigationWrapper = styled.div`
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
`;

export const SubjectsGrid = styled.div`
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 4rem;

    & ${SubjectBadgeWrapper} {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`;
