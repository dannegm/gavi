import React from 'react';
import { useHistory } from 'react-router-dom';

import useNavigationDate from '@gavi/hooks/useNavigationDate';

import { FORMAT_COMMON, formatDate } from '@helpers/dateHelpers';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import SubjectBadge from '@gavi/components/SubjectBadge';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

import { NavigationWrapper, SubjectsGrid } from './Subjects.styled';

const Subjects = () => {
    const history = useHistory();
    const { grade, today, formatedDate } = useNavigationDate();

    const handleNext = (date) => {
        history.push(`/materias/${grade}/${formatDate(date, FORMAT_COMMON)}`);
    };

    const handlePrev = (date) => {
        history.push(`/materias/${grade}/${formatDate(date, FORMAT_COMMON)}`);
    };

    const handleBack = () => {
        history.push(`/${grade}`);
    };

    const handleBadgeClick = (subjectCode) => {
        history.push(`/material/${grade}/${formatedDate}/${subjectCode}`);
    };

    return (
        <Page grade={grade} title={`Materias - ${grade}º GAVI`}>
            <Header title='Primer Grado' />
            <NavigationWrapper>
                <Button icon='chevron-left' label='Regresar' onClick={handleBack} />
            </NavigationWrapper>
            <DateNavigator date={today} onNext={handleNext} onPrev={handlePrev} />

            <SubjectsGrid>
                <SubjectBadge code='esp' onClick={handleBadgeClick} />
                <SubjectBadge code='mat' onClick={handleBadgeClick} />
                <SubjectBadge code='cie' onClick={handleBadgeClick} />
                <SubjectBadge code='geo' onClick={handleBadgeClick} />
                <SubjectBadge code='hist' onClick={handleBadgeClick} />
            </SubjectsGrid>
            <Footer />
        </Page>
    );
};

export default Subjects;
