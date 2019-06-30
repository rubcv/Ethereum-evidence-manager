# Diseño e implementación de un entorno de gestión forense basado en Blockchain

### Requisitos:
* Sistema operativo Linux (Desarrollado sobre Kali Linux 2019.2)
* Google Chrome
* Extensión **Metamask** para Google Chrome. (https://metamask.io/)
* **Truffle** (https://www.trufflesuite.com/)
* **Ganache-GUI** (https://eattheblocks.com/installing-the-the-ganache-gui-episode-13/)
* **npm** y **NodeJS**

#### Paquetes necesarios con npm:
* npm install --save request
* npm install --save request-promise
* npm install -g js-sha256
* npm install -g ethereumjs-testrpc (Hacer pruebas sin GUI)
* npm install -g ganache-cli (Hacer pruebas sin GUI)
* npm install -g web3
* npm install -g web3-providers-http
* npm install -g json-parser

Para el servidor web:
* npm install -g express
* npm install -g body-parser

### Para ejecutar:

* Dirigirse al directorio SRC con la terminal
* Ejecutar ./recompile.sh <br>
&nbsp;&nbsp;&nbsp;&nbsp; recompile.sh: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;> rm -r -d build <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;> truffle compile <br>
Este comando compila los contratos del directorio **contracts** con **Truffle** <br>
 * Ejecutar Ganache-GUI
 * Abrir el proyecto .../SRC/**truffle-config.js** con **Ganache-GUI** <br>
 Ejecutar: <br>
 * $ truffle developer
 * $ truffle(developer)> migrate <br>
Con estos comandos migramos los contratos a la red de **Ganache** <br>
 * $ node app.js <br>
 Con este comando ejecutamos el servidor <br>
&nbsp;&nbsp;&nbsp;&nbsp;> node app.js <br>
* Dirigirse a un navegador Chrome con Metamask instalado: <br>
&nbsp;&nbsp;&nbsp;&nbsp;> localhost:8888 <br>
* Guardar la evidencia deseada, podremos ver el resultado de la transacción con **Metamask** y el resultado del guardado con **Ganache**
