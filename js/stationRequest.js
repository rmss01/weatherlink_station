// Inicializar las variables globales
let datos; // Json de los datos metereológicos de la estación seleccionada

let estaciones; // Json de la lista de estaciones registradas

// Función que regresa los datos metereológicos de una estación mediante una petición al servidor proxy
async function obtenerJSON(stationID) {
   
    const archivo = "http://localhost:3003/stations/" + stationID; // ruta endpoint de la estacion seleccionada

    const resultado = await fetch(archivo); // Fetch a la API
    datos = await resultado.json(); // El resultado lo guarda en datos en formato Json

    return datos; // Retorna el Json con los datos metereológicos

    
}

// Función que regresa la lista de estaciones metereológicas registradas en el sitio web de WeatherLink mediante una petición al servidor proxy
async function obtenerEstaciones() {
    const archivo = 'http://localhost:3003/stations'; // ruta endpoint para obtener las estaciones
    const resultado = await fetch(archivo); // Fetch a la API

    estaciones = await resultado.json(); // El resultado lo guarda en estaciónes en formato Json
    

    return estaciones; // Retorna el Json con la lista de estaciónes
}



// Exportar las funciones que requieren los otros recursos

export { obtenerEstaciones };

export { obtenerJSON };


