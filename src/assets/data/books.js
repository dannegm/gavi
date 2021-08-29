/* eslint-disable camelcase */
import alas from '../images/logos/alas.jpg';
import sep from '../images/logos/sep.jpg';
import detectives from '../images/logos/detectives.jpg';
import vidasaludable from '../images/logos/vidasaludable.jpg';
import socio from '../images/logos/socio.jpg';

export { default as books } from './books.json';

export const series = {
    santillana: {
        code: 'santillana',
        name: 'La Guía Santillana',
    },
    alas: {
        code: 'alas',
        name: 'Alas de papel',
        logo: alas,
    },
    sep: {
        code: 'sep',
        name: 'Libros de Texto Gratuito',
        logo: sep,
    },
    detectives: {
        code: 'detectives',
        name: 'Detectives matemáticos',
        logo: detectives,
    },
    socio: {
        code: 'socio',
        name: 'Educación Socioemocional',
        logo: socio,
    },
    vidasaludable: {
        code: 'vidasaludable',
        name: 'Vida Saludable',
        logo: vidasaludable,
    },
};

export default {
    alas,
    sep,
    detectives,
    socio,
    vidasaludable,
};
