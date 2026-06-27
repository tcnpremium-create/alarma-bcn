import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServiceCard({ 
  icon: Icon, 
  title, 
  subtitle, 
  description,
  detailedBenefits,
  testimonials,
  image,
  precio,
  onContactClick,
  isEven 
}) {
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Imagen */}
      <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src={image}
            alt={title}
            className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <p className="text-white font-bold text-2xl">{precio}</p>
              <p className="text-white/70 text-sm">Instalación incluida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className={!isEven ? 'lg:col-start-1' : ''}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#E63946]/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#E63946]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">{title}</h2>
            <p className="text-[#E63946] text-sm font-semibold">{subtitle}</p>
          </div>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {description}
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#0A1628] mb-4">
            Características Principales
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {detailedBenefits.map((beneficio, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm font-medium">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Toggle */}
        {testimonials && testimonials.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setShowTestimonials(!showTestimonials)}
              className="text-[#E63946] font-semibold text-sm hover:underline flex items-center gap-2"
            >
              {showTestimonials ? '✕ Ocultar testimonios' : '⭐ Ver testimonios de clientes'}
            </button>
            
            {showTestimonials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="border-l-4 border-[#E63946] bg-[#E63946]/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-700 italic text-sm mb-2">"{testimonial.text}"</p>
                        <p className="font-semibold text-[#0A1628] text-sm">{testimonial.author}</p>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onContactClick}
            className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Solicitar Presupuesto Gratis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white rounded-full px-8 py-6 text-base font-semibold"
          >
            <a href="tel:+34638109947">
              📞 638 10 99 47
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}