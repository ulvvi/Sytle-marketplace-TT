# Style-marketplace-TT

## Download 

Clone o repositório git

``` bash
$ git clone https://github.com/ulvvi/Sytle-marketplace-TT.git
$ cd Style-marketplace-TT
```

## Instalação 
Depois instale as dependencias do front e do back

### Pasta backend

``` bash
$ cd backend
$ npm install
```

### Pasta frontend

``` bash
$ cd ..
$ cd frontend
$ npm install
```


## Configuração
Copie o arquivo .env.example para um env e rode os comandos abaixo

DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public"

Com os comandos abaixo, será feita a configuração da pasta `backend`:

``` bash
$ cd ..
$ cd backend
$ npx prisma migrate dev
$ npx prisma generate
$ npm run seed
$ npm run keys
```


## Uso
para rodar, utilize o comando abaixo na pasta 'backend'

``` bash
npm start
```

mude a seguir para a pasta `frontend` e execute o app:

``` bash
cd ..
cd frontend
npm run dev
```
