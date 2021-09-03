import { nanoid } from 'nanoid';
import { FORMAT_COMMON, formatDate } from '@helpers/dateHelpers';

import { books as booksDB } from '@assets/data/books';

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

export const GAVI_CLASSES_LS_KEY = 'GAVI_CLASSES_LS_KEY';

export const mapBooks = ({ serieCode, serieName, folder, identifier, pages }) => {
    return {
        serie: serieCode,
        name: serieName,
        folder,
        identifier,
        pages: pages.map((p) => p.map((pp) => Number(pp))),
    };
};

export const mapSubjects = ({ learn, subject, books }) => {
    return {
        learn,
        code: subject.code,
        books: books.map(mapBooks),
    };
};

export const mapClass = ({ date, grade, subjects }) => {
    const [year, month, day] = formatDate(new Date(date), FORMAT_COMMON).split('/');

    return {
        year,
        month,
        day,
        grade,
        subjects: subjects.map(mapSubjects),
    };
};

export const buildResources = (classes) => {
    const data = {};

    classes.map(mapClass).forEach((c) => {
        if (data[c.year] === undefined) {
            data[c.year] = {};
        }
        if (data[c.year][c.month] === undefined) {
            data[c.year][c.month] = {};
        }
        if (data[c.year][c.month][c.day] === undefined) {
            data[c.year][c.month][c.day] = {};
        }
        if (data[c.year][c.month][c.day][c.grade] === undefined) {
            data[c.year][c.month][c.day][c.grade] = {};
        }

        c.subjects.forEach((s) => {
            data[c.year][c.month][c.day][c.grade][s.code] = {
                learn: s.learn,
                books: s.books,
            };
        });
    });

    return data;
};

export const getStoredData = (initialData = []) => {
    return JSON.parse(
        localStorage.getItem(GAVI_CLASSES_LS_KEY) || `${JSON.stringify(initialData)}`
    );
};

export const mapStoreToState = (stored) => {
    const rows = [];

    Object.entries(stored).forEach(([year, months]) => {
        Object.entries(months).forEach(([month, days]) => {
            Object.entries(days).forEach(([day, grades]) => {
                Object.entries(grades).forEach(([grade, subjectsItems]) => {
                    const subjects = [];

                    Object.entries(subjectsItems).forEach(([subjectCode, subject]) => {
                        subjects.push({
                            id: nanoid(),
                            learn: subject.learn,
                            books: subject.books.map(
                                ({ serie, name, folder, identifier, pages }) => ({
                                    id: nanoid(),
                                    serieCode: serie,
                                    serieName: name,
                                    folder,
                                    identifier,
                                    pages,
                                })
                            ),
                            subject: {
                                code: subjectCode,
                            },
                        });
                    });

                    rows.push({
                        grade,
                        subjects,
                        date: `${year}/${month}/${day}`,
                    });
                });
            });
        });
    });

    return rows;
};

export const mapSubjectToSimple = (originalSubjects) => {
    const subjects = {};
    originalSubjects.forEach((sub) => {
        subjects[sub.subject.code] = {
            learn: sub.learn,
            books: sub.books,
        };
    });
    return subjects;
};

export const mapClassToGrade = (classes, grade = 1) => {
    const data = {};
    classes
        .filter((item) => item.grade === `${grade}`)
        .forEach((item) => {
            data[item.date] = mapSubjectToSimple(item.subjects);
        });

    return data;
};

export const mapImportedData = (rawData, grade = '1') => {
    const items = {};

    Object.entries(rawData).forEach(([year, months]) => {
        Object.entries(months).forEach(([month, days]) => {
            Object.entries(days).forEach(([day, grades]) => {
                const subjectsItems = grades[grade];
                items[`${year}/${month}/${day}`] = {};

                Object.entries(subjectsItems).forEach(([subjectCode, subject]) => {
                    items[`${year}/${month}/${day}`][subjectCode] = {
                        learn: subject.learn,
                        books: subject.books.map(({ serie, name, folder, identifier, pages }) => {
                            const [bookGrade] = identifier.match(/[0-9]/g);
                            const bookData = booksDB[bookGrade].find(
                                (b) => b.folder === folder && b.identifier === identifier
                            );
                            const { subjectName } = bookData;

                            return {
                                id: nanoid(),
                                subjectCode,
                                subjectName,
                                serieCode: serie,
                                serieName: name,
                                folder,
                                identifier,
                                label: `${serie} - ${subjectName} ${bookGrade}`,
                                pages,
                                type: 'book',
                            };
                        }),
                    };
                });
            });
        });
    });

    return items;
};
