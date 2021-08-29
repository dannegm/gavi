import React, { useEffect, useState } from 'react';
import { Button, Container, Content, Divider, FlexboxGrid, Icon } from 'rsuite';

import JsonView from './components/JsonView';
import ClassForm from './components/ClassForm';

import { PageWrapper, Title, ClassFormWrapper, Spacer } from './Editor.styled';

const mapBooks = ({ serieCode, serieName, folder, identifier, pages }) => {
    return {
        serie: serieCode,
        name: serieName,
        folder,
        identifier,
        pages: pages.map((p) => p.map((pp) => Number(pp))),
    };
};

const mapSubjects = ({ learn, subject, books }) => {
    return {
        learn,
        code: subject.code,
        books: books.map(mapBooks),
    };
};

const mapClass = ({ date, grade, subjects }) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return {
        year,
        month,
        day,
        grade,
        subjects: subjects.map(mapSubjects),
    };
};

const buildResources = (classes) => {
    const data = {};

    classes.map(mapClass).forEach((c) => {
        if (data[c.year] === undefined) {
            data[c.year] = {};
        }
        if (data[c.year][c.month] === undefined) {
            data[c.year][c.month] = {};
        }
        if (data[c.year][c.month][c.day] === undefined) {
            data[c.year][c.month][c.day] = {};
        }
        if (data[c.year][c.month][c.day][c.grade] === undefined) {
            data[c.year][c.month][c.day][c.grade] = {};
        }

        c.subjects.forEach((s) => {
            data[c.year][c.month][c.day][c.grade][s.code] = {
                learn: s.learn,
                books: s.books,
            };
        });
    });

    return data;
};

const Editor = () => {
    const [classes, setClasses] = useState([]);
    const [resourcesData, setResourcesData] = useState(null);

    const [showClassForm, setShowClassForm] = useState(false);

    const handleClassCreate = (newClass) => {
        const copyClasses = [...classes];
        copyClasses.push(newClass);
        setClasses(copyClasses);
        setShowClassForm(false);
    };

    const handleClassCancel = () => {
        setShowClassForm(false);
    };

    useEffect(() => {
        setResourcesData(buildResources(classes));
    }, [classes]);

    return (
        <PageWrapper>
            <Container>
                <Content>
                    <FlexboxGrid>
                        <Title>GAVI Editor</Title>
                        <Spacer />
                        <Button onClick={() => setShowClassForm(true)}>
                            <Icon icon='plus' /> Agregar clase
                        </Button>
                    </FlexboxGrid>

                    <JsonView name='resources.json' data={resourcesData} expanded />

                    {showClassForm && (
                        <ClassFormWrapper>
                            <ClassForm onCancel={handleClassCancel} onCreate={handleClassCreate} />
                        </ClassFormWrapper>
                    )}

                    <Divider />
                </Content>
            </Container>
        </PageWrapper>
    );
};

export default Editor;
