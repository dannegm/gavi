import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    FORMAT_COMMON,
    isWeekend,
    buildDate,
    getNextWorkingDay,
    formatDate,
} from '@helpers/dateHelpers';

const useNavigationDate = () => {
    const { grade, year, month, day } = useParams();

    const today = buildDate(year, month, day);

    useEffect(() => {
        if (isWeekend(today)) {
            const nextWorkingDay = getNextWorkingDay(today);
            handleNext(nextWorkingDay);
        }
    }, [today]);

    return {
        formatedDate: formatDate(today, FORMAT_COMMON),
        grade,
        today,
    };
};

export default useNavigationDate;
