import { obtenerEstaciones } from "./stationRequest.js";
import { waitData } from "./script.js";

// Función que agrega a la lista desplegables las estaciones registradas desde WeatherLink
async function waitStations(){

    const stationsContainer = document.getElementById('select'); // Inicializa el 'select' en el documento
    //const stations = stationsContainer.querySelectorAll('option');
    //stations.forEach(station => station.remove()); //Eliminar las estaciones anteriores
   
    const stationsListJSON = await obtenerEstaciones(); // Manda a llamar la funcion que concume la api para obtener las estaciónes
    // Cada estación de la lista de estaciónes se agrega a la lista desplegable
    stationsListJSON.stations.forEach(station => {
        const newStation = document.createElement('option'); // Inicializa el 'option' de cada elemento
        newStation.value = station.station_id; // Al valor de la 'option' se le agrega el id de la estación
        newStation.textContent = station.station_name; // Al texto de la 'option' se le agrega el nombre de la estación
        stationsContainer.appendChild(newStation);
    });
}

// Al cargar la página primero se llama a la función waitStations
window.addEventListener("load", async()=>{
    waitStations();
})


let stationID; // Letiable que guarda el id de la estación que se va a cargar
let reloadData; // Letiable que ayudará a crear el intervalo de recargar los datos metereológicos
var stationSelector = document.getElementById('select'); // Inicializa la lista desplegable 'select' del documento

// Event listener para cuando cambie la selección de la lista
stationSelector.addEventListener('change', function () {
    var selectedOption = this.options[stationSelector.selectedIndex]; // Guarda la nueva selección en selectedOption
    stationID = selectedOption.value; // stationID guardará el valor de la 'option'
    // console.log(stationID);
    clearInterval(reloadData); // Inicia el contador del intervalo de reloadData
    waitData(stationID); // Manda a llamar la función para recargar los datos
    reloadData = setInterval(waitData, 5000, stationID); // El intervalo de recarga es de 5000 milisegundos
})

export { stationID } // Exportar el id de la estación seleccionada para uso de los demás recursos