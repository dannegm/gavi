import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useNavigationDate from '@gavi/hooks/useNavigationDate';
import useImportGradeData from '@gavi/hooks/useImportGradeData';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import Jumbotron from '@gavi/components/Jumbotron';
import SubjectBadge from '@gavi/components/SubjectBadge';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

import { NavigationWrapper, SubjectsGrid } from './Subjects.styled';

const ROUTE_TEMPLATE = '/aprende{grade}/materias/{date}';

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

    const [gradeData] = useImportGradeData(grade);

    const handleBack = () => {
        history.push(`/aprende${grade}`);
    };

    const handleBadgeClick = (subjectCode) => {
        history.push(`/aprende${grade}/material/${formatedDate}/${subjectCode}`);
    };

    useEffect(() => {
        const resourcePath = gradeData?.[`${year}/${month}/${day}`];
        if (!resourcePath) {
            setResourceData(null);
        } else {
            setResourceData(Object.keys(resourcePath));
        }
    }, [today]);

    return (
        <Page grade={grade} title={`Materias - ${grade}º GAVI`}>
            <Header title={`${gradeTitles[grade]} grado`} />
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
