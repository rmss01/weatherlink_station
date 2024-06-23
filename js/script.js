// Importar el metodo obtenerJSON
import { obtenerJSON } from "./stationRequest.js";

// Función que convierte velocidad a un angulo
function speedToAngle(speed) {
    // Supongamos que el rango de velocidad es de 0 a 200 km/h y el rango de ángulo es de -90 a 90 grados
    const minSpeed = 0;
    const maxSpeed = 200;
    const minAngle = -90;
    const maxAngle = 90;

    // Conversión lineal de velocidad a ángulo
    return ((speed - minSpeed) / (maxSpeed - minSpeed)) * (maxAngle - minAngle) + minAngle;
}

// Función que actualiza la aguja del speedometro de la velocidad del viento
function updateSpeed(speed) {
    const needle = document.querySelector('.speedometer .needle'); // Inicializa la aguja desde el documento
    const angle = speedToAngle(speed); // Guarda en angle la conversión de velocidad a ángulo
    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`; // Transforma y rota la aguja de acuerdo al ángulo

    // Agregar marcas de velocidad
    const marksContainer = document.querySelector('.speedometer'); // Inicializa el speedometro desde el documento
    const marks = marksContainer.querySelectorAll('.speedometer-mark'); // Inicializa las marcas desde el documento
    marks.forEach(mark => mark.remove()); // Limpiar las marcas anteriores

    // Mostrar marcas cada 10 km/h
    for (let i = -9; i <= 10; i++) { 
        const mark = document.createElement('div'); // Inicializa un div para la marca
        mark.classList.add('speedometer-mark'); // le asigna la clase speedometer-mark
        const markAngle = i * 10; // Calcular el ángulo para cada marca
        const markPositionX = Math.sin((markAngle * Math.PI) / 180) * 50 + 50; // Convertir coordenadas polares a coordenadas cartesianas
        const markPositionY = Math.cos((markAngle * Math.PI) / 180) * 50 * 2; // Utilizamos 50 como radio para el semicírculo
        mark.style.transform = `rotate(${markAngle}deg) translate(-50%, 100%)`; // Reordenar las transformaciones
        mark.style.left = `${markPositionX}%`; // Aplicar posición horizontal
        mark.style.bottom = `${markPositionY}%`; // Aplicar posición vertical
        marksContainer.appendChild(mark); // Agrega la marca al speedometro
    }

    // Agrega el valor numérico al speedometro
    const value = document.querySelector('.vel_value');
    value.textContent = speed + " km/h";
}

// Función que actualiza la rosa de los vientos
function updateWindRose(windDirection) {
    // Convierte el valor del ángulo del viento a una dirección cardinal
    const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(windDirection / 45) % 8; // Convierte el ángulo en una dirección cardinal

    // Para cada una de las 8 posiciones de la rosa se le asigna un símbolo cardinal con ayuda de index, concatenando + 1 cada vez
    const roseMark1 = document.querySelector('.rose_mark_1');
    roseMark1.textContent = cardinalDirections[(index)];

    const roseMark2 = document.querySelector('.rose_mark_2');
    roseMark2.textContent = cardinalDirections[(index + 1)];

    const roseMark3 = document.querySelector('.rose_mark_3');
    roseMark3.textContent = cardinalDirections[(index + 2)];

    const roseMark4 = document.querySelector('.rose_mark_4');
    roseMark4.textContent = cardinalDirections[(index + 3)];

    const roseMark5 = document.querySelector('.rose_mark_5');
    roseMark5.textContent = cardinalDirections[(index + 4)];

    const roseMark6 = document.querySelector('.rose_mark_6');
    roseMark6.textContent = cardinalDirections[(index + 5)];

    const roseMark7 = document.querySelector('.rose_mark_7');
    roseMark7.textContent = cardinalDirections[(index + 6)];

    const roseMark8 = document.querySelector('.rose_mark_8');
    roseMark8.textContent = cardinalDirections[(index + 7)];

    // Agrega el valor numérico en grados a la rosa de los vientos
    const value = document.querySelector('.dir_value');
    value.textContent = windDirection + " grados";

}

// Función que convierte grados Fahrenheit a Celcius
function fahrenheitToCelcius(temp){
    return ((temp - 32)*(5/9)).toFixed(2);
}

// Función que actualiza la altura de las barras de temperatura
function updateTemperatureBars(tempIn, tempOut) {
    // Convierte grados F a C
    const celciusIn = fahrenheitToCelcius(tempIn); // Temperatura interior
    const celciusOut = fahrenheitToCelcius(tempOut); // Temperatura exterior
    // Normaliza los valores de temperatura para que se ajusten a la longitud de la barra
    const maxTemp = 40; // Supongamos que la temperatura máxima es de 40 grados Celcius
    const minTemp = -20; // Supongamos que la temperatura mínima es de -20 grados Celcius
    // Ajusta la altura de las barras para que se ajusten a su contenedor visualmente
    const normalizedTempIn = (celciusIn / maxTemp) * 67 + Math.abs(minTemp)+14;
    const normalizedTempOut = (celciusOut / maxTemp) * 67 + Math.abs(minTemp)+14;
    
    const indoorBar = document.querySelector('.indoor-bar'); // Inicializa la barra de temp. interior en el documento
    indoorBar.style.height = `${normalizedTempIn}%`; // Asigna altura a la barra

    const outdoorBar = document.querySelector('.outdoor-bar'); // Inicializa la barra de temp. interior en el documento
    outdoorBar.style.height = `${normalizedTempOut}%`; // Asigna altura a la barra

    // Agrega los valores numéricos de temperatura a las barras
    const valueIN = document.querySelector('.temp_in_value'); // Inicializa al valor en el documento
    valueIN.style.bottom = `${normalizedTempIn}%`; // Ajusta la altura del valor para sincronizarlo con la barra
    valueIN.textContent = celciusIn + " °C"; // Asigna el valor de temperatura interior al div de valor
    const valueOUT = document.querySelector('.temp_out_value'); // Inicializa al valor en el documento
    valueOUT.style.bottom = `${normalizedTempOut}%`; // Ajusta la altura del valor para sincronizarlo con la barra
    valueOUT.textContent = celciusOut + " °C"; // Asigna el valor de temperatura exterior al div de valor

    // Cambia el color de las barras en función de la temperatura
    if(celciusIn < 0){
        indoorBar.style.backgroundColor = "#663399";
    }else if(celciusIn >= 0 && celciusIn < 15){
        indoorBar.style.backgroundColor = "#0099FF";
    }else if(celciusIn >= 15 && celciusIn < 22){
        indoorBar.style.backgroundColor = "#55B4B0";
    }else if(celciusIn >= 22 && celciusIn < 25){
        indoorBar.style.backgroundColor = "#00DD00";
    }else if(celciusIn >= 25 && celciusIn < 28){
        indoorBar.style.backgroundColor = "#ffdb00";
    }else if(celciusIn >= 28 && celciusIn < 32){
        indoorBar.style.backgroundColor = "orange";
    }else if(celciusIn >= 32){
        indoorBar.style.backgroundColor = "red";
    }
    if(celciusOut < 0){
        outdoorBar.style.backgroundColor = "#663399";
    }else if(celciusOut >= 0 && celciusIn < 15){
        outdoorBar.style.backgroundColor = "#0099FF";
    }else if(celciusOut >= 15 && celciusIn < 22){
        outdoorBar.style.backgroundColor = "#55B4B0";
    }else if(celciusOut >= 22 && celciusIn < 25){
        outdoorBar.style.backgroundColor = "#00DD00";
    }else if(celciusOut >= 25 && celciusIn < 28){
        outdoorBar.style.backgroundColor = "#ffdb00";
    }else if(celciusOut >= 28 && celciusIn < 32){
        outdoorBar.style.backgroundColor = "orange";
    }else if(celciusOut >= 32){
        outdoorBar.style.backgroundColor = "red";
    }
}

// Función que actualiza las barras delluvia
function updateRainBars(rainDay, rainStorm, rainRate) {
    // Normaliza los valores de lluvia para que se ajusten a la longitud de la barra
    const maxRain = 50; // Supongamos que la cantidad máxima de lluvia es de 50 mm
    const normalizedRainDay = (rainDay / maxRain) * 100; // al día
    const normalizedRainStorm = (rainStorm / maxRain) * 100; // de tormenta
    const normalizedRainRate = (rainRate / maxRain) * 100; // taza de lluvia

    const dayBar = document.querySelector('.rain-day-bar'); // Inicializa la barra de día en el documento
    dayBar.style.height = `${normalizedRainDay}%`; // Ajusta la altura de la barra

    const stormBar = document.querySelector('.rain-storm-bar'); // Inicializa la barra de tormenta en el documento
    stormBar.style.height = `${normalizedRainStorm}%`; // Ajusta la altura de la barra

    const rateBar = document.querySelector('.rain-rate-bar'); // Inicializa la barra de la taza de lluvia en el documento
    rateBar.style.height = `${normalizedRainRate}%`; // Ajusta la altura de la barra

    // Agrega los valores de la lluvia a cada barra respectivamente
    const valueDay = document.querySelector('.rain_day_value'); // Inicializa el div del valor en el documento
    valueDay.style.bottom = `${normalizedRainDay}%`; // Ajusta la altura del div para sincronizarlo con la barra
    valueDay.textContent = rainDay + " mm"; // Le agrega el texto al div

    const valueStorm = document.querySelector('.rain_storm_value'); // Inicializa el div del valor en el documento
    valueStorm.style.bottom = `${normalizedRainStorm}%`;// Ajusta la altura del div del valor para sincronizarlo con la barra
    valueStorm.textContent = rainStorm + " mm"; // Le agrega el texto al div

    const valueRate = document.querySelector('.rain_rate_value'); // Inicializa el div del valor en el documento
    valueRate.style.bottom = `${normalizedRainRate}%`;// Ajusta la altura del dive del valor para sincronizarlo con la barra
    valueRate.textContent = rainRate + " mm"; // Le agrega el texto al div
}
// Función que convierte el nivel de humedad en un angulo
function humToAngle(humidity) {
    // Supongamos que el rango de humedad es de 0 a 20 y el rango de ángulo es de -90 a 90 grados
    const minHum = 0; // humedad mínima
    const maxHum = 100; // humedad máxima
    const minAngle = -90;
    const maxAngle = 90;

    // Conversión lineal de velocidad a ángulo
    return ((humidity - minHum) / (maxHum - minHum)) * (maxAngle - minAngle) + minAngle;
}

// Función que actualiza el medidor de temperatura
function updateHumidityGauge(humidity) {
    const needle = document.querySelector('.humidity_gauge .needle'); // Inicializa el div de la aguja del medidor en el documento
    const angle = humToAngle(humidity); // Convierte el nivel de humedad en un ángulo llamando a la función humToAngle
    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`; // Transforma y rota la aguja de acuerdo al ángulo

    // Agregar marcas al medidor
    const marksContainer = document.querySelector('.humidity_gauge'); // Inicializa el div del contenedor del medidor en el documento
    const marks = marksContainer.querySelectorAll('.hum-mark'); // Inicializa el div de las marcas en el documento
    marks.forEach(mark => mark.remove()); // Limpiar las marcas anteriores

    // Mostrar marcas del medidor humedad
    for (let i = -8; i <= 10; i++) { 
        const mark = document.createElement('div'); // Se crea el div de la marca
        mark.classList.add('hum-mark'); // Se le da la clase 'hum-mark'
        const markAngle = i * 18; // Calcular el ángulo para cada marca
        const markPositionX = Math.sin((markAngle * Math.PI) / 180) * 50 + 50; // Convertir coordenadas polares a coordenadas cartesianas
        const markPositionY = Math.cos((markAngle * Math.PI) / 180) * 50 * 2; // Utilizamos 50 como radio para el semicírculo
        mark.style.transform = `rotate(${markAngle}deg) translate(-50%, 100%)`; // Reordenar las transformaciones
        mark.style.left = `${markPositionX}%`; // Aplicar posición horizontal
        mark.style.bottom = `${markPositionY}%`; // Aplicar posición vertical
        marksContainer.appendChild(mark); // Agrega las marcas al contenedor
    }

    // Agrega el valor de la humedad debajo del medidor
    const value = document.querySelector('.hum_value');
    value.textContent = humidity + "%";
}

