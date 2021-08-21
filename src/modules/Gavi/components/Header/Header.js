import React from 'react';
import PropTypes from 'prop-types';

import gaviLogo from '@assets/images/gavi.png';

import SubjectBadge from '../SubjectBadge';

import {
    HeaderWrapper,
    HeaderBackground,
    HeaderContent,
    HeaderTitleRow,
    HeaderTitleWrapper,
    Logo,
    Title,
    Subtitle,
    SubjectWrapper,
    ContentWrapper,
} from './Header.styled';

const Header = ({ title, subtitle, content, subject }) => {
    return (
        <HeaderWrapper>
            <HeaderBackground>
                <HeaderContent>
                    <HeaderTitleRow>
                        <Logo src={gaviLogo} alt='' />
                        <HeaderTitleWrapper>
                            {title && <Title>{title}</Title>}
                            {subtitle && <Subtitle>{subtitle}</Subtitle>}
                        </HeaderTitleWrapper>
                    </HeaderTitleRow>
                    {subject && (
                        <SubjectWrapper>
                            <SubjectBadge code={subject} />
                        </SubjectWrapper>
                    )}
                    {content && <ContentWrapper>{content}</ContentWrapper>}
                </HeaderContent>
            </HeaderBackground>
        </HeaderWrapper>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.node,
    subject: PropTypes.string,
};

Header.defaultProps = {
    title: '',
    subtitle: '',
    content: null,
    subject: '',
};

export default Header;
