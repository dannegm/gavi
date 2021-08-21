import { createGlobalStyle } from 'styled-components';
import { AntipastoFont, Centrale } from './fonts';

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
        color: #666666;
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
