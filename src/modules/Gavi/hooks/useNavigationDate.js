import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
    FORMAT_COMMON,
    MAX_ALLOWED_DATE,
    MIN_ALLOWED_DATE,
    buildDate,
    formatDate,
    isWeekend,
    getNextWorkingDay,
    getPrevWorkingDay,
} from '@helpers/dateHelpers';

import { buildRoute } from '@gavi/helpers/utils';

const useNavigationDate = (routeTemplate) => {
    const history = useHistory();
    const { grade, year, month, day, subject = '' } = useParams();

    const today = buildDate(year, month, day);
    const getRoute = buildRoute({
        routeTemplate,
        grade,
        subject,
    });

    const handleNext = (date) => {
        history.push(getRoute(date));
    };

    const handlePrev = (date) => {
        history.push(getRoute(date));
    };

    useEffect(() => {
        if (today > MAX_ALLOWED_DATE) {
            const maxAllowedDate = getPrevWorkingDay(MAX_ALLOWED_DATE);
            handleNext(maxAllowedDate);
        }

        if (today < MIN_ALLOWED_DATE) {
            const minAllowedDate = getNextWorkingDay(MIN_ALLOWED_DATE);
            handleNext(minAllowedDate);
        }

        if (isWeekend(today)) {
            const nextWorkingDay = getNextWorkingDay(today);
            handleNext(nextWorkingDay);
        }
    }, [today]);

    return {
        grade,
        today,
        handleNext,
        handlePrev,
        formatedDate: formatDate(today, FORMAT_COMMON),
        year: today.getFullYear(),
        month: (today.getMonth() + 1).toString().padStart(2, '0'),
        day: today.getDate(),
    };
};

export default useNavigationDate;
