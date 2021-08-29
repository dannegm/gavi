import React, { useEffect, useState } from 'react';
import { Button, Container, Content, Divider, FlexboxGrid, Icon, IconButton } from 'rsuite';

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
                    <FlexboxGrid align='middle'>
                        <FlexboxGrid.Item style={{ marginRight: 5 }}>
                            <IconButton
                                size='sm'
                                icon={<Icon icon='external-link-square' />}
                                href='./'
                                target='_blank'
                            />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Title>GAVI Editor</Title>
                        </FlexboxGrid.Item>
                        <Spacer />
                        <FlexboxGrid.Item>
                            <Button onClick={() => setShowClassForm(true)}>
                                <Icon icon='plus' /> Agregar clase
                            </Button>
                        </FlexboxGrid.Item>
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
