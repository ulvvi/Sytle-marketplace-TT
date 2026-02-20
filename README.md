# Style-marketplace-TT

## Download 

Clone o repositório git

``` bash
$ git clone https://github.com/ulvvi/Sytle-marketplace-TT.git
$ cd Style-marketplace-TT
```

## Instalação 
Depois instale as dependencias do front e do back

### Pasta back

``` bash
$ cd backend
$ npm install
```

### Pasta front

``` bash
$ cd ..
$ cd frontend
$ npm install
```


## Configuração
Copie o arquivo .env.example para um env e rode os comandos abaixo

DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public"

Com os comandos abaixo, será feita a configuração da pasta `back`:

``` bash
$ cd ..
$ cd back
$ npm run migrate
$ npm run seed
$ npm run keys
```


## Uso
para rodar, utilize o comando abaixo na pasta 'backend'

``` bash
npm start
```

Com as configurações feitas, mude a seguir para a pasta `front`, para a execução do aplicativo utilizando os seguintes comandos:

``` bash
cd ..
cd front
npm run dev
```
