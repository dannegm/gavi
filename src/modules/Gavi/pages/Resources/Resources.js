import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import themes from '@styles/themes';

import { FORMAT_COMMON, formatDate } from '@helpers/dateHelpers';

import { getGradeString } from '@gavi/helpers/utils';
import useNavigationDate from '@gavi/hooks/useNavigationDate';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import MaterialCard from '@gavi/components/MaterialCard';
import PageSection from '@gavi/components/PageSection';
import Jumbotron from '@gavi/components/Jumbotron';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

import subjects from '@assets/data/subjects';
import logoGratuitos from '@assets/images/gratuitos.png';
import logoDetectives from '@assets/images/detectives.png';

import { NavigationWrapper, MaterialCardGrid } from './Resources.styled';

const material = {
    santillana: {
        from: 10,
        to: 13,
    },
    gratuitos: {
        from: 101,
        to: 103,
    },
    detectives: {
        from: 23,
        to: 24,
    },
};

const Resources = () => {
    const history = useHistory();
    const { subject } = useParams();
    const { grade, today, formatedDate } = useNavigationDate();

    const handleNext = (date) => {
        history.push(`/material/${grade}/${formatDate(date, FORMAT_COMMON)}/${subject}`);
    };

    const handlePrev = (date) => {
        history.push(`/material/${grade}/${formatDate(date, FORMAT_COMMON)}/${subject}`);
    };

    const handleBack = () => {
        history.push(`/materias/${grade}/${formatedDate}`);
    };

    return (
        <Page grade={grade} title={`Material - ${grade}º GAVI`}>
            <Header title='Primer Grado' subject={subject} />
            <NavigationWrapper>
                <Button icon='chevron-left' label='Regresar' onClick={handleBack} />
            </NavigationWrapper>
            <DateNavigator date={today} onNext={handleNext} onPrev={handlePrev} />

            <MaterialCardGrid>
                <MaterialCard
                    image={themes[getGradeString(grade)].logo}
                    from={material.santillana.from}
                    to={material.santillana.to}
                />
                <MaterialCard
                    image={logoGratuitos}
                    from={material.gratuitos.from}
                    to={material.gratuitos.to}
                />
                <MaterialCard
                    image={logoDetectives}
                    from={material.detectives.from}
                    to={material.detectives.to}
                />
            </MaterialCardGrid>

            <Jumbotron
                title='Aprendizaje esperado'
                content={
                    <>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi, in at
                        ullam id quam omnis facere totam repellat dolore et voluptate nemo minus,
                        autem distinctio debitis.
                    </>
                }
            />

            <PageSection
                title={
                    <>
                        La <b>Guía</b> Santillana <b>{grade}</b>:
                    </>
                }
                pages={[1, 2, 3, 4]}
            />

            <PageSection
                title={
                    <>
                        Libro <b>de</b> Texto <b>Gratuito</b>:
                    </>
                }
                pages={[1, 2, 3]}
            />

            <PageSection
                title={
                    <>
                        Detectives <b>{subjects[subject].name}</b>:
                    </>
                }
                pages={[1, 2, 3]}
            />

            <Footer />
        </Page>
    );
};

export default Resources;
