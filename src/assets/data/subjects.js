import art from '../images/subjects/art.png';
import cie from '../images/subjects/cie.png';
import edu from '../images/subjects/edu.png';
import esp from '../images/subjects/esp.png';
import fce from '../images/subjects/fce.png';
import geo from '../images/subjects/geo.png';
import hist from '../images/subjects/hist.png';
import lec from '../images/subjects/lec.png';
import mat from '../images/subjects/mat.png';
import socio from '../images/subjects/socio.png';
import vid from '../images/subjects/vid.png';

const colors = {
    blue: '#009acc',
    yellow: '#f9c623',
    green: '#84bf40',
    aqua: '#36b5af',
    orange: '#eb8b2c',
    darkPink: '#cd2151',
    pink: '#e5769d',
    darkOrange: '#e5702b',
    cyan: '#74cae7',
    purple: '#a2257c',
    darkBlue: '#0067a5',
};

export default {
    art: {
        code: 'art',
        name: 'Artes',
        color: colors.purple,
        icon: art,
    },
    artm: {
        code: 'artm',
        name: 'Artes. Música',
        color: colors.purple,
        icon: art,
    },
    cm: {
        code: 'cm',
        name: 'Conocimiento del Medio',
        color: colors.green,
        icon: cie,
    },
    ef: {
        code: 'ef',
        name: 'Educación Física',
        color: colors.cyan,
        icon: edu,
    },
    lm: {
        code: 'lm',
        name: 'Lengua Materna. Español',
        color: colors.blue,
        icon: esp,
    },
    lmb: {
        code: 'lmb',
        name: 'Lengua Materna (clase bilingüe)', // Lengua Materna. Español (clase bilingüe)
        color: colors.blue,
        icon: lec,
    },
    fcye: {
        code: 'fcye',
        name: 'Formación Cívica y Ética',
        color: colors.darkPink,
        icon: fce,
    },
    ced: {
        code: 'ced',
        name: 'Cívica y Ética en diálogo',
        color: colors.darkPink,
        icon: fce,
    },
    es: {
        code: 'es',
        name: 'Educación Socioemocional',
        color: colors.darkOrange,
        icon: socio,
    },
    vs: {
        code: 'vs',
        name: 'Vida Saludable', // Vida Saludable (de Educación Socioemocional)
        color: colors.pink,
        icon: vid,
    },
    mat: {
        code: 'mat',
        name: 'Matemáticas',
        color: colors.yellow,
        icon: mat,
    },
    cn: {
        code: 'cn',
        name: 'Ciencias Naturales',
        color: colors.green,
        icon: cie,
    },
    edv: {
        code: 'edv',
        name: 'La entidad en donde vivo',
        color: colors.aqua,
        icon: geo,
    },
    esp: {
        code: 'esp',
        name: 'Español',
        color: colors.blue,
        icon: esp,
    },
    espb: {
        code: 'espb',
        name: 'Español (clase bilingüe)',
        color: colors.blue,
        icon: esp,
    },
    geo: {
        code: 'geo',
        name: 'Geografía',
        color: colors.aqua,
        icon: geo,
    },
    hist: {
        code: 'hist',
        name: 'Historia',
        color: colors.orange,
        icon: hist,
    },
    ing: {
        code: 'ing',
        name: 'Inglés',
        color: colors.blue,
        icon: esp,
    },
};
