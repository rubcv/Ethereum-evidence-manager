// ORACLE

    //   app (Server)
    //     🡇
    //   Client
    //     🡇
    //   ethereum (Smart Contract)
    //     🡇
    // ➤ Oracle


const request = require("request-promise-native");
const ethereum = require("./ethereum");
const utf8 = require('utf8');


// ethereum.web3.eth.defaultAccount = ethereum.web3.eth.accounts[0]; // Añadir cuenta por defecto
const account_to_use = 1; // Cuenta para usar con el Oracle
const TIMEOUT = 10000;


var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = web3.eth.accounts[account_to_use]; // Añadir cuenta por defecto




var sha256 = require('js-sha256'); // Necesario instalar paquete sha256



var obtenerDatosDeURL = function (callback) {

    return new Promise(function(resolve, reject){
    
            ethereum.account(account_to_use).then(function(){ 
                resolve(
                    callback(ethereum.contract.obtenerDatosDeURL) // Con el callback nos suscribimos al event
                );  
            }).catch(error => reject(error));
                
    }).catch(function(error){
        console.log(error);
    });
};


// Inicio del Oracle
module.exports.startOracle = function (urlFormulario) {

    const options = {
        uri: urlFormulario,
        getURL : function(){
            return this.uri;
        }
    };

    obtenerDatosDeURL(function (res, error) { // Nos suscribimos al event obtenerDatosDeURL
        if (error) {
            console.log(error);
        } else {
            obtenerDatosCallback(options); // Iniciamos el servicio
        }
    });
    // Escucha al evento obtenerDatosDeURL
    // cuando llega ejecutar callback obtenerDatosCallback
    // callback para obtenerDatosDeURL
}

function obtenerDatosCallback(options){

    return request(options)
        .then(parseData)
        .then(guardarSolicitud) // La funcion del Smart Contract que solo puede ejecutar el Oracle
       // .then(restart)
        .catch(error);
};


// TRANSACCION
var guardarSolicitud = function({ datosJSON }) {
    

    return new Promise(function(resolve, reject) { 
        
        // Con el JSON guardado previamente
        // Asignamos los demas datos y guardamos toda a solicitud

        // TIMESTAMP
        let fecha = (new Date()).getTime(); // Fecha en formato normal
        let fecha_unix = fecha / 1000; // Fecha en formato unix
    
        // DATOS JSON
        var datos = JSON.stringify(datosJSON);

        // VERSION
        var version = 1;

                
        ethereum.contract.guardarSolicitud(fecha_unix, datos, version), (err, res) => {
            resolve(res);
        }        

    }).catch(function(error){
        console.log(error);
    });
};


// Este JSON se puede actualizar con las diferentes versiones
function obtenerJSON(data){
    var datosJSON = {
        "Web" : obtenerWeb(data),
        "HASH" : sha256(data)
    }

    return datosJSON;
}

function obtenerWeb(data){
    var title = data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    return title;
}

var parseData = function (body) {

    return new Promise((resolve, reject) => {
        
        var datosJSON = '';
        try {

            // Devolvemos el JSON correspondiente a la actual version
            datosJSON = obtenerJSON(body);
          
        } catch (error) {
            reject(error);
            return;
        }
        
        resolve({
            datosJSON
        });
    }).catch(function(error){
        console.log(error);
    });
};


var restart = function(){
    return wait(TIMEOUT).then(startOracle).catch(function(error){
        console.log(error);
    });
};

var wait = function(milliseconds){
    return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds))
        .catch(function(error){
            console.log(error);
        });
};

var error = function(error){
    console.error(error);
    restart().catch(function(error){
        console.log(error);
    });
};
