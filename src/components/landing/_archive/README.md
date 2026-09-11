# Componentes archivados

Estos 21 componentes de `src/components/landing/` no tenían ninguna
referencia (import estático, import dinámico ni mención por nombre) en
ningún otro archivo del proyecto en el momento de archivarlos — ver
auditoría de diseño, Fase 5. Antes de moverlos aquí se comprobó, para
cada uno: referencias por nombre en todo `src/`, `public/`, `vercel.json`,
`package.json` y `pages.config.js`, imports dinámicos (`import(...)`), y
coincidencias que resultaron ser solo el propio nombre del archivo (p. ej.
`WhyChooseUsCards` contiene la subcadena `WhyChooseUs`).

No se han borrado por si:

- Formaban parte de una campaña o diseño en pausa.
- Alguien quiere recuperar un patrón concreto para un componente nuevo.

Si tras un tiempo siguen sin usarse, se pueden eliminar definitivamente.
Si se reutiliza alguno, muévelo de vuelta a `src/components/landing/` y
verifica sus estilos/colores contra el Alarma BCN Design System (es
probable que use hex hardcodeado en vez de los tokens de marca).

Archivados: BlogDestacados, BlogPreview, CertificationsSection,
CtaSection, EnhancedHero, HeroSection, HomeServicesGrid,
ProfessionalHero, PromoOriginal, SeoIntroSection, ServicesSection,
SistemasIncluidos, TechPartners, TechnologySection, TecnologiaTeaser,
Testimonials, TestimonialsSection, ValueProposition, WhyChooseUs,
WhyChooseUsCards, WhyUsSection.
