import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    DAYS,
    MONTHS_MODEL,
    YEARS,
    FORMAT_COMMON,
    buildDate,
    formatDate,
    isValidDate,
} from '@helpers/dateHelpers';

import Button from '../Button';
import Dropdown from '../Dropdown';

import { DatePickerWrapper, Description, Row, Col } from './DatePicker.styled';

const DatePicker = ({ onSubmit }) => {
    const [day, setDay] = useState(undefined);
    const [month, setMonth] = useState(undefined);
    const [year, setYear] = useState(undefined);
    const [date, setDate] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        const d = buildDate(year, month?.value, day);
        if (isValidDate(d)) {
            setDate(d);
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [day, month, year]);

    const handleSubmit = () => {
        onSubmit(formatDate(date, FORMAT_COMMON));
    };

    return (
        <DatePickerWrapper>
            <Row>
                <Description>
                    Selecciona el día, mes y año para consultar las páginas de los Libros de texto
                    gratuitos y las de La Guía Santillana, que se trabajan en cada programa de
                    televisión.
                </Description>
            </Row>
            <Row>
                <Col>
                    <Dropdown
                        placeholder='Día'
                        items={DAYS}
                        value={day}
                        onSelect={(val) => setDay(val)}
                    />
                </Col>
                <Col>
                    <Dropdown
                        placeholder='Mes'
                        items={MONTHS_MODEL}
                        value={month}
                        onSelect={(item) => setMonth(item)}
                    />
                </Col>
                <Col>
                    <Dropdown
                        placeholder='Año'
                        items={YEARS}
                        value={year}
                        onSelect={(val) => setYear(val)}
                    />
                </Col>
            </Row>
            <Row>
                <Button label='VER MATERIAL' disabled={!canSubmit} onClick={handleSubmit} />
            </Row>
            <Row>
                <Button label='DESCARGABLES' disabled />
            </Row>
        </DatePickerWrapper>
    );
};

DatePicker.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default DatePicker;
