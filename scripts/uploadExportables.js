/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const yargs = require('yargs');
const admin = require('firebase-admin');
const moment = require('moment');

const firebaseConfig = {
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

const packages = [
    'gavi-public.zip',
    'gavi-aprende1.zip',
    'gavi-aprende2.zip',
    'gavi-aprende3.zip',
    'gavi-aprende4.zip',
    'gavi-aprende5.zip',
    'gavi-aprende6.zip',
];

const uploadFile = async (folder, file) => {
    const filePath = path.join(__dirname, '../exportables', `./${file}`);

    const options = {
        destination: `${folder}/${file}`,
    };

    console.log(`[${file}] uploading...`);

    try {
        await bucket.upload(filePath, options);
        console.log(`[${file}] upload complete`);
    } catch (e) {
        console.log(`[${file}] unexpected error`);
    }
};

const enqueueUploads = (folder) => {
    const queue = packages.map((file) => uploadFile(folder, file));
    return Promise.all(queue);
};

yargs
    .command({
        command: 'upload',
        desc: 'Upload exportables to firebase',
        usage: 'Usage: $0 --folter [folder]',
        builder: (yrgs) =>
            yrgs.option('folder', {
                alias: 'f',
                describe: 'provide a destination folder',
                default: moment().format('YYYY-MM-DD'),
                demandOption: true,
            }),
        handler: ({ folder }) => {
            enqueueUploads(folder);
        },
    })
    .demandCommand(2).argv;
