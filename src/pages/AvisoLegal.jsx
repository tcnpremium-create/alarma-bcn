import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { motion } from "framer-motion";

export default function AvisoLegal() {
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
              Aviso Legal
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">1. Datos Identificativos</h2>
              <p className="text-gray-600 mb-4">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se informa de los datos identificativos del titular del sitio web:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Titular:</strong> Premium Tech Security</li>
                <li><strong>NIF:</strong> B67014076</li>
                <li><strong>Dirección:</strong> Carrer de Balmes, 150, 08008 Barcelona</li>
                <li><strong>Email:</strong> tcnpremium@gmail.com</li>
                <li><strong>Teléfono:</strong> 638 10 99 47</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">2. Objeto</h2>
              <p className="text-gray-600 mb-6">
                El presente aviso legal regula el acceso y uso del sitio web alarmasenbarcelona.com, del que es titular Premium Tech Security. La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena de todas las condiciones incluidas en este Aviso Legal.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">3. Uso del Sitio Web</h2>
              <p className="text-gray-600 mb-4">
                El usuario se compromete a utilizar el sitio web y todos sus contenidos de conformidad con la ley, el presente Aviso Legal y las demás condiciones que, en su caso, resulten de aplicación.
              </p>
              <p className="text-gray-600 mb-6">
                El usuario se obliga a no utilizar el sitio web con fines o efectos ilícitos, contrarios a lo establecido en el presente Aviso Legal, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web o impedir la normal utilización o disfrute del mismo.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">4. Propiedad Intelectual e Industrial</h2>
              <p className="text-gray-600 mb-6">
                Todos los contenidos del sitio web, salvo que se indique lo contrario, son titularidad exclusiva de Premium Tech Security y, en consecuencia, quedan protegidos por la normativa nacional e internacional sobre propiedad intelectual e industrial. Quedan reservados todos los derechos. El acceso al sitio web no otorga a los usuarios derecho ni titularidad alguna sobre los derechos de propiedad intelectual de los contenidos.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">5. Limitación de Responsabilidad</h2>
              <p className="text-gray-600 mb-6">
                Premium Tech Security no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo del sistema electrónico, motivadas por causas ajenas a su voluntad. Asimismo, tampoco se hace responsable de los retrasos o bloqueos en el uso del presente sistema electrónico causados por deficiencias o sobrecargas de líneas telefónicas o sobrecargas en el Centro de Procesos de Datos, en el sistema de Internet o en otros sistemas electrónicos.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">6. Modificaciones</h2>
              <p className="text-gray-600 mb-6">
                Premium Tech Security se reserva el derecho a efectuar sin previo aviso las modificaciones que considere oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">7. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-gray-600 mb-6">
                Las presentes condiciones generales se rigen por la legislación española. Para la resolución de cualquier controversia relativa a la interpretación o aplicación de las presentes condiciones generales, las partes se someten expresamente a los Juzgados y Tribunales de Barcelona.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}