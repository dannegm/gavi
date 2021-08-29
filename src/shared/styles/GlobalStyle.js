import { createGlobalStyle } from 'styled-components';
import { AntipastoFont, Centrale } from './fonts';
import colors from './colors';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'rsuite/dist/styles/rsuite-default.css';

const GlobalStyle = createGlobalStyle`
    ${AntipastoFont}
    ${Centrale}

    html {
        box-sizing: border-box;
        font-size: 14px;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Helvetica, Arial, sans-serif;
        color: ${colors.gray};
    }

    a {
        cursor: pointer;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default GlobalStyle;
