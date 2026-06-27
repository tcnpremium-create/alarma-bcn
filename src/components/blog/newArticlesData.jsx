import { newArticlesDataA } from './newArticlesDataA';
import { newArticlesDataB } from './newArticlesDataB';
import { newArticlesDataC } from './newArticlesDataC';
import { newArticlesData1 } from './newArticlesData1';

// A y B tienen las versiones mejoradas (con schema SEO completo y maquetación corregida)
// C tiene artículos nuevos (chalets, garajes, empresas, etc.)
// Data1 tiene versiones originales — los slugs duplicados en A/B prevalecen
export const newArticlesData = { ...newArticlesData1, ...newArticlesDataC, ...newArticlesDataA, ...newArticlesDataB };