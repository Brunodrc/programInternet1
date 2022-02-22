/*
INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO PIAUÍ
Curso: Análisee e desenvolvimento de sistemas - ADS
Disciplina: Programação para internet 1
Professor: Ely
Aluno: BRUNO CASTRO
*/
/*                  __________ RESPOSTAS ATIVIDADE 17/02/22 _____________*/
// 2. Crie um programa que receba uma URL e execute um método GET
// importar o módulo axios
import axios = require('axios');

let httpTest = 'http://httpbin.org/#/';

function requisitaDados(http :string) { //função que faz a requisição dos dados
    return axios.default.get(http);
}

var corpo = requisitaDados(httpTest); // exibe o corpo do site
corpo.then(function(resposta){
	console.log(`O corpo do site é ${resposta.data}`)
})

let statusCode = requisitaDados(httpTest); // varivavel que recebe o status code, 200 para tudo certo

statusCode.then(function (resposta) { // função then para exibir o status code
    console.log(`O status code do site requerido é ${resposta.status}.`);
});

let encoding = requisitaDados(httpTest); // varivavel que recebe content-type: geralmente charset-uft-8

encoding.then(function (resposta) { // função then para exibir o content-type
    console.log(`A codificação do site requerido é ${resposta.headers['content-type']}.`);
});

let tamanhoResposta = requisitaDados(httpTest); //content-length

tamanhoResposta.then(function(resposta){
	console.log(`O tamanho da resposta é ${resposta.headers['content-length']}`);
});
