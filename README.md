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
```
ENV=dev
DB_URL=localhost
DB_PORT=5432
DB_USERNAME={username}
DB_PASSWORD={password}
DB_NAME=chinchin
DB_MAX=20
DB_IDLE_TIMEOUT=1000
DB_CONNECTION_TIMEOUT=1000
TIME_ZONE=-04:00
```
(Es importante que cada uno de estos valores se encuentren en el archivo.)
<br>
<br>
Ahora podemos iniciar la aplicación que correrá en el puerto `3000`:
<br>
Con el comando: `npm start`

## Endpoints
**Conozcamos el mercado:** <br>
Cada vez que se haga un llamado a este endpoint, automáticamente se actualizar los valores 
en nuestra base de datos para que estén alineados al precio medio del
mercado.
> `http://localhost:3000/api/market` <br>
`GET`

Modelo de respuesta:
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": [
        {
            "id": 1,
            "name": "bitcoin",
            "symbol": "BTC",
            "priceUsd": 11723.000855116461,
            "status": true,
            "tradingVolumeUsd": 4508192300.428729,
            "maxSupply": 21000000,
            "type": "crypto",
            "createdAt": "2020-08-08T20:26:20.963Z",
            "updatedAt": "2020-08-08T20:26:20.963Z"
        },
    ]
}
```
<br>

**Veamos la tasa de cambio:**
> `http://localhost:3000/api/rates/{asset}` <br>
`GET`

El parámetro asset debe estar asociado al símbolo de cada activo:
BTC, DASH, ETH, BS, PTR <br>
Por ejemplo sería: <br>
`http://localhost:3000/api/rates/BTC` <br>
`http://localhost:3000/api/rates/eth` <br>
(Es indiferente si el símbolo está en mayúscula o minúscula) <br>
Modelo de respuesta:
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": {
        "name": "bitcoin",
        "symbol": "BTC",
        "priceUsd": 11756.981223520537
    }
}
```

**Incluyamos nuevos activos:**
Este endpoint es útil para añadir nuevos activos a la base de datos.
Luego, podrán ser obtenidos desde los demás endpoints
> `http://localhost/api/currencies` <br>
`POST`

Objeto de solicitud:
| **Input**         | **Tipo**   | **Requerido** | **Descripción**                        |
| ------------------| :--------: | :----------:  | -------------------------------------- |
| name              | string     | Sí            | Nombre del activo                      |
| symbol            | string     | Sí            | Símbolo del activo                     |
| priceUsd          | double     | Sí            | Precio en dólares del activo           |
| status            | boolean    | No            | Define si la moneda está activa o no   |
| maxSupply         | double     | No            | Define la cantidad máxima en el mercado|
| tradingVolumeUsd  | double     | No            | Cantidad de transacciones en las últimas 24 horas|

Modeulo de respuesta:
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": {
        "status": true,
        "type": "crypto",
        "createdAt": "2020-08-08T21:06:19.582Z",
        "updatedAt": "2020-08-08T21:06:19.582Z",
        "id": 7,
        "name": "guttycoin",
        "symbol": "GTC",
        "priceUsd": 100.01,
        "tradingVolumeUsd": null,
        "maxSupply": null
    }
}
```

**Veamos los activos creados:**
> `http://localhost/api/currencies` <br>
`GET`

Modelo de respuesta: <br>
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": [
        {
            "id": 7,
            "name": "guttycoin",
            "symbol": "GTC",
            "priceUsd": 100.01,
            "status": true,
            "tradingVolumeUsd": null,
            "maxSupply": null,
            "type": "crypto",
            "createdAt": "2020-08-08T21:06:19.582Z",
            "updatedAt": "2020-08-08T21:06:19.582Z"
        }
    ]
}
```

**Actualicemos los activos:** <br>
Podemos modificar todos los valores del activo:
`name, symbol, priceUsd, status, tradingVolumeUsd, maxSupply` <br>
El `id` como parámetro de URL debe coincidir con su valir en la base
de datos.
> `http://localhost/api/currencies/{id}` <br>
`PUT`

Modelo de solicitud:
```
{
    "name": "bitcoin2",
    "symbol": "BTC2",
    "priceUsd": 1154893.8798
}
```

Modelo de respuesta:
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": {
        "id": 1,
        "name": "bitcoin2",
        "symbol": "BTC2",
        "priceUsd": 1154893.8798,
        "status": true,
        "tradingVolumeUsd": 4508192300.42873,
        "maxSupply": 21000000,
        "type": "crypto",
        "createdAt": "2020-08-08T20:26:20.963Z",
        "updatedAt": "2020-08-08T20:26:20.963Z"
    }
}
```

**¿Y si solo quiero actualiar el precio?** <br>
El `id` como parámetro de URL debe coincidir con su valir en la base
de datos.
> `http://localhost/api/currencies/price/{id}` <br>
`PATCH`

Modelo de solicitud:
```
{
    "priceUsd": 11000
}
```
Modelo de respuesta:
```
{
    "rc": 0,
    "msg": "Process OK",
    "bean": {
        "id": 1,
        "name": "bitcoin",
        "symbol": "BTC",
        "priceUsd": 11000,
        "status": true,
        "tradingVolumeUsd": 4508192300.42873,
        "maxSupply": 21000000,
        "type": "crypto",
        "createdAt": "2020-08-08T20:26:20.963Z",
        "updatedAt": "2020-08-08T20:26:20.963Z"
    }
}
```
