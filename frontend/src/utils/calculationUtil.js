export const calcularPromedios = (saludData) => {
  const sumaFrecuenciaCardiaca = saludData.reduce(
    (acc, curr) => acc + parseFloat(curr.frecuencia_cardiaca || 0),
    0
  );
  const sumaOximetro = saludData.reduce(
    (acc, curr) => acc + parseFloat(curr.oximetro || 0),
    0
  );

  const promedioFrecuenciaCardiaca =
    saludData.length > 0 ? sumaFrecuenciaCardiaca / saludData.length : 0;
  const promedioOximetro =
    saludData.length > 0 ? sumaOximetro / saludData.length : 0;

  return {
    frecuencia: promedioFrecuenciaCardiaca,
    oximetro: promedioOximetro,
  };
};

export const calcularEstadisticasGPS = (gpsDataProvided, usuarioData) => {
  const gpsDataPorFecha = {};
  gpsDataProvided.forEach((data) => {
    const fecha = data.fecha.split("T")[0];
    if (!gpsDataPorFecha[fecha]) {
      gpsDataPorFecha[fecha] = [];
    }
    gpsDataPorFecha[fecha].push(data);
  });

  const nuevasCaloriasPorFecha = {};
  const nuevasGpsStatsPorFecha = {};

  Object.keys(gpsDataPorFecha).forEach((fecha) => {
    const gpsData = gpsDataPorFecha[fecha];
    let distanciaTotal = 0;
    let tiempoTotal = 0;
    let ubicacionAnterior = {
      latitud: parseFloat(gpsData[0].latitud),
      longitud: parseFloat(gpsData[0].longitud),
    };

    for (let i = 1; i < gpsData.length; i++) {
      const ubicacionActual = {
        latitud: parseFloat(gpsData[i].latitud),
        longitud: parseFloat(gpsData[i].longitud),
      };
      const tiempoActual = new Date(
        `1970-01-01T${gpsData[i].tiempo}Z`
      ).getTime();
      const tiempoAnterior = new Date(
        `1970-01-01T${gpsData[i - 1].tiempo}Z`
      ).getTime();
      const tiempo = (tiempoActual - tiempoAnterior) / 1000;
      const distancia =
        calcularDistancia(ubicacionAnterior, ubicacionActual) * 1000;
      distanciaTotal += distancia;
      tiempoTotal += tiempo;
      ubicacionAnterior = ubicacionActual;
    }

    const tiempoTotalMinutos = tiempoTotal / 60;
    const velocidadMedia =
      tiempoTotal > 0 ? (distanciaTotal / tiempoTotal) * 3.6 : 0;
    const METs = 1.5 + velocidadMedia * 0.2;

    const pesoUsuario = parseFloat(usuarioData.peso);

    if (!isNaN(pesoUsuario)) {
      const calorias = METs * pesoUsuario * (tiempoTotal / 3600);
      nuevasCaloriasPorFecha[fecha] = !isNaN(calorias) ? calorias : 0;
    } else {
      nuevasCaloriasPorFecha[fecha] = 0;
      console.warn(`Peso del usuario no definido para la fecha: ${fecha}`);
    }

    nuevasGpsStatsPorFecha[fecha] = {
      tiempo: tiempoTotalMinutos,
      distancia: distanciaTotal,
      velocidad: velocidadMedia,
    };
  });

  return {
    caloriasPorFecha: nuevasCaloriasPorFecha,
    gpsStatsPorFecha: nuevasGpsStatsPorFecha,
  };
};

const calcularDistancia = (punto1, punto2) => {
  const R = 6371; // radio de la tierra en km
  const dLat = (punto2.latitud - punto1.latitud) * (Math.PI / 180);
  const dLon = (punto2.longitud - punto1.longitud) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(punto1.latitud * (Math.PI / 180)) *
      Math.cos(punto2.latitud * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c;
  return distancia;
};
