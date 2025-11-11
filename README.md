## Comandos terminal

### Backend:
- Instalação do express e outras bibliotecas (`cd backend`)
```npm i express pg body-parser dotenv jsonwebtoken bcryptjs```
- Para rodar o servidor na porta 40000:
```node app.js```

### Frontend:
- Instalação do express-generator (diretório raiz)
```sudo npm i -g express-generator```
- Instalação do Vash (diretório raiz)
```express -e --view=vash petshopfrontNode```
- Instalação das bibliotecas restantes
```npm i express-session axios dotenv body-parser moment http-errors```
- Para rodar o servidor na porta 40100:
```DEBUG=petshopfrontnode:* npm start```
