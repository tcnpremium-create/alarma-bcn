import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { motion } from "framer-motion";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-8">
              Política de Cookies
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">1. ¿Qué son las Cookies?</h2>
              <p className="text-gray-600 mb-6">
                Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">2. Tipos de Cookies</h2>
              
              <h3 className="text-xl font-bold text-[#0A1628] mt-6 mb-3">Según la entidad que las gestione</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Cookies propias:</strong> Se envían al equipo del usuario desde un equipo o dominio gestionado por el propio editor</li>
                <li><strong>Cookies de terceros:</strong> Se envían al equipo del usuario desde un equipo o dominio que no es gestionado por el editor</li>
              </ul>

              <h3 className="text-xl font-bold text-[#0A1628] mt-6 mb-3">Según el plazo de tiempo</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Cookies de sesión:</strong> Recaban y almacenan datos mientras el usuario accede a una página web</li>
                <li><strong>Cookies persistentes:</strong> Los datos siguen almacenados en el terminal y pueden ser accedidos durante un periodo definido</li>
              </ul>

              <h3 className="text-xl font-bold text-[#0A1628] mt-6 mb-3">Según su finalidad</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Cookies técnicas:</strong> Permiten la navegación y utilización de las diferentes opciones del sitio web</li>
                <li><strong>Cookies de análisis:</strong> Permiten el seguimiento y análisis del comportamiento de los usuarios</li>
                <li><strong>Cookies publicitarias:</strong> Permiten la gestión de espacios publicitarios</li>
                <li><strong>Cookies de personalización:</strong> Permiten al usuario acceder al servicio con características predefinidas</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">3. Cookies Utilizadas en este Sitio Web</h2>
              <p className="text-gray-600 mb-4">
                Este sitio web utiliza las siguientes cookies:
              </p>
              
              <h3 className="text-xl font-bold text-[#0A1628] mt-6 mb-3">Cookies Técnicas</h3>
              <p className="text-gray-600 mb-6">
                Utilizadas para mantener la sesión del usuario, recordar preferencias de idioma y otras configuraciones necesarias para el correcto funcionamiento del sitio web.
              </p>

              <h3 className="text-xl font-bold text-[#0A1628] mt-6 mb-3">Cookies de Análisis</h3>
              <p className="text-gray-600 mb-6">
                Utilizadas para elaborar informes estadísticos sobre la actividad del sitio web. Estas cookies nos ayudan a entender cómo los visitantes interactúan con la web, permitiéndonos mejorar su rendimiento y diseño.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">4. Consentimiento</h2>
              <p className="text-gray-600 mb-6">
                Al navegar y continuar en nuestro sitio web estará consintiendo el uso de las cookies antes enunciadas, por los plazos señalados y en las condiciones contenidas en la presente Política de Cookies. Si no consiente el uso de cookies, deberá configurar su navegador para que las rechace o abandonar el uso de este sitio web.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">5. Cómo Gestionar las Cookies</h2>
              <p className="text-gray-600 mb-4">
                Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
                <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Le informamos que, en caso de bloquear o no aceptar la instalación de cookies, es posible que ciertos servicios no estén disponibles sin la utilización de éstas o que no pueda acceder a determinados servicios ni tampoco aprovechar por completo todo lo que nuestras páginas web le ofrecen.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">6. Actualización de la Política de Cookies</h2>
              <p className="text-gray-600 mb-6">
                Premium Tech Security puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Por ello, se aconseja a los usuarios que la visiten periódicamente.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">7. Contacto</h2>
              <p className="text-gray-600 mb-6">
                Para cualquier duda o aclaración sobre esta Política de Cookies, puede contactar con nosotros en:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Email:</strong> tcnpremium@gmail.com</li>
                <li><strong>Teléfono:</strong> 638 10 99 47</li>
                <li><strong>Dirección:</strong> Carrer de Balmes, 150, 08008 Barcelona</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}