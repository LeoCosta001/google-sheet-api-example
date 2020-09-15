/***********************************************
 * Autorização para acessar a API e a Planilha *
 ***********************************************/
// Arquivo JSON de credenciais para acessar o GoogleCloud
const googleApiKey = require('#Credenciais_de_autenticação.json');
const gsAPIAuth = require('./gsAPI/apiAuth');

const authConfig = {
  // ID da planilhas
  spreadsheetId: '#ID_da_planilha',
  // Escopo de autorização para uso da API "Google Sheet"
  apiScope: ['https://www.googleapis.com/auth/spreadsheets'],
  // JSON de acesso ao Google Cloud
  googleApiKey: googleApiKey,
};

/*****************************************************
 * Usando os métodos do arquivo "./gsAPI/methods.js" *
 *****************************************************/
// Executar funções de exemplo
// myRows();
// updateMySpreadsheet();
// clearMySpreadsheet();

/** Exemplo para: Buscar dados das células
 * @function myRows
 * @returns {Success (Array)} "Retornará uma array multidimensional com os valores das linhas e colunas selecionadas".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function myRows() {
  try {
    const result = await gsAPIAuth.use(authConfig, 'getCells', {
      // Com o valor "ROWS" as arrays serão listadas em linhas, enquanto o valor "COLUMNS" vão listá-las em colunas.
      majorDimension: 'ROWS',
      // Área de seleção da planilha
      range: 'A:B',
    });

    console.log(result.data.values);
    return result.data.values;
  } catch (err) {
    console.log(err);
  }
}

/** Exemplo para: Atualizar células
 * @function updateMySpreadsheet
 * @returns {Success (Object)} "Retornará um objeto informando que a ação foi bem sucedida".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function updateMySpreadsheet() {
  // Dados que serão adicionados na planilha
  const newData = [
    ['nome', 'email'],
    ['António Braga', 'antonio@test.com'],
    ['Felipe Carlos', 'felipe@test.com'],
    ['Carla da Silva', 'carla@test.com'],
  ];

  try {
    const result = await gsAPIAuth.use(authConfig, 'updateCells', {
      // Área de seleção da planilha
      range: 'A1',
      // Opção de entrada
      valueInputOption: 'USER_ENTERED',
      // Atualização
      resource: { values: newData },
    });

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

/** Exemplo para: Apagar células
 * @function clearMySpreadsheet
 * @returns {Success (Object)} "Retornará um objeto informando que a ação foi bem sucedida".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function clearMySpreadsheet() {
  try {
    const result = await gsAPIAuth.use(authConfig, 'clearCells', {
      // Área de seleção da planilha
      range: 'A1:B4',
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
