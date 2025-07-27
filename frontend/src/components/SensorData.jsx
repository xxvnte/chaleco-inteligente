import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getSensorDataByUserId } from "../hooks/useSensor";
import {
  calcularPromedios,
  calcularEstadisticasGPS,
} from "../utils/calculationUtil";

const SensorData = () => {
  const { userId, getAuthHeaders } = useAuth();
  const { userId: paramUserId } = useParams();
  const [usuarioData, setUsuarioData] = useState({});
  const [saludData, setSaludData] = useState([]);
  const [gpsData, setGpsData] = useState([]);
  const [caloriasPorFecha, setCaloriasPorFecha] = useState({});
  const [gpsStatsPorFecha, setGpsStatsPorFecha] = useState({});
  const [promedios, setPromedios] = useState({ frecuencia: 0, oximetro: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (parseInt(paramUserId, 10) !== parseInt(userId, 10)) {
        navigate("/login");
        return;
      }

      try {
        const headers = getAuthHeaders();
        const response = await getSensorDataByUserId(userId, headers);

        setUsuarioData(response.sensorData.user);
        setSaludData(response.sensorData.saludData);
        setGpsData(response.sensorData.gpsData);

        setPromedios({
          frecuencia: calcularPromedios(response.sensorData.saludData)
            .frecuencia,
          oximetro: calcularPromedios(response.sensorData.saludData).oximetro,
        });

        const { caloriasPorFecha, gpsStatsPorFecha } = calcularEstadisticasGPS(
          response.sensorData.gpsData,
          response.sensorData.user
        );

        setCaloriasPorFecha(caloriasPorFecha);
        setGpsStatsPorFecha(gpsStatsPorFecha);
      } catch (error) {
        console.error("Error loading data:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [paramUserId, userId, navigate]);

  return (
    <div className="py-20">
      <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md max-w-5xl">
        <div className="header text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Chaleco Inteligente
          </h1>
        </div>

        <div className="info">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Datos de Frecuencia Cardíaca y Oxímetro
          </h2>
          <div id="saludData">
            <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Frecuencia Cardíaca</th>
                  <th className="p-2 text-left">Oxímetro</th>
                  <th className="p-2 text-left">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {saludData.slice(-4).map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-2">{data.frecuencia_cardiaca}</td>
                    <td className="p-2">{data.oximetro}</td>
                    <td className="p-2">{data.tiempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 text-left"> </th>
                    <th className="p-2 text-left">Promedio Actual</th>
                    <th className="p-2 text-left">Promedio Sano</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Frecuencia Cardíaca</td>
                    <td className="p-2 text-left">
                      {promedios.frecuencia.toFixed(2)}
                    </td>
                    <td className="p-2 text-left">60-100 latidos por minuto</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Oxímetro</td>
                    <td className="p-2 text-left">
                      {promedios.oximetro.toFixed(2)}%
                    </td>
                    <td className="p-2 text-left">95-100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="gps-data mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Estadísticas GPS
            </h2>
            <div>
              <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 text-left text-sm sm:text-base">
                      Fecha
                    </th>
                    <th className="p-2 text-left text-sm sm:text-base">
                      Tiempo (min)
                    </th>
                    <th className="p-2 text-left text-sm sm:text-base">
                      Distancia (m)
                    </th>
                    <th className="p-2 text-left text-sm sm:text-base">
                      Velocidad (km/h)
                    </th>
                    <th className="p-2 text-left text-sm sm:text-base">
                      Calorías quemadas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(gpsStatsPorFecha).map(([fecha, stats]) => (
                    <tr key={fecha} className="border-b hover:bg-gray-100">
                      <td className="p-2 text-sm sm:text-base">{fecha}</td>
                      <td className="p-2 text-sm sm:text-base">
                        {stats.tiempo.toFixed(2)}
                      </td>
                      <td className="p-2 text-sm sm:text-base">
                        {stats.distancia.toFixed(2)}
                      </td>
                      <td className="p-2 text-sm sm:text-base">
                        {stats.velocidad.toFixed(2)}
                      </td>
                      <td className="p-2 text-sm sm:text-base">
                        {caloriasPorFecha[fecha]?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorData;
