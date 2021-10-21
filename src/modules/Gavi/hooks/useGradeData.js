import { Alert } from 'rsuite';

/* eslint-disable no-alert */
import useLocalStorage from '@hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { HmacSHA1 } from 'crypto-js';
import { isEmpty } from 'lodash';
import { parse as parseCsvContent } from 'papaparse';

import { getWeekYear } from '@helpers/dateHelpers';
import { csvHeaders, pagesHumanToArray } from '@helpers/utils';

import { books } from '@assets/data/books';

const PACKAGE_VERSION = process.env.REACT_APP_PACKAGE_VERSION;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const GAVI_LS_KEY_GRADE = 'GAVI_LS_KEY_GRADE';

const mapRowToBook = (row, cursor) => {
    const copyRow = [...row];
    const [grade, subjectCode, serieCode, interactiveLink, pages] = copyRow.splice(cursor);
    const bookData = books[grade]?.find(
        (book) => book.subjectCode === subjectCode && book.serieCode === serieCode
    );

    if (!bookData) {
        return null;
    }

    return {
        id: nanoid(),
        subjectCode,
        serieCode,
        interactiveLink,
        pages: pagesHumanToArray(pages),
        subjectName: bookData.subjectName,
        serieName: bookData.serieName,
        folder: bookData.folder,
        identifier: bookData.identifier,
        label: `${serieCode} - ${bookData.subjectName} ${grade}`,
        type: 'book',
    };
};

const mapRowToSubject = (row) => {
    const bookCursor = 4;
    const mappedBooks = [
        mapRowToBook(row, bookCursor),
        mapRowToBook(row, bookCursor + 5),
        mapRowToBook(row, bookCursor + 10),
    ].filter((b) => b !== null);

    return {
        week: row[0],
        date: row[1],
        subjectCode: row[2],
        learn: row[3],
        books: mappedBooks,
    };
};

const mapCsvData = (rows) => {
    const data = {};
    rows.forEach((row) => {
        const $row = mapRowToSubject(row);
        const $date = `${getWeekYear($row.week)}/${$row.date}`;

        if (data[$date] === undefined) {
            data[$date] = {};
        }

        data[$date][$row.subjectCode] = {
            learn: $row.learn,
            books: $row.books,
        };
    });
    return data;
};

const indexGenerator = () => {
    const subjects = {};
    return (subjectCode) => {
        if (subjects[subjectCode] === undefined) {
            subjects[subjectCode] = 0;
        }

        subjects[subjectCode] += 1;
        return subjects[subjectCode];
    };
};

const mapSubjects = (originalSubjects) => {
    const getIndex = indexGenerator();
    return originalSubjects.map((sub) => ({
        subjectIndex: getIndex(sub.subject.code),
        subjectCode: sub.subject.code,
        learn: sub.learn,
        books: sub.books,
    }));
};

const getSignature = (data) => {
    return HmacSHA1(JSON.stringify(data), SECRET_KEY).toString();
};

const getDocContent = (grade, defaultContent = {}) => {
    return {
        scheme_version: PACKAGE_VERSION,
        grade,
        updated_at: new Date(),
        signature: getSignature(defaultContent),
        data: defaultContent,
    };
};

const handleLoadCsvData = ({
    grade,
    clearGradeData,
    setGradeData,
    handleUpdateGradeData,
    rawData,
}) => {
    const { data: resultData } = parseCsvContent(rawData, { skipEmptyLines: true });
    const headers = resultData[0];
    const body = [...resultData].splice(1).filter(([rowGrade]) => `${rowGrade}` === `${grade}`);

    if (headers.join(',') !== csvHeaders) {
        alert('El archivo CSV importado tiene una estructura inválida');
    } else if (body.length === 0) {
        alert('No hay datos que cargar');
    } else {
        clearGradeData();
        setGradeData(handleUpdateGradeData(mapCsvData(body), false));
        Alert.success(`Se importaron ${body.length} registros exitosamente`);
    }
};

const handleLoadJsonData = ({
    grade,
    clearGradeData,
    setGradeData,
    handleUpdateGradeData,
    rawData,
}) => {
    const jsonData = JSON.parse(rawData);

    if (jsonData.signature === undefined) {
        alert('Archivo de datos inválido');
        return;
    }

    if (jsonData.signature !== getSignature(jsonData.data)) {
        alert('El archivo fue modificado externamente');
        return;
    }

    if (jsonData.scheme_version !== PACKAGE_VERSION) {
        alert('La estrutura del archivo no es compatible con la versión actual de la plataforma');
        return;
    }

    if (`${jsonData.grade}` !== `${grade}`) {
        alert(
            `Estás cargando un archivo para grado "${jsonData.grade}" en un espacio de trabajo de grado "${grade}".`
        );
        return;
    }

    clearGradeData();
    setGradeData(handleUpdateGradeData(jsonData.data, true));
};

const useGradeData = (defaultGrade = 1, defaultContent = {}) => {
    const [grade, setGrade] = useState(defaultGrade);

    const [gradeData, setGradeData, clearGradeData, setKey] = useLocalStorage(
        `${GAVI_LS_KEY_GRADE}_${defaultGrade}`,
        getDocContent(grade, defaultContent)
    );

    const handleUpdateGradeData =
        (newData, replace = false) =>
        (currentData) => {
            const modifiedData = {
                ...currentData.data,
                ...newData,
            };

            const generatedData = replace ? newData : modifiedData;

            return getDocContent(grade, generatedData);
        };

    const upsertSchedule = (schedule) => {
        if (isEmpty(schedule.subjects)) {
            const copyGradeData = { ...gradeData.data };
            delete copyGradeData[schedule.date];
            setGradeData(handleUpdateGradeData(copyGradeData, true));
        } else {
            setGradeData(
                handleUpdateGradeData({
                    [schedule.date]: mapSubjects(schedule.subjects),
                })
            );
        }
    };

    const getScheduleData = (date) => {
        return gradeData.data[date];
    };

    const $clearGradeData = () => {
        clearGradeData();
        setGradeData({ data: {} });
    };

    const loadScheduleData = (rawData, type) => {
        switch (type) {
            case 'text/csv':
                handleLoadCsvData({
                    grade,
                    rawData,
                    setGradeData,
                    handleUpdateGradeData,
                    clearGradeData: $clearGradeData,
                });
                break;
            case 'application/json':
                handleLoadJsonData({
                    grade,
                    rawData,
                    setGradeData,
                    handleUpdateGradeData,
                    clearGradeData: $clearGradeData,
                });
                break;
            default:
                alert('Formato no soportado');
                break;
        }
    };

    useEffect(() => {
        setKey(`${GAVI_LS_KEY_GRADE}_${grade}`);
    }, [grade]);

    return {
        gradeData,
        setGrade,
        getScheduleData,
        upsertSchedule,
        loadScheduleData,
        clearGradeData: $clearGradeData,
    };
};

export default useGradeData;
