/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const yargs = require('yargs');
const admin = require('firebase-admin');
const moment = require('moment');
const mailgunBuilder = require('mailgun-js');
const { startCase } = require('lodash');

console.log('FIREBASE_SERVICE_ACCOUNT_KEY: ', process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const firebaseConfig = {
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

const mailgun = mailgunBuilder({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

const emailPayload = (folder, bucketUrlList) => ({
    from: process.env.CICD_NOTIFICATION_SENDER,
    to: process.env.CICD_NOTIFICATION_SUSCRIPTORS || 'im@danielgarcia.me, dannegm@gmail.com',
    subject: `Gavi -  ${startCase(folder)} Disponible`,
    text: `
Los descargables de Gavi para ${startCase(folder)} ya se encuentran disponibles.

Link de descarga:
---
${bucketUrlList}
---

Los enlaces tienen una vigencia de 30 días a partir del momento en el que se reciba este email.
    `,
});

const buildUrlList = (rosourceList) => {
    let str = ``;
    rosourceList.forEach(({ file, resourceUrl }) => {
        str += `
${file}:
${resourceUrl}

        `;
    });
    return str;
};

const packages = [
    'gavi-public.zip',
    // 'gavi-aprende1.zip',
    // 'gavi-aprende2.zip',
    // 'gavi-aprende3.zip',
    // 'gavi-aprende4.zip',
    // 'gavi-aprende5.zip',
    // 'gavi-aprende6.zip',
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

        const [resourceUrl] = await bucket.file(options.destination).getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
        });

        return {
            file,
            resourceUrl,
        };
    } catch (e) {
        console.log(`[${file}] unexpected error`);
        return e;
    }
};

const enqueueUploads = async (folder) => {
    const queue = packages.map((file) => uploadFile(folder, file));
    const bucketUrls = await Promise.all(queue);
    console.log(bucketUrls);

    const emaiNotificationdata = emailPayload(folder, buildUrlList(bucketUrls));
    mailgun.messages().send(emaiNotificationdata, (error) => {
        if (error) {
            console.log(`[Email] unexpected error`);
            console.log(error);
        } else {
            console.log('[Email] Notification sent');
        }
    });
};

yargs
    .command({
        command: 'upload',
        desc: 'Upload exportables to firebase',
        usage: 'Usage: $0 --folder [folder]',
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
