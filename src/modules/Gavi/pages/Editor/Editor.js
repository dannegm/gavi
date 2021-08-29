import React, { useEffect, useState } from 'react';
import { Button, Container, Content, Divider, FlexboxGrid, Icon } from 'rsuite';

import { getStoredData, buildResources, GAVI_CLASSES_LS_KEY } from '@gavi/helpers/utils';

import JsonView from './components/JsonView';
import ClassForm from './components/ClassForm';

import { PageWrapper, Title, ClassFormWrapper, Spacer } from './Editor.styled';

const useClassesData = (initialData = []) => {
    const [classes, setClasses] = useState(getStoredData(initialData));
    const [resourcesData, setResourcesData] = useState(null);

    useEffect(() => {
        localStorage.setItem(GAVI_CLASSES_LS_KEY, JSON.stringify(classes));
        setResourcesData(buildResources(classes));
    }, [classes]);

    return {
        classes,
        setClasses,
        resourcesData,
    };
};

const Editor = () => {
    const { resourcesData, classes, setClasses } = useClassesData([]);
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
                    <JsonView name='classes.json' data={classes} />

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