// Función que actualiza el diagrama de radiación solar
function updateSolarRadiationGauge(solarRad) {
    // Normaliza el valor de radiación solar para que se ajuste a la longitud del medidor
    const maxSolarRad = 6000; // Supongamos que la radiación solar máxima es de 1000 W/m^2
    const normalizedSolarRad = (solarRad / maxSolarRad) * 150 + 100; // Longitud de los rayos normalizada
    

    // Agregar rayos al sol
    const marksContainer = document.querySelector('.sun'); // Inicializa el contenedor de los rayos del sol en el documento
    
    // Muestra 8 rayos
    for (let i = 0; i < 8; i++) { 
        const rays = document.querySelectorAll('.ray'); // Inicializa los rayos en el contenedor
        
        // Se le asigna en largo normalizado a los rayos para que se ajusten visualmente
        rays.forEach(ray => 
            (ray.style.height = `${normalizedSolarRad}%`)); // 
    }

    // Agrega el valor de la radiación solar al dibujo
    const value = document.querySelector('.solar_rad_value'); 
    value.textContent = solarRad + " W/h";
}

// Función que actualiza el índice uv
function updateUVIndexGauge(uvIndex) {
    // Normaliza el valor del índice UV para que se ajuste a la longitud del medidor
    const maxUVIndex = 10; // Supongamos que el índice UV máximo es de 10
    const normalizedUVIndex = (uvIndex / maxUVIndex) * 100; // Valor normalizado

    const uvBar = document.querySelector('.uv_index_gauge .bar'); // Inicializa la barra de uv en el documento
    uvBar.style.height = `${normalizedUVIndex}%`; // Se ajusta la altura de la barra
    
    // Agrega los valores numéricos de temperatura a las barras
    const uvValue = document.querySelector('.uv_value'); // Inicializa el div del valor en el documento
    uvValue.style.bottom = `${normalizedUVIndex}%`; // Se ajusta a la misma altura de la barra
    uvValue.textContent = uvIndex; // Se escribe el valor en el div

    // El color de la barra cambia de acuerdo a la intensidad de uv
    if (uvIndex >= 0 && uvIndex < 3){
        uvBar.style.backgroundColor = "#00DD00";
    } else if(uvIndex >= 3 && uvIndex < 6){
        uvBar.style.backgroundColor = "#ffdb00";
    } else if(uvIndex >= 6 && uvIndex < 8){
        uvBar.style.backgroundColor = "orange";
    } else if(uvIndex >= 8 && uvIndex < 11){
        uvBar.style.backgroundColor = "red";
    } else {
        uvBar.style.backgroundColor = "#663399";
    }
}

