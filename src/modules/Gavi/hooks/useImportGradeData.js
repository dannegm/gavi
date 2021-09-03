import { useEffect, useState } from 'react';

const importGradeData = async (grade) => {
    return (await import(`@assets/data/grade${grade}.json`)).default;
};

const useImportGradeData = (grade) => {
    const [gradeData, setGradeData] = useState({});

    const importData = async () => {
        const data = await importGradeData(grade);
        setGradeData(data);
    };

    useEffect(() => {
        importData();
    }, []);

    return [gradeData];
};

export default useImportGradeData;
