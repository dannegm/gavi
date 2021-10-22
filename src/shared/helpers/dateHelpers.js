import moment from 'moment';
import { range } from 'lodash';

export const SUNDAY = 0;
export const SATURDAY = 6;
export const DAYS = range(1, 32);

export const MONTHS =
    'Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre'.split(
        ' '
    );
export const MONTHS_SHORT = 'Ene Feb Mar Abr May Jun Jul Ago Sep Oct Nov Dic'.split(' ');

export const DAY_OF_WEEKS = 'Domingo Lunes Martes Miércoles Jueves Viernes Sábado'.split(' ');
export const DAY_OF_WEEKS_SHORT = 'Dom Lun Mar Mié Jue Vie Sab'.split(' ');

export const YEARS = process.env.REACT_APP_YEAR_LIST.split(',');

export const MONTHS_MODEL = MONTHS.map((m, index) => ({ label: m, value: index + 1 }));

export const FORMAT_COMMON = 'YYYY/MM/DD';
export const FORMAT_HUMAN = "DDDD, MMMM DD, 'YY";

export const MIN_ALLOWED_DATE = new Date(process.env.REACT_APP_MIN_ALLOWED_DATE);
export const MAX_ALLOWED_DATE = new Date(process.env.REACT_APP_MAX_ALLOWED_DATE);

export const isValidDate = (d) => {
    return d instanceof Date && d.toString() !== 'Invalid Date';
};

export const isWeekend = (d) => {
    return [SATURDAY, SUNDAY].includes(d.getDay());
};

export const buildDate = (year, month, day) => {
    if (!year || !month || !day) {
        return null;
    }

    return new Date(`${year}/${month}/${day}`);
};

export const formatDate = (date, format) => {
    const modifiers = {
        MMMM: () => MONTHS[date.getMonth()],
        MMM: () => MONTHS_SHORT[date.getMonth()],
        MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
        M: () => date.getMonth() + 1,
        YYYY: () => date.getFullYear(),
        YY: () => date.getFullYear().toString().substring(2, 4),
        DDDD: () => DAY_OF_WEEKS[date.getDay()],
        DDD: () => DAY_OF_WEEKS_SHORT[date.getDay()],
        DD: () => date.getDate().toString().padStart(2, '0'),
        D: () => date.getDate(),
        HH: () => date.getHours().toString(),
        H: () => date.getHours().padStart(2, '0'),
        hh: () => (date.getHours() % 12).toString().padStart(2, '0'),
        h: () => date.getHours() % 12,
        mm: () => date.getMinutes().toString().padStart(2, '0'),
        m: () => date.getMinutes(),
        ss: () => date.getSeconds().toString().padStart(2, '0'),
        s: () => date.getSeconds(),
    };

    return format.replace(/MMMM|MMM|MM|M|YYYY|YY|DDDD|DDD|DD|D|HH|H|hh|h|mm|m|ss|s/gi, (match) =>
        modifiers[match]()
    );
};

export const getNextWorkingDay = (d) => {
    const date = new Date(d);
    date.setDate(date.getDate() + 1);

    if (date.getDay() === SATURDAY) {
        date.setDate(date.getDate() + 2);
    }

    if (date.getDay() === SUNDAY) {
        date.setDate(date.getDate() + 1);
    }

    return date;
};

export const getPrevWorkingDay = (d) => {
    const date = new Date(d);
    date.setDate(date.getDate() - 1);

    if (date.getDay() === SATURDAY) {
        date.setDate(date.getDate() - 1);
    }

    if (date.getDay() === SUNDAY) {
        date.setDate(date.getDate() - 2);
    }

    return date;
};

export const getWeekDays = (weekNumber) => {
    const $initialDate = moment(MIN_ALLOWED_DATE);
    $initialDate.startOf('week');
    const $selectedWeek = $initialDate.add(weekNumber - 1, 'weeks');

    const weekDays = [1, 2, 3, 4, 5].map((d) => {
        return moment($selectedWeek).add(d, 'days').format('YYYY/MM/DD');
    });
    return weekDays;
};

export const getWeekYear = (weekNumber) => {
    const $initialDate = moment(MIN_ALLOWED_DATE);
    $initialDate.startOf('week');
    const $selectedWeek = $initialDate.add(weekNumber - 1, 'weeks');
    return $selectedWeek.year();
};

export const getRunningWeek = () => {
    const $initialDate = moment(MIN_ALLOWED_DATE);
    $initialDate.startOf('week');

    return moment().week() - $initialDate.week();
};

export const getCurrenFormatedDate = () => {
    const date = new Date();
    return [
        formatDate(date, 'DD'),
        {
            label: formatDate(date, 'MMMM'),
            value: date.getMonth() + 1,
        },
        formatDate(date, 'YYYY'),
    ];
};
