// Conexão MySQL
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '#HOST',
  user: '#USUARIO',
  password: '#SENHA',
  database: '#NOME_DA_BASE_DE_DADOS',
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

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

/**************************************************************************************************************
 * Pegar dados do Banco de dados MySQL > convertConverter para Array Multidimensional > Adicionar na planilha *
 **************************************************************************************************************/
const query = {
  queryColumnsNames: 'SHOW columns FROM NOME_DA_TABELA',
  queryData: 'SELECT * FROM NOME_DA_TABELA',
};

connection.query(
  `${query.queryData};${query.queryColumnsNames}`,
  [1, 2],
  function (err, rows, fields) {
    if (!err) {
      if (rows[0].length === 0 && rows[1].length === 0) return;
      const columnsNames = rows[1].map((value) => value.Field);
      const dataList = rows[0];

      let newData = dataList.map((value) => {
        let dataResultContainer = [];

        for (i = 0; columnsNames.length > i; i++) {
          dataResultContainer.push(`${value[columnsNames[i]]}`);
        }

        return dataResultContainer;
      });

      newData.unshift(columnsNames);

      // Adicionar dados na planilha
      updateMySpreadsheet(newData, 'A1');
    } else {
      console.log(err);
    }
  },
);

connection.end();

/*****************************************************
 * Usando os métodos do arquivo "./gsAPI/methods.js" *
 *****************************************************/
// Executar funções de exemplo
// myRows('A:Z');
// updateMySpreadsheet([
//   ['nome', 'email'],
//   ['António Braga', 'antonio@test.com'],
//   ['Felipe Carlos', 'felipe@test.com'],
//   ['Carla da Silva', 'carla@test.com'],
// ], 'A1');
// clearMySpreadsheet('A:Z');

/** Exemplo para: Buscar dados das células
 * @function myRows
 * @param {String} rangeValue "Área da planilha para pegar os dados"
 * @returns {Success (Array)} "Retornará uma array multidimensional com os valores das linhas e colunas selecionadas".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function myRows(rangeValue = 'A:Z') {
  try {
    const result = await gsAPIAuth.use(authConfig, 'getCells', {
      // Com o valor "ROWS" as arrays serão listadas em linhas, enquanto o valor "COLUMNS" vão listá-las em colunas.
      majorDimension: 'ROWS',
      // Área de seleção da planilha
      range: rangeValue,
    });

    console.log(result.data.values);
    return result.data.values;
  } catch (err) {
    console.log(err);
  }
}

/** Exemplo para: Atualizar células com os dados do Banco de Dados
 * @function updateMySpreadsheet
 * @param {*Array} newData "Dados que serão adicionados na planilha"
 * @param {String} rangeValue "Área da planilha para adicionar os dados"
 * @returns {Success (Object)} "Retornará um objeto informando que a ação foi bem sucedida".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function updateMySpreadsheet(newData, rangeValue = 'A1') {
  try {
    const result = await gsAPIAuth.use(authConfig, 'updateCells', {
      // Área de seleção da planilha
      range: rangeValue,
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
 * @param {String} rangeValue "Área da planilha para apagar os dados"
 * @returns {Success (Object)} "Retornará um objeto informando que a ação foi bem sucedida".
 * @returns {Fail (Object)} "Retornará um objeto com as informações de erro".
 */
async function clearMySpreadsheet(rangeValue = 'A1') {
  try {
    const result = await gsAPIAuth.use(authConfig, 'clearCells', {
      // Área de seleção da planilha
      range: rangeValue,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
