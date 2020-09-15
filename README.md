# Google Sheets API - (example)

## Indice

1.  **Informações**
    1. Sobre este projeto
    2. Funcionalidades
    3. Tecnologias
2.  **Como rodar o Servidor**
    1. Requisitos
    2. Download das dependências
    3. Alterações necessárias
    4. Como rodar

## Informações

**Sobre este projeto:**

- Exemplo de como usar a API Google Sheets com uma estrutura básica.

**Funcionalidades:**

- **Ler planilha**
- **Editar planilha**
- **Apagar dados da planilha**

**Tecnologias:**

- **Back-end:** NodeJs.
- **Outras API/Lib:** googleapis.

## Como rodar

**Requisitos:**

- Ter instalado o Node.Js e o NPM [Download](https://nodejs.org/en/download/).

**Download das dependências:**

- No repositório local use o comando `npm install` para fazer o download das dependências do Back-end.

**Alterações necessárias:**

- Ativar API do Google Sheets > Pegar as credenciais de acesso > Dar permissão de editor na Planilha Google.
  - Acesse o console do [Google Cloud](https://console.cloud.google.com).
  - Acesse ou Crie um novo projeto.
  - Ative a [Google Sheets API](https://console.cloud.google.com/apis/api/sheets.googleapis.com).
  - Baixe o JSON de acesso da sua [credencial](https://console.cloud.google.com/apis/api/sheets.googleapis.com/credentials) (caso não tenha nenhuma credencial basta criá-la)... Vai ser algo parecido com isto:

```
{
  "type": "service_account",
  "project_id": "...9315",
  "private_key_id": "...34d",
  "private_key": "-----BEGIN PRIVATE KEY-----
  \nMIIEvgIBADANBgkqhkiG9w0BAQEFAASC...kozyE\nUIkQo1b3e3XNB+8...T1B
  \n-----END PRIVATE KEY-----\n",
  "client_email": "....iam.gserviceaccount.com",
  "client_id": "...6105",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googl...ta/x509/....iam.gserviceaccount.com"
}
```

- OBS: As credenciais de acesso geram um email (Ex: nome-da-credencial@nome-aleatorio.iam.gserviceaccount.com), use este email para dar permissão de editor na [Planilha Google](https://www.google.com/intl/pt-BR/sheets/about/) que você quer que a API possa editar.

- Mover JSON das credenciais > Pegar ID da Planilha Google > Editar "index.js".
  - Coloque o JSON de credencias dentro do diretório do projeto.
  - Abra no navegador a Planilha Google que você quer acessar através da API e pegue o ID dela na URL (OBS: O ID da Planilha esta depois do "**/d/**", exemplo: `https://docs.google.com/spreadsheets/d/1hwrYBeDCXxbh4OFdn5qfsA86_OnrhyhRNqzqJ7jnqBc` neste exemplo o ID da Planilha é "_1hwrYBeDCXxbh4OFdn5qfsA86_OnrhyhRNqzqJ7jnqBc_")
  - No arquivo "index.js" na linha onde esta escrito: `const googleApiKey = require('#Credenciais_de_autenticação.json');` substitua a string `#Credenciais_de_autenticação.json` pelo arquivo de credencias que você baixou.
  - No arquivo "index.js" na linha onde esta escrito: `spreadsheetId: '#ID_da_planilha',` substitua a string `#ID_da_planilha` pelo ID da sua Planilha Google

**Como rodar:**

- Para rodar a API use o comando no terminal: `npm start` para que seja executado o arquivo `index.js`.
- OBS: Já tem 3 funções de exemplo dentro do arquivo `index.js`, para usá-las basta descomentar as linhas em que estão escrito:

```
// myRows();
// updateMySpreadsheet();
// clearMySpreadsheet();
```
