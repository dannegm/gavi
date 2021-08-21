import { css } from 'styled-components';

import AntipastoProExtraBold from '@assets/fonts/Antipasto-Pro-ExtraBold-trial.ttf';
import CentraleSansBook from '@assets/fonts/CentraleSansBook.otf';
import CentraleSansBold from '@assets/fonts/CentraleSansXBold.otf';

export const AntipastoFont = css`
    @font-face {
        font-family: 'Antipasto';
        src: url(${AntipastoProExtraBold}) format('opentype');
    }
`;

export const Centrale = css`
    @font-face {
        font-family: 'Centrale';
        font-weight: normal;
        src: url(${CentraleSansBook}) format('opentype');
    }

    @font-face {
        font-family: 'Centrale';
        font-weight: bold;
        src: url(${CentraleSansBold}) format('opentype');
    }
`;
