/* eslint-disable prettier/prettier */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const { HmacSHA1 } = require('crypto-js');

// eslint-disable-next-line import/newline-after-import
const PACKAGE_VERSION = require('../package.json').version;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const $path = (relativePath) => path.join(__dirname, '../', relativePath);

const $import = (p) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require($path(p));
};

const getSignature = (data) => {
    const rawData = JSON.stringify(data);
    return HmacSHA1(rawData, SECRET_KEY).toString();
};

const getDocContent = (grade, defaultContent = {}) => {
    return JSON.stringify({
        scheme_version: PACKAGE_VERSION,
        grade,
        updated_at: new Date(),
        signature: getSignature(defaultContent),
        data: defaultContent,
    });
};

// Trabajar con las materias
const mapSubjects = ([subjectCode, data]) => {
    return {
        subjectCode,
        ...data,
    };
};

// Trabajar con cada día
const mapDays = ([day, data]) => {
    const mappedData = Object.entries(data).map(mapSubjects);
    return {
        day,
        data: mappedData,
    };
};

// Tranformar días
const transform = (data) => {
    const days = {};
    data.forEach(({ day, data: dayData }) => {
        days[day] = dayData;
    });
    return days;
};

const executeCommand = ({ dest, grade }) => {
    const jsonData = $import(`src/assets/data/grade${grade}.json`);

    const data = Object.entries(jsonData.data).map(mapDays);
    const generatedData = getDocContent(grade, transform(data));

    fs.writeFile(`${dest}/grade${grade}.json`, generatedData, (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log('Algo falló');
        } else {
            // eslint-disable-next-line no-console
            console.log('Todo OK');
        }
    });
};

yargs
    .command({
        command: 'migrate <grade>',
        desc: 'Migrate old data files',
        usage: 'Usage: $0 <grade> --dest [dest]',
        builder: (y) =>
            y.option('dest', {
                alias: 'd',
                describe: 'provide a path to file',
                default: './src/assets/data',
                demandOption: true,
            }),
        handler: ({ grade, dest }) => {
            executeCommand({ grade, dest });
        },
    })
    .demandCommand(2).argv;
