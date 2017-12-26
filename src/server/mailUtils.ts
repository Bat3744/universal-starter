import * as nodemailer from 'nodemailer';

export class MailUtils {

    sendEmail(form: any): Promise<void> {

        console.log('1');

        let htmlContent = form.prenom + ' ' + form.nom + '<br/>' +
            'email : ' + form.email + '<br/>';

        form.telephone ? htmlContent += 'telephone : ' + form.telephone + '<br/>' : '';
        form.entreprise ? htmlContent += 'entreprise : ' + form.entreprise + '<br/>' : '';
        form.naturePrestation ? htmlContent += 'nature de la prestation : ' + form.naturePrestation + '<br/>' : '';
        form.infoComplementaire ? htmlContent += 'info complementaire : ' + form.infoComplementaire + '<br/>' : '';

        const transporter = nodemailer.createTransport({
            host: 'smtp.control-air.fr',
            port: 587,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'contact@control-air.fr',
                pass: '123456789*controlAIR'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: '"Site Control Air" <contact@control-air.fr>', // sender address
            to: 'contact@control-air.fr', // list of receivers
            subject: 'Devis', // Subject line
            html: htmlContent // plain text body
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }

                return resolve();
            });
        });
    }

}