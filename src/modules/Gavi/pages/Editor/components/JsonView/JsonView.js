import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import { Panel, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

import { downloadJson } from '@helpers/utils';

import { JsonViewWrapper, HeaderWrapper } from './JsonView.styled';

const Loader = () => {
    return <div>loading...</div>;
};

const JsonTree = Loadable({
    loader: () => import('react-json-tree'),
    loading: Loader,
});

const JsonView = ({ name, expanded, data }) => {
    const handleExport = (ev) => {
        ev.stopPropagation();
        downloadJson(data, name);
    };

    const Header = () => (
        <HeaderWrapper>
            <Whisper placement='top' speaker={<Tooltip>Exportar JSON</Tooltip>}>
                <IconButton size='xs' icon={<Icon icon='save' />} onClick={handleExport} />
            </Whisper>
            <span>{name}</span>
        </HeaderWrapper>
    );
    return (
        <JsonViewWrapper>
            <Panel
                className='json-view'
                header={<Header />}
                defaultExpanded={expanded}
                collapsible
                bordered
            >
                <JsonTree data={data} />
            </Panel>
        </JsonViewWrapper>
    );
};

JsonView.propTypes = {
    name: PropTypes.string,
    expanded: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.any.isRequired,
};

JsonView.defaultProps = {
    name: 'JSON Viewer',
    expanded: false,
};

export default JsonView;
