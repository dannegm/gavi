import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Header from '@gavi/components/Header';
import Logo from '@gavi/components/Logo';
import DatePicker from '@gavi/components/DatePicker';
import Footer from '@gavi/components/Footer';

import Page from '@gavi/layout/Page';

import { HeaderContentWrapper, Headline } from './Home.styled';

const gradeTitles = ['none', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto', 'Sexto'];

const HeaderContent = () => (
    <HeaderContentWrapper>
        <p>
            Para el ciclo escolar 2021-2022, la Secretaría de Educación Pública implementará una
            serie de acciones para que tu regreso a clases sea seguro. Una de ellas es que los
            alumnos puedan tomar clases a distancia con apoyo del programa Aprende en casa.
        </p>
        <p>
            <b>Aprende en casa con La Guía Santillana</b> renueva su imagen y redobla su compromiso
            de acompañarte durante la programación televisiva mediante recursos digitales que te
            ayudarán a reforzar tu aprendizaje desde el aula, el hogar o cualquier lugar donde te
            encuentres.
        </p>
    </HeaderContentWrapper>
);

const Home = () => {
    const history = useHistory();
    const { grade } = useParams();

    const handleSelectDate = (date) => {
        history.push(`/aprende${grade}/materias/${date}`);
    };

    return (
        <Page grade={grade} title={`${grade}º GAVI`}>
            <Header subtitle={`${gradeTitles[grade]} Grado`} content={<HeaderContent />} />
            <Logo />
            <Headline>
                <b>¡Aprendamos</b> juntos!
            </Headline>
            <DatePicker onSubmit={handleSelectDate} />
            <Footer />
        </Page>
    );
};

export default Home;
