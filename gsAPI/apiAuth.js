const { google } = require('googleapis');

// Importando métodos pré-definidos para a API Google Sheet
const gsAPI = require('./methods');

/** Usar os métodos da variável "gsAPI" com a autenticação informada nos parâmetros.
 * @function use
 * @param {*Object} authConfig "Objeto com as informações para autenticação de acesso tanto na API quanto na planilha.
 *    Keys:
 *    -   "spreadsheetId": ID da planilha
 *    -   "apiScope": Escopo de autorização da API
 *    -   "googleApiKey": JSON de autenticação para acesso a API".
 * @param {*String} methodName "Nome do método que será utilizado da variável "gsAPI"".
 * @param {*Object} options "Parâmetros que serão utilizado nos métodos da variável "gsAPI"".
 * @returns {Success} "O retorno irá variar de acordo com o método utilizado".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
exports.use = (authConfig, methodName, options) => {
  // Autorização de acesso a API
  const client = new google.auth.JWT(
    authConfig.googleApiKey.client_email,
    null,
    authConfig.googleApiKey.private_key,
    authConfig.apiScope,
  );

  return new Promise((resolve, reject) => {
    client.authorize((err, token) => {
      if (err) {
        reject(err);
      } else {
        // Usar os métodos da váriavel "gsAPI"
        resolve(
          gsAPI.use[methodName](client, authConfig.spreadsheetId, options),
        );
      }
    });
  });
};
