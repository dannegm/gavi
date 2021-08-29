import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useNavigationDate from '@gavi/hooks/useNavigationDate';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import Jumbotron from '@gavi/components/Jumbotron';
import SubjectBadge from '@gavi/components/SubjectBadge';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

// Data
import resources from '@assets/data/resources.json';

import { NavigationWrapper, SubjectsGrid } from './Subjects.styled';

const ROUTE_TEMPLATE = '/materias/{grade}/{date}';

const gradeTitles = ['none', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto', 'Sexto'];

const Subjects = () => {
    const history = useHistory();
    const {
        // breakline
        grade,
        today,
        formatedDate,
        year,
        month,
        day,
        handleNext,
        handlePrev,
    } = useNavigationDate(ROUTE_TEMPLATE);

    const [resourceData, setResourceData] = useState(null);

    const handleBack = () => {
        history.push(`/${grade}`);
    };

    const handleBadgeClick = (subjectCode) => {
        history.push(`/material/${grade}/${formatedDate}/${subjectCode}`);
    };

    useEffect(() => {
        const resourcePath = resources?.[year]?.[month]?.[day]?.[grade];
        if (!resourcePath) {
            setResourceData(null);
        } else {
            setResourceData(Object.keys(resourcePath));
        }
    }, [grade, today]);

    return (
        <Page grade={grade} title={`Materias - ${grade}º GAVI`}>
            <Header title={`${gradeTitles[grade]} Grado`} />
            <NavigationWrapper>
                <Button icon='chevron-left' label='Regresar' onClick={handleBack} />
            </NavigationWrapper>
            <DateNavigator date={today} onNext={handleNext} onPrev={handlePrev} />

            {!resourceData ? (
                <Jumbotron
                    title='Sin material disponible'
                    content='No se ha encontrado material disponible para el día de hoy'
                />
            ) : (
                <SubjectsGrid>
                    {resourceData.map((subjectCode) => (
                        <SubjectBadge
                            key={`subject_${subjectCode}`}
                            code={subjectCode}
                            onClick={handleBadgeClick}
                        />
                    ))}
                </SubjectsGrid>
            )}

            <Footer />
        </Page>
    );
};

export default Subjects;
