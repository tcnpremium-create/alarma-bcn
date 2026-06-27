import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { motion } from "framer-motion";

export default function Privacidad() {
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
              Política de Privacidad
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">1. Responsable del Tratamiento</h2>
              <p className="text-gray-600 mb-4">
                El responsable del tratamiento de sus datos personales es:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Identidad:</strong> Premium Tech Security</li>
                <li><strong>Dirección:</strong> Carrer de Balmes, 150, 08008 Barcelona</li>
                <li><strong>Email:</strong> tcnpremium@gmail.com</li>
                <li><strong>Teléfono:</strong> 638 10 99 47</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">2. Finalidad del Tratamiento</h2>
              <p className="text-gray-600 mb-4">
                Los datos personales que nos proporcione a través de nuestra página web o mediante otros canales serán tratados con las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Gestión de solicitudes de información y presupuestos</li>
                <li>Prestación de servicios de instalación de sistemas de seguridad</li>
                <li>Envío de comunicaciones comerciales sobre nuestros productos y servicios (si ha dado su consentimiento)</li>
                <li>Cumplimiento de obligaciones legales</li>
                <li>Atención de consultas y reclamaciones</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">3. Base Legal</h2>
              <p className="text-gray-600 mb-4">
                La base legal para el tratamiento de sus datos personales es:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>La ejecución de un contrato o la aplicación de medidas precontractuales</li>
                <li>El consentimiento del interesado para el envío de comunicaciones comerciales</li>
                <li>El cumplimiento de obligaciones legales aplicables</li>
                <li>El interés legítimo del responsable en la mejora de servicios</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">4. Conservación de Datos</h2>
              <p className="text-gray-600 mb-6">
                Sus datos personales serán conservados durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos. Será de aplicación lo dispuesto en la normativa de archivos y documentación.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">5. Destinatarios de los Datos</h2>
              <p className="text-gray-600 mb-6">
                Sus datos no serán cedidos a terceros, salvo obligación legal. No obstante, le informamos de que los datos pueden ser comunicados a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Administraciones públicas cuando exista una obligación legal</li>
                <li>Proveedores de servicios tecnológicos necesarios para la gestión del sitio web</li>
                <li>Entidades financieras para la gestión de pagos</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">6. Derechos del Usuario</h2>
              <p className="text-gray-600 mb-4">
                Puede ejercer los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li><strong>Acceso:</strong> Derecho a obtener confirmación sobre si estamos tratando datos personales que le conciernen</li>
                <li><strong>Rectificación:</strong> Derecho a solicitar la rectificación de los datos inexactos</li>
                <li><strong>Supresión:</strong> Derecho a solicitar su supresión cuando ya no sean necesarios</li>
                <li><strong>Oposición:</strong> Derecho a oponerse al tratamiento de sus datos</li>
                <li><strong>Limitación:</strong> Derecho a solicitar la limitación de su tratamiento</li>
                <li><strong>Portabilidad:</strong> Derecho a recibir los datos en un formato estructurado</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Para ejercer estos derechos, puede enviar una solicitud a tcnpremium@gmail.com o por correo postal a Carrer de Balmes, 150, 08008 Barcelona, acompañando copia de su DNI.
              </p>
              <p className="text-gray-600 mb-6">
                Asimismo, le informamos de que puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento de sus datos personales vulnera la normativa.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">7. Seguridad de los Datos</h2>
              <p className="text-gray-600 mb-6">
                Premium Tech Security ha adoptado las medidas de seguridad técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
              </p>

              <h2 className="text-2xl font-bold text-[#0A1628] mt-8 mb-4">8. Modificaciones</h2>
              <p className="text-gray-600 mb-6">
                Premium Tech Security se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}