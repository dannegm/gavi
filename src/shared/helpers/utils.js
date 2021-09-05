import { flattenDeep, range, trim } from 'lodash';

export const csvHeaders = [
    'grade',
    'date',
    'subject',
    'learn',
    // book 1
    'book1_grade',
    'book1_subject',
    'book1_serie',
    'book1_interactive',
    'book1_pages',
    // book 1
    'book2_grade',
    'book2_subject',
    'book2_serie',
    'book2_interactive',
    'book2_pages',
    // book 1
    'book3_grade',
    'book3_subject',
    'book3_serie',
    'book3_interactive',
    'book3_pages',
].join(',');

export const downloadJson = (data, name = 'file.json') => {
    const jsonBlob = new Blob([JSON.stringify(data)]);
    const blobUrl = URL.createObjectURL(jsonBlob);

    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = name;

    document.body.appendChild(link);

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        })
    );

    document.body.removeChild(link);
};

export const pagesHumanToArray = (humanText) => {
    const humanTextSanitized = humanText.replace(/\n/g, '').replace(/\s/g, '');
    const firstLevel = flattenDeep(humanTextSanitized.split(',').map((i) => i.split('y')));
    const secondLevel = firstLevel.map((i) => {
        const thirdLevel = i.split('a').map(Number);
        if (thirdLevel.length === 1) {
            return thirdLevel.map(Number);
        }

        const [from, to] = thirdLevel;
        return range(from, to + 1).map(Number);
    });
    return secondLevel;
};

export const parseCsvRow = (row) => {
    const pattern = /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/;
    return row.split(pattern).map((item) => trim(item, '"'));
};

export const parseCsvContent = (rawData) => {
    const rows = trim(rawData, '\n').replace(/\r/g, '').split('\n');
    return rows.map(parseCsvRow);
};
