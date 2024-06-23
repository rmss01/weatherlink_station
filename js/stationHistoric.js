// Prueba de obtencion de data histórica
// NO FUNCIONA
async function historica(station, startTimestamp, endTimestamp){
    const archivo = `http://localhost:3003/stations/historic/${station}&${startTimestamp}&${endTimestamp}`;
    const resultado = await fetch(archivo);

    let historic = await resultado.json();

    return historic;
}

$(document).ready(async function () {
    
    var end = Math.floor(Date.now() / 1000);
    var start = end - 86400;
    const historic = await historica(178073, start, end);
    console.log(historic);
});