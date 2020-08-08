## CRYPTO EXCHANGE API 💵
Pequeña API para conocer el mercado de los activos: `BTC, ETH, DASH, Bs (Bolívares) & PTR (Petro)`

### Comencemos por lo básico
Es necesario instalar las dependencias:
<br>
`npm install`

Creamos una base de datos en `PostgreSQL`: <br>
`CREATE DATABASE CHINCHIN WITH OWNER {username};`

Luego, añadiremos un archivo `.env` que posea estas características:
<br>
`ENV=dev` <br>
`DB_URL=localhost` <br>
`DB_PORT=5432` <br>
`DB_USERNAME={username}` <br>
`DB_PASSWORD={password}` <br>
`DB_NAME=chinchin` <br>
`DB_MAX=20` <br>
`DB_IDLE_TIMEOUT=1000` <br>
`DB_CONNECTION_TIMEOUT=1000` <br>

Ahora podemos iniciar la aplicación que correrá en el puerto `3000`:
<br>
`npm start`

