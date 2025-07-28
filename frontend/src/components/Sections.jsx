import heartIcon from "../assets/heart.svg";
import gpsIcon from "../assets/gps.svg";
import emergencyButtonIcon from "../assets/emergencyButton.svg";
import oximeterIcon from "../assets/oximeter.svg";

export const Home = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 py-16 px-6">
      <div className="relative z-10 text-left max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Bienvenido</h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Nuestro chaleco inteligente está diseñado para mejorar tu experiencia
          y seguridad mientras practicas ciclismo. Con tecnología avanzada,
          monitorea tu salud, rastrea tu ubicación y te mantiene conectado en
          todo momento.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-4">
            <img src={heartIcon} alt="Icono" className="h-6 w-6" />
            <p className="text-gray-700">Monitor de Frecuencia Cardiaca</p>
          </div>
          <div className="flex items-center space-x-4">
            <img src={gpsIcon} alt="Icono" className="h-6 w-6" />
            <p className="text-gray-700">GPS</p>
          </div>
          <div className="flex items-center space-x-4">
            <img src={emergencyButtonIcon} alt="Icono" className="h-6 w-6" />
            <p className="text-gray-700">Botón de Emergencia</p>
          </div>
          <div className="flex items-center space-x-4">
            <img src={oximeterIcon} alt="Icono" className="h-6 w-6" />
            <p className="text-gray-700">Oxímetro</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => handleScroll("more")}
            className="inline-block rounded-md hover:bg-gray-700 bg-gray-800 px-6 py-3 text-white font-semibold shadow-md transition transform hover:scale-105 duration-300"
          >
            Conoce Más
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutProject = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 py-16 px-6">
      <div className="relative z-10 text-left max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Motivación del Proyecto
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Este proyecto nace de la necesidad de mejorar la experiencia de los
          ciclistas, brindándoles herramientas avanzadas para monitorear su
          salud y garantizar su seguridad en cada trayecto. Nuestro chaleco
          inteligente combina tecnología de punta con un diseño práctico para
          ofrecer una solución integral a los desafíos que enfrentan los
          ciclistas en su día a día.
        </p>
      </div>
    </div>
  );
};

export const Maintenance = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 py-16 px-6">
      <div className="relative z-10 text-left max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Instrucciones de Mantenimiento
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Para garantizar el correcto funcionamiento y la durabilidad de tu
          chaleco inteligente, sigue estas recomendaciones:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-gray-800">
          <li>
            <strong>Limpieza:</strong> Limpia el chaleco con un paño húmedo
            después de cada uso y asegúrate de que esté completamente seco antes
            de guardarlo.
          </li>
          <li>
            <strong>Almacenamiento:</strong> Guarda el chaleco en un lugar
            fresco y seco, lejos de la luz solar directa y fuentes de calor.
          </li>
          <li>
            <strong>Problemas Técnicos:</strong> Si experimentas problemas,
            contacta al equipo de soporte a través del correo{" "}
            <strong>vicente.leiva2@mail.udp.cl</strong>.
          </li>
          <li>
            <strong>Reinicio:</strong> Si el chaleco no responde, apágalo y
            vuelve a encenderlo para reiniciar el sistema.
          </li>
        </ul>
      </div>
    </div>
  );
};

export const More = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 py-16 px-6">
      <div className="relative z-10 text-left max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Características y Beneficios
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Nuestro chaleco inteligente está diseñado para revolucionar la
          experiencia de los ciclistas. Estas son algunas de sus principales
          características:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-gray-800">
          <li>
            <strong>Monitor de Frecuencia Cardiaca y Oxímetro:</strong> Permite
            monitorear tu salud en tiempo real, asegurando un ejercicio seguro y
            eficiente.
          </li>
          <li>
            <strong>GPS Integrado:</strong> Proporciona navegación precisa y
            seguimiento de tu ubicación para planificar rutas seguras.
          </li>
          <li>
            <strong>Botón de Emergencia:</strong> Facilita la comunicación con
            contactos de emergencia en situaciones críticas.
          </li>
        </ul>
      </div>
    </div>
  );
};
