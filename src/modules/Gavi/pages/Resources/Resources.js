import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { buildRoute, renderTemplate } from '@gavi/helpers/utils';
import useNavigationDate from '@gavi/hooks/useNavigationDate';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import MaterialCard from '@gavi/components/MaterialCard';
import PageSection from '@gavi/components/PageSection';
import Jumbotron from '@gavi/components/Jumbotron';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

// Data
import resources from '@assets/data/resources.json';

import { NavigationWrapper, MaterialCardGrid } from './Resources.styled';

const ROUTE_TEMPLATE = '/material/{grade}/{date}/{subject}';
const PAGE_URL_TEMPLATE = process.env.REACT_APP_PAGE_URL_TEMPLATE;

const Resources = () => {
    const history = useHistory();
    const { subject } = useParams();

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
        history.push(`/materias/${grade}/${formatedDate}`);
    };

    const getPageUrl = (book, page) => {
        const getRoute = buildRoute({
            grade,
            subject,
            routeTemplate: PAGE_URL_TEMPLATE,
        });
        return renderTemplate(getRoute(today), { book, page });
    };

    useEffect(() => {
        const resourcePath = resources?.[year]?.[month]?.[day]?.[grade]?.[subject];
        if (!resourcePath) {
            setResourceData(null);
        } else {
            setResourceData(resourcePath);
        }
    }, [grade, subject, today]);

    return (
        <Page grade={grade} title={`Material - ${grade}º GAVI`}>
            <Header title='Primer Grado' subject={subject} />
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
                <>
                    <MaterialCardGrid>
                        {resourceData.books.map((book) => (
                            <MaterialCard
                                key={`book_${book.type}`}
                                type={book.type}
                                pages={book.pages}
                            />
                        ))}
                    </MaterialCardGrid>

                    <Jumbotron title='Aprendizaje esperado' content={resourceData.learn} />

                    {resourceData.books.map((book) => (
                        <PageSection
                            key={`pages_${book.type}`}
                            title={book.name}
                            book={book.type}
                            pages={book.pages}
                            getPageUrl={getPageUrl}
                        />
                    ))}
                </>
            )}

            <Footer />
        </Page>
    );
};

export default Resources;
