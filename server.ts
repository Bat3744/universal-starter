import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {enableProdMode} from '@angular/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import {readFileSync} from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, FormValidator, MailUtils} = require('./dist/server/main.bundle');

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
 app.get('/api/**', (req, res) => { });
 */

app.get('/api/test', function (req, res) {
    res.send('Hello test World!');
});

app.post('/api/submitDevis', function (req, res) {

    console.log('request = ' + JSON.stringify(req.body));

    if (!req.body || !req.body.data) {
        handleError(res, "Invalid form data", "Must provide valid data", 400);
    }

    const form = req.body.data.form,
        captchaResponse = req.body.data.captchaResponse,
        formValidator = new FormValidator(),
        captchaPromise = formValidator.recaptchaValidation(captchaResponse),
        formPromise = formValidator.validate(form),
        mailUtils = new MailUtils();

    Promise.all([captchaPromise, formPromise]).then(errors => {

        const allErrors = Object.assign({}, errors[0], errors[1]);

        if (!formValidator.isEmpty(allErrors)) {
            res.send(allErrors);
        } else {
            mailUtils.sendEmail(form).then(() => {
                res.send({});
            }).catch((err) => {
                res.send(err);
            });
        }

    });

});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

function handleError(res, reason, message, code) {
    console.log("ERROR : " + reason);
    res.status(code || 500).json({"error": message});
}