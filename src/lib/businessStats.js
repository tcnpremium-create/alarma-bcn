/**
 * businessStats.js — single source of truth for commercial claims/stats
 * shown across the site (ratings, experience, install counts, response
 * times). Import from here instead of hardcoding numbers in components.
 *
 * WHY THIS FILE EXISTS: an audit found the same claims stated with
 * different, contradictory numbers in different components — e.g. "15
 * años de experiencia" vs "30 años" vs "10 años"; "+200 instalaciones"
 * vs "+800 instalaciones" vs "2.500+"; "4.8/5" vs "4.9/5"; "13 reseñas"
 * vs the real count. Each value below was resolved as follows — do not
 * change a value without updating the reasoning:
 *
 * - googleRating / googleReviewCount: VERIFIED against the live Google
 *   Business Profile listing (screenshot + Windsor.ai API pull,
 *   2026-08-21). Not a guess — use these everywhere a rating is shown.
 *
 * - experienceText: the codebase had 3 conflicting figures (15 / 30 / 10
 *   años) with no way to determine which is correct. The "30 años" claim
 *   is backed by a foundingDate:1994 in SobreNosotros.jsx's own
 *   structured data, while "15 años" is the more frequently repeated
 *   marketing figure — neither source is clearly more authoritative, so
 *   per a "never invent a number" rule this uses neutral wording instead.
 *   Replace with a real figure once the business confirms its actual
 *   founding year / years in the sector.
 *
 * - installationsText: 3 conflicting figures existed (+200 / +800 /
 *   2.500+, the last one also inconsistently labelled "sistemas activos"
 *   vs "clientes activos") with no way to verify which is correct.
 *   Neutral wording until the business confirms a real count.
 *
 * - incidentResponseTime: 2 components said "<30min", 1 said "<5min" for
 *   CRA/incident response — adopted the majority figure and fixed the
 *   outlier to match. Confirm with the business if this can be tightened.
 *
 * - installTimeframe / warrantyYears: consistent everywhere they appear
 *   in the codebase, no contradiction found — kept as-is.
 */
export const businessStats = {
  companyName: "Premium Tech Security",
  phone: "+34638109947",
  phoneDisplay: "638 10 99 47",
  email: "tcnpremium@gmail.com",

  googleRating: "4.8",
  googleReviewCount: "19",

  experienceText: "Amplia experiencia en el sector de la seguridad electrónica",
  installationsText: "Instalaciones realizadas en Barcelona y toda Catalunya",

  installTimeframe: "24-48h",
  warrantyYears: "3",
  incidentResponseTime: "30min",
};
