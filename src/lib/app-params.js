// Legacy compatibility — no longer needed without Base44
export const appParams = {
  appId: null,
  token: null,
  functionsVersion: null,
  appBaseUrl: window?.location?.origin || '',
};
