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
