import { useParams } from 'react-router-dom';

import { FORMAT_COMMON, buildDate, formatDate } from '@helpers/dateHelpers';

const useNavigationDate = () => {
    const { grade, year, month, day } = useParams();

    const today = buildDate(year, month, day);

    return {
        formatedDate: formatDate(today, FORMAT_COMMON),
        grade,
        today,
    };
};

export default useNavigationDate;
