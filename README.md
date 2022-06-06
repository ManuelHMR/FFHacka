# FFHacka

Projeto desenvolvido pelo grupo 2 para o [FFHacka](https://ffhacka.com.br).
 
Autores (em ordem alfabética):
 - Caio Rodrigues Villela Pedras
 - Gabriel d'Agosto Pache de Faria
 - Manuel Henrique Martins Rodrigues

<hr>

## Objetivo
**Tema escolhido:** Leitura de documentos de seguros (OCR)

O objetivo do grupo, ao ouvir o palestrante Eduardo Pitombera, foi desenvolver uma maneira de ler documentos como os relatórios 20-F emitidos por empresas de grande porte, e extrair o máximo de informação o possível no documento, para manter as informações disponíveis para a Fairfax em seu sistema centralizado de dados.

Desenvolvemos um Produto Mínimo Viável (MVP) de um processo semi-automatico de leitura de tabelas, em que processamos o arquivo pdf e enviamos tabelas relevantes encontradas dentro das páginas do documento. O usuário final então recebe tambem uma indicação da página correspondente do pdf e pode selecionar e editar quais tabelas são de fatos de interesse da Fairfax, garantindo a acurácia dos dados em momentos em que o leitor automático ainda não consegue acertar.

Os arquivos pdf são guardados em um Data Lake, representado no MVP por uma instância de `mongodb` e as tabelas relevantes são guardadas em um Data Warehouse, representado no MVP por uma instância de `postgresql`.

<hr>

## Subprojetos

| Pasta | Tecnologias | Link do deploy |  
|---|---|---|
| front | ReactJS | https://ff-hacka.vercel.app/ |  
| back | NodeJS | https://ff-hacka.herokuapp.com/ |  
| python | Flask | http://34.138.119.250/ (Google Cloud Provider)| 

<hr>

## **front**

A pasta `front` contém o projeto do frontend, em que o usuário faz o upload do pdf, recebe as tabelas para serem ajustadas, faz a conferência e envia as tabelas relevantes para serem guardadas

#### **Rodando em desenvolvimento**

A partir da raiz, rode os seguintes comandos
```sh
cd front
npm install --dev
npm run dev
```



<hr>

### **back**

A pasta `back` contém o projeto do backend, desenvolvido em nodeJS, que é a conexão direta com o front-end. Esse serviço recebe o arquivo pdf, envia para o Data Lake e para a aplicação `python`, e depois devolve ao front-end.
Ao final do processo, recebe as tabelas prontas e salva as mesmas no Data Warehouse.
#### **Rodando em desenvolvimento**

A partir da raiz, rode os seguintes comandos
```sh
cd back
npm install --dev
npm run dev
```

<hr>

### **python**

A pasta `python` contém o serviço de leitura e detecção de tabelas a partir de um documento PDF. É uma combinação de um processo automatizado por bibliotecas para a extração de dados, e programação determinística para melhorar o processo automatico e devolver tabelas mais precisas para o usuário final.

#### **Rodando em desenvolvimento**

> Requer python >= 3.8 e pipenv instalados!

A partir da raiz, rode os seguintes comandos
```sh
pip install pipenv #Caso não possua o pipenv instalado
cd python
pipenv install
pipenv shell
flask run
```

<hr>

## Projetos futuros

A seguir, segue um compilado de ideias para acrescentar em cima do MVP, que não pudemos desenvolver durante o Hackathon

- Melhorar a estilização da interface web, e acrescentar novas técnicas de edição de tabela, como adicionar linhas e colunas e combinar linhas que o sistema automatizado detectou como sendo linhas distintas, afim de facilitar a utilização da ferramenta.

- Melhorar a interface com o usuário, exibindo não só a tabela extraída pelo python, mas tambem a tabela direto do pdf, lado a lado, para facilitar o trabalho de conferência do usuário final.

- Evoluir ainda mais as técnicas de extração de dados do módulo `python`, para garantir uma maior acurácia na extração inicial de dados, diminuindo ,ou até mesmo eliminando, a necessidade de um usuário fazendo a conferência.

- Exibir uma tela de confirmação final para que o usuário confira exatamente o que está enviando, minimizando falhas humanas.

- Categorizar e permitir a visualização dos documentos e tabelas enviadas a partir de uma interface web, após o envio para as tabelas dos dados centralizados, permitindo que stakeholders possam acessar as informações contidas Data Lakes e Data Warehouse.
