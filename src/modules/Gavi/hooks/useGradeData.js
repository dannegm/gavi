import useLocalStorage from '@hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

// import { mapImportedData } from '@gavi/helpers/utils';

const GAVI_LS_KEY_GRADE = 'GAVI_LS_KEY_GRADE';

const mapSubjects = (originalSubjects) => {
    const subjects = {};
    originalSubjects.forEach((sub) => {
        subjects[sub.subject.code] = {
            learn: sub.learn,
            books: sub.books,
        };
    });
    return subjects;
};

const useGradeData = (defaultGrade = 1, defaultContent = {}) => {
    const [grade, setGrade] = useState(defaultGrade);

    const [gradeData, setGradeData, clearGradeData, setKey] = useLocalStorage(
        `${GAVI_LS_KEY_GRADE}_${defaultGrade}`,
        defaultContent
    );

    const upsertSchedule = (schedule) => {
        if (isEmpty(schedule.subjects)) {
            const copyGradeData = { ...gradeData };
            delete copyGradeData[schedule.date];
            setGradeData(copyGradeData);
        } else {
            setGradeData((currentData) => ({
                ...currentData,
                [schedule.date]: mapSubjects(schedule.subjects),
            }));
        }
    };

    const getScheduleData = (date) => {
        return gradeData[date];
    };

    const loadScheduleData = (rawData) => {
        clearGradeData();
        const jsonData = JSON.parse(rawData);
        // mapImportedData(jsonData, grade);
        // setGradeData(mapImportedData(jsonData, grade));
        setGradeData(jsonData);
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
    };
};

export default useGradeData;
