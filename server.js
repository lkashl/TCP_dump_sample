// Raise new certs following:
// https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/

// Customise CIPHERS for test here
const ciphers = [
    //"AES128-GCM-SHA256",
    "TLS_RSA_WITH_AES_256_CBC_SHA256"
]
const port = 3000;

const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./localhost.site.key');
const cert = fs.readFileSync('./localhost.site.crt');

const server = https.createServer({
    key,
    cert,
    ciphers: ciphers.join(":"),
    maxVersion: "TLSv1.2"
}, (req, res) => {
    res.writeHead(200);
    res.write(JSON.stringify({ success: true }))
    res.end()
})

server.listen(port, (err) => {
    console.log(["Server bound on port " + port, "Supported CIPHER list:", ...ciphers].join("\n"))
    if (err) console.log(err);
})