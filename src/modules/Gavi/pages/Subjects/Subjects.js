import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
    FORMAT_COMMON,
    isWeekend,
    buildDate,
    getNextWorkingDay,
    formatDate,
} from '@helpers/dateHelpers';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

import { NavigationWrapper } from './Subjects.styled';

const Subjects = () => {
    const history = useHistory();
    const { grade, year, month, day } = useParams();

    const today = buildDate(year, month, day);

    const handleNext = (date) => {
        history.push(`/materias/${grade}/${formatDate(date, FORMAT_COMMON)}`);
    };

    const handlePrev = (date) => {
        history.push(`/materias/${grade}/${formatDate(date, FORMAT_COMMON)}`);
    };

    const handleBack = () => {
        history.push(`/${grade}`);
    };

    useEffect(() => {
        if (isWeekend(today)) {
            const nextWorkingDay = getNextWorkingDay(today);
            handleNext(nextWorkingDay);
        }
    }, [today]);

    return (
        <Page grade={grade} title='Materias'>
            <Header title='Primer Grado' />
            <NavigationWrapper>
                <Button icon='chevron-left' label='Regresar' onClick={handleBack} />
            </NavigationWrapper>
            <DateNavigator date={today} onNext={handleNext} onPrev={handlePrev} />
            <Footer />
        </Page>
    );
};

export default Subjects;