// Espera a que obtenerJSON responda
async function waitData(stationID) {
    const datos = await obtenerJSON(stationID);

    // Actualizar la velocidad del viento
    let windSpeed = datos['sensors'][0]['data'][0]['wind_speed'];
    updateSpeed(windSpeed);

    // Actualizar la rosa de los vientos
    let windDirection = datos['sensors'][0]['data'][0]['wind_dir'];
    updateWindRose(windDirection);

    // Actualizar las barras de temperatura
    let tempIn = datos['sensors'][0]['data'][0]['temp_in'];
    let tempOut = datos['sensors'][0]['data'][0]['temp_out'];
    updateTemperatureBars(tempIn, tempOut);

    // Actualizar las barras de lluvia
    let rainDay = datos['sensors'][0]['data'][0]['rain_day_mm'];
    let rainStorm = datos['sensors'][0]['data'][0]['rain_storm_mm'];
    let rainRate = datos['sensors'][0]['data'][0]['rain_rate_mm'];
    updateRainBars(rainDay, rainStorm, rainRate);

    // Actualizar el medidor de humedad
    let humidity = datos['sensors'][0]['data'][0]['hum_out'];
    updateHumidityGauge(humidity);

    // Actualizar el medidor de radiación solar
    let solarRad = datos['sensors'][0]['data'][0]['solar_rad'];
    updateSolarRadiationGauge(solarRad);

    // Actualizar el medidor de índice UV
    let uvIndex = datos['sensors'][0]['data'][0]['uv'];
    updateUVIndexGauge(5);
    
}

export {waitData}; // Exporta la función que necesita esperar a que carguen los datos para desencadenar las otras funciones
