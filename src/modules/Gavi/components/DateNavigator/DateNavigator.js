import React from 'react';
import PropTypes from 'prop-types';

import { MONTHS, getNextWorkingDay, getPrevWorkingDay } from '@helpers/dateHelpers';

import Logo from '../Logo';

import {
    DateNavigatorWrapper,
    NavigatorWrapper,
    ArrowButton,
    ArrowIcon,
    LogoWrapper,
    DateWrapper,
} from './DateNavigator.styled';

const DateNavigator = ({ date, onNext, onPrev }) => {
    const handlePrev = (ev) => {
        ev.preventDefault();
        const prevDay = getPrevWorkingDay(date);
        onPrev(prevDay);
    };

    const handleNext = (ev) => {
        ev.preventDefault();
        const nextDay = getNextWorkingDay(date);
        onNext(nextDay);
    };

    return (
        <DateNavigatorWrapper>
            <NavigatorWrapper>
                <ArrowButton onClick={handlePrev}>
                    <ArrowIcon left />
                </ArrowButton>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <ArrowButton onClick={handleNext}>
                    <ArrowIcon right />
                </ArrowButton>
            </NavigatorWrapper>
            <DateWrapper>
                <b>{date.getDate()}</b>
                {`-${MONTHS[date.getMonth()]}-`}
                <b>{date.getFullYear()}</b>
            </DateWrapper>
        </DateNavigatorWrapper>
    );
};

DateNavigator.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
};

DateNavigator.defaultProps = {
    onNext: () => null,
    onPrev: () => null,
};

export default DateNavigator;
