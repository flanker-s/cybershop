import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { config } from '../config/config.js';

const sendActivationLink = async (to: string, link: string) => {
    const OAuth2 = google.auth.OAuth2;
    const client = new OAuth2(config.smtp.gmail.userId, config.smtp.gmail.secret);

    client.setCredentials({
        refresh_token: config.smtp.gmail.refreshToken
    });

    const accessToken = await client.getAccessToken();

    if (accessToken.token) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.smtp.gmail.user,
                clientId: config.smtp.gmail.userId,
                clientSecret: config.smtp.gmail.secret,
                refreshToken: config.smtp.gmail.refreshToken,
                accessToken: accessToken.token
            }
        });
        const mailOptions = {
            from: config.smtp.gmail.user,
            to: to,
            subject: "Cybershop account activation",
            html: `
                <h1><a href="${link}">Activate account</a></h1>
            `
        };
        return transporter.sendMail(mailOptions);
    } else {
        throw new Error('Gmail OAuth2 error. Access token is null');
    }
}

export default {
    sendActivationLink
} 