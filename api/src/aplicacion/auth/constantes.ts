export const codigoVerificacion = (codigo: string) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Código de Activación</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-collapse:collapse;">
          
          <!-- Header -->
          <tr>
            <td style="padding:20px 30px; border-bottom:3px solid #e61e46;">
              <h1 style="margin:0; font-size:20px; color:#3c3c3b;">
                Código de activación
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#3c3c3b; font-size:14px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">
                Hemos generado su código de activación.
              </p>

              <p style="margin:0 0 25px 0;">
                Por favor utilice el siguiente código para completar el proceso de activación:
              </p>

              <div style="padding:15px; border:1px solid #e61e46; text-align:center; font-size:18px; font-weight:bold; letter-spacing:2px; color:#3c3c3b;">
                 ${codigo}
              </div>

              <p style="margin:25px 0 0 0; font-size:13px; color:#666666;">
                Si usted no solicitó este código, puede ignorar este mensaje.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:15px 30px; background-color:#f9f9f9; font-size:12px; color:#999999; text-align:center;">
              Este es un mensaje automático, por favor no responda a este correo.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;
};
