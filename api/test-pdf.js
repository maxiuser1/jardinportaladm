const axios = require('axios');
const fs = require('fs');

async function test() {
    const htmlData = `<!doctype html><html><body><h1>Test!</h1></body></html>`;
    const formData = new FormData();
    const blob = new Blob([htmlData], { type: 'text/html' });
    formData.append('files', blob, 'index.html');
    
    try {
        const response = await axios.post(
            'https://webappc-004-sirius-pdf-dev-qa.azurewebsites.net/forms/chromium/convert/html',
            formData,
            { responseType: 'arraybuffer' }
        );
        fs.writeFileSync('test.pdf', Buffer.from(response.data));
        console.log('Success, wrote test.pdf size:', response.data.byteLength);
    } catch(e) {
        let err = e.response ? e.response.data : e.message;
        if (Buffer.isBuffer(err)) err = err.toString();
        console.error(err);
    }
}
test();
