const { google } = require('googleapis');

module.exports.use = {
  /** Acessar e retornar os valores das células selecionadas na planilha.
   * @method getCells
   * @param {*Object} clientAuth "Objeto de autenticação JWT do Google Cloud (new google.auth.JWT) válido".
   * @param {*String} spreadsheetId "ID da planilha".
   * @param {*Object} options "Parâmetros que serão utilizado pela API do Google Sheets".
   * @returns {Success} "Array com todos os dados encontrados".
   * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
   */
  async getCells(clientAuth, spreadsheetId, options) {
    // Acessando a api do Google Sheets (indicando a versão da API e a permissão de acesso)
    const gsapi = google.sheets({ version: 'v4', auth: clientAuth });

    const opt = {
      spreadsheetId,
      ...options,
    };

    try {
      const mySpreadsheet = await gsapi.spreadsheets.values.get(opt);
      const data = mySpreadsheet;
      return data;
    } catch (err) {
      return err;
    }
  },

  /** Acessar e apagar os valores das células selecionadas na planilha.
   * @method clearCells
   * @param {*Object} clientAuth "Objeto de autenticação JWT do Google Cloud (new google.auth.JWT) válido".
   * @param {*String} spreadsheetId "ID da planilha".
   * @param {*Object} options "Parâmetros que serão utilizado pela API do Google Sheets".
   * @returns {Success} "Array com todos os dados encontrados".
   * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
   */
  async clearCells(clientAuth, spreadsheetId, options) {
    // Acessando a api do Google Sheets (indicando a versão da API e a permissão de acesso)
    const gsapi = google.sheets({ version: 'v4', auth: clientAuth });

    const opt = {
      spreadsheetId,
      ...options,
    };

    const mySpreadsheet = await gsapi.spreadsheets.values.clear(opt);
    const data = mySpreadsheet;
    return data;
  },

  /** Acessar e alterar os valores das células selecionadas na planilha.
   * @method updateCells
   * @param {*Object} clientAuth "Objeto de autenticação JWT do Google Cloud (new google.auth.JWT) válido".
   * @param {*String} spreadsheetId "ID da planilha".
   * @param {*Object} options "Parâmetros que serão utilizado pela API do Google Sheets".
   * @returns {Success} "Array com todos os dados encontrados".
   * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
   */
  async updateCells(clientAuth, spreadsheetId, options) {
    // Acessando a api do Google Sheets (indicando a versão da API e a permissão de acesso)
    const gsapi = google.sheets({ version: 'v4', auth: clientAuth });

    const opt = {
      spreadsheetId,
      ...options,
    };

    const mySpreadsheet = await gsapi.spreadsheets.values.update(opt);
    const data = mySpreadsheet;
    return data;
  },
};
