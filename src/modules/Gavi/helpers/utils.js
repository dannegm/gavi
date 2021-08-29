import { FORMAT_COMMON, formatDate } from '@helpers/dateHelpers';

export const getGradeString = (grade) => {
    const grades = ['none', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6'];
    return grades[grade];
};

export const renderTemplate = (template, data) => {
    let renderedTemplate = template;

    Object.entries(data).forEach(([key, value]) => {
        const regex = RegExp(`{${key}}`, 'g');
        renderedTemplate = renderedTemplate.replace(regex, value);
    });
    // renderedTemplate = renderedTemplate.replace(/{\w+}/g, '');
    return renderedTemplate;
};

export const buildRoute = ({ routeTemplate, grade, subject = '' }) => {
    return (date) => {
        const routeData = {
            grade,
            subject,
            date: formatDate(date, FORMAT_COMMON),
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        };

        return renderTemplate(routeTemplate, routeData);
    };
};
