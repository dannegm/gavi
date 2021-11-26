import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import { useSettings } from '@services/settings';

import { Wrapper, Overlay, Window, Title, Description, Container } from './UnpaidScreen.styled';

const EDITOR_MODE = `${process.env.REACT_APP_EDITOR_MODE}` === 'true';

const UnpaidScreen = ({ children }) => {
    const { loaded, paid } = useSettings();

    const isLock = loaded && !EDITOR_MODE && !paid;

    return (
        <Wrapper>
            <Container>{children}</Container>
            {isLock && (
                <Overlay>
                    <Window>
                        <Title>Página Suspendida</Title>
                        <Description>
                            Este sitio ha sido suspendido por falta de pago, favor de contactar a
                            los desarrolladores para habilitarlo de nuevo.
                        </Description>
                    </Window>
                </Overlay>
            )}
        </Wrapper>
    );
};

UnpaidScreen.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UnpaidScreen;
