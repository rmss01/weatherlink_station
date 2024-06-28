# weatherlink_station
### This is a web page for Universidad Politécnica de Tulancingo that request for the university's meteorological data using the Davis Instruments Weatherlink API V2.
### The page needs a proxy server to work --> rmss01/weatherlink_proxy

# Documentación Weatherstation (spanish)

## Introducción

Este trabajo se realizó como proyecto de servicio social. La petición se planteó como un sistema que tomara los datos de las estaciones meteorológicas de la Universidad Politécnica de Tulancingo y las presentara en una página web u otro medio, para acceder a ellos de forma remota.

Aquí se presentan aspectos técnicos necesarios para continuar desarrollando o modificar el proyecto: lenguajes de programación, sistema de gestión de paquetes, entorno en tiempo de ejecución, librerías necesarias y directorios del proyecto.

## Lenguajes de programación

- **JavaScript**: Servidor proxy (backend) y página web (frontend).
- **HTML**: Estructura básica de la interfaz de usuario de la página web (frontend).
- **CSS**: Estilos para el diseño de la página web.

## NPM (Sistema de gestión de paquetes)

Permite instalar los paquetes necesarios para el servidor.

## NodeJS (Entorno en tiempo de ejecución)

El servidor proxy se ejecuta en NodeJS.

## Librerías / paquetes

El servidor proxy ocupa las siguientes librerías:

- `node-fetch@2`: `npm install –save node-fetch@2`
- `express`: `npm install –save express`
- `fs`: `npm install –save fs`
- `path`: `npm install –save path`

## Directorios

### Servidor proxy

| Mode | LastWriteTime | Length | Name | Description |
| ---- | ------------- | ------ | ---- | ----------- |
| da---l | 26/06/2024 09:44 p. m. | | dirHistorica | Almacena los archivos Json de los datos históricos |
| da---l | 26/06/2024 12:16 a. m. | | node_modules | |
| -a---l | 26/06/2024 08:03 p. m. | 31 | .gitignore | Archivo para que git ignore los archivos que no necesitan control de versiones: dirHistorica |
| -a---l | 26/06/2024 12:16 a. m. | 44078 | package-lock.json | |
| -a---l | 26/06/2024 12:16 a. m. | 375 | package.json | |
| -a---l | 27/06/2024 01:21 a. m. | 5878 | proxy.js | |
| -a---l | 26/06/2024 03:10 a. m. | 321 | README.md | |

### Página web

| Mode | LastWriteTime | Length | Name | Description |
| ---- | ------------- | ------ | ---- | ----------- |
| da---l | 18/03/2024 09:40 p. m. | | css | Estilos |
| da---l | 22/06/2024 07:47 p. m. | | js | Archivos js |
| -a---l | 26/06/2024 01:21 p. m. | 2716 | history.html | Página de datos históricos |
| -a---l | 26/06/2024 11:53 p. m. | 7747 | index.html | Página principal |
| -a---l | 22/06/2024 08:34 p. m. | 264 | README.md | |

---
