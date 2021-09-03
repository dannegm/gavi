import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { flattenDeep, trim } from 'lodash';

import { buildRoute, renderTemplate } from '@gavi/helpers/utils';
import useNavigationDate from '@gavi/hooks/useNavigationDate';
import useImportGradeData from '@gavi/hooks/useImportGradeData';

import Header from '@gavi/components/Header';
import Button from '@gavi/components/Button';
import DateNavigator from '@gavi/components/DateNavigator';
import MaterialCard from '@gavi/components/MaterialCard';
import PageSection from '@gavi/components/PageSection';
import Jumbotron from '@gavi/components/Jumbotron';
import Footer from '@gavi/components/Footer';
import DangerouslyHtml from '@components/DangerouslyHtml';

import Page from '@gavi/layout/Page';

import { NavigationWrapper, MaterialCardGrid } from './Resources.styled';

const ROUTE_TEMPLATE = '/aprende{grade}/material/{date}/{subject}';
const PAGE_URL_TEMPLATE = process.env.REACT_APP_PAGE_URL_TEMPLATE;

const gradeTitles = ['none', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto', 'Sexto'];

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

    const [gradeData] = useImportGradeData(grade);

    const handleBack = () => {
        history.push(`/aprende${grade}/materias/${formatedDate}`);
    };

    const getPageUrl = (folder, identifier, page) => {
        const getRoute = buildRoute({
            grade,
            subject,
            routeTemplate: PAGE_URL_TEMPLATE,
        });
        return renderTemplate(getRoute(today), { folder, identifier, page });
    };

    useEffect(() => {
        const resourcePath = gradeData?.[`${year}/${month}/${day}`]?.[subject];
        if (!resourcePath) {
            setResourceData(null);
        } else {
            setResourceData({
                ...resourcePath,
                books: resourcePath.books.map((b) => ({
                    ...b,
                    serie: b.serieCode,
                    name: b.serieName,
                })),
            });
        }
    }, [grade, subject, today]);

    return (
        <Page grade={grade} title={`Material - ${grade}º GAVI`}>
            <Header title={`${gradeTitles[grade]} grado`} subject={subject} />
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
                    {Boolean(resourceData?.books) && (
                        <MaterialCardGrid>
                            {resourceData.books.map((book) => (
                                <MaterialCard
                                    key={`book_${book.serie}`}
                                    type={book.serie}
                                    pages={book.pages}
                                />
                            ))}
                        </MaterialCardGrid>
                    )}

                    <Jumbotron
                        title='Aprendizaje esperado'
                        content={
                            <DangerouslyHtml>
                                {`${trim(resourceData.learn.trim(), '.')}.`}
                            </DangerouslyHtml>
                        }
                    />

                    {Boolean(resourceData?.books) &&
                        resourceData.books.map((book) => (
                            <PageSection
                                key={`pages_${book.serie}`}
                                title={book.name}
                                book={book.serie}
                                folder={book.folder}
                                identifier={book.identifier}
                                pages={flattenDeep(book.pages)}
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
