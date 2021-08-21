import React from 'react';
import PropTypes from 'prop-types';

import RouteHandler from './state/route/RouteHandler';
import GlobalStyle from './shared/styles/GlobalStyle';

const Providers = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            {children}
        </>
    );
};
Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

const App = () => {
    return (
        <Providers>
            <RouteHandler />
        </Providers>
    );
};
export default App;
