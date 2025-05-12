import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<string>('SMTP_SECURE', 'false').toLowerCase() === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendJuradoInvitation(userEmail: string, userName: string, token: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:5173/confirm');
    const confirmationUrl = `${frontendUrl}/confirmar-jurado?token=${token}`;

    const moradoColor = '#6b45bc';
    const azulColor = '#4285f4';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invitación para ser Jurado - Feria de Videojuegos Académicos</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #2d2d2d;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .container-outer {
            padding: 20px;
            background-color: #2d2d2d;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            overflow: hidden;
          }
          .header {
            text-align: center;
            padding: 30px 20px;
            background-color: ${moradoColor};
            background: linear-gradient(to right, ${moradoColor}, ${azulColor});
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 26px;
            font-weight: 600;
          }
          .content {
            padding: 30px;
          }
          .content h2 {
            color: ${moradoColor};
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .user-name {
            font-weight: bold;
            color: #4a4a4a;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .button-css { 
            display:inline-block; 
            padding:12px 28px; 
            font-size:16px; 
            font-weight:bold; 
            color:#ffffff !important; 
            text-decoration:none; 
            border-radius:25px; 
            background-color:${moradoColor};
            background:linear-gradient(to right, ${moradoColor}, ${azulColor});
            cursor:pointer; 
            transition: opacity 0.2s ease;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            border-top: 1px solid #eaeaea;
            color: #777777;
            font-size: 12px;
            background-color: #f8f9f9;
          }
          .note {
            font-size: 13px;
            background-color: #f0f4f8;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid ${azulColor};
            margin: 25px 0;
            color: #555555;
          }
           .confirmation-link-text {
            word-break: break-all;
            font-size: 12px;
            color: ${azulColor};
            text-decoration: underline;
          }
          @media only screen and (max-width: 600px) {
            .container-outer { padding: 10px; }
            .container { width: 100%; margin: 10px auto; border-radius: 0; }
            .content { padding: 20px 15px; }
            .header h1 { font-size: 22px; }
          }
        </style>
      </head>
      <body>
        <div class="container-outer">
          <div class="container">
            <div class="header">
              <h1>Feria de Videojuegos Académicos</h1>
            </div>
            <div class="content">
              <h2>¡Has sido invitado como Jurado!</h2>
              <p>Hola <span class="user-name">${userName}</span>,</p>
              <p>Nos complace informarte que has sido registrado por un administrador para participar como jurado en nuestro evento de videojuegos académicos de la Universidad del Norte.</p>
              
              <p>Para aceptar la invitación, confirmar tu participación y establecer tu contraseña de acceso, por favor haz clic en el botón de abajo:</p>
              
              <div class="button-container">
                <a href="${confirmationUrl}" target="_blank"
                   style="display:inline-block; padding:12px 28px; font-size:16px; font-weight:bold; color:#ffffff !important; text-decoration:none; border-radius:25px; background-color:${moradoColor}; background:linear-gradient(to right, ${moradoColor}, ${azulColor}); cursor:pointer; transition: opacity 0.2s ease;">
                  Aceptar Invitación y Acceder
                </a>
              </div>
              
              <div class="note">
                <strong>Importante:</strong> Al hacer clic en el enlace, serás dirigido a una página para configurar tu contraseña y activar tu cuenta de jurado.
              </div>
              
              <p>Si tienes problemas con el botón, puedes copiar y pegar el siguiente enlace en la barra de direcciones de tu navegador:</p>
              <p><a href="${confirmationUrl}" class="confirmation-link-text" target="_blank">${confirmationUrl}</a></p>
              
              <p>Agradecemos de antemano tu interés y valiosa colaboración.</p>
              
              <p>¡Saludos cordiales!</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Feria de Videojuegos Académicos - Universidad del Norte</p>
              <p>Este es un correo generado automáticamente, por favor no lo respondas.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_FROM'),
      to: userEmail,
      subject: 'Invitación para ser Jurado - Feria de Videojuegos Académicos Uninorte',
      html: htmlContent,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo de invitación para jurado enviado a %s: %s', userEmail, info.messageId);
      return info;
    } catch (error) {
      console.error(`Error al enviar correo de invitación a jurado ${userEmail}:`, error);
    }
  }
}