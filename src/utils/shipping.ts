export const SHIPPING_RATES = {
  SEDEX: {
    SP: 45.0, DF: 65.0, RJ: 75.0, MG: 75.0, GO: 75.0, PR: 65.0, SC: 75.0, ES: 75.0,
    RS: 130.0, MS: 90.0, MT: 95.0, BA: 95.0, CE: 110.0, SE: 130.0, PE: 120.0,
    AL: 130.0, PB: 130.0, RN: 130.0, PI: 130.0, MA: 130.0, PA: 110.0, AP: 130.0,
    AM: 130.0, TO: 110.0
  },
  PAC: {
    SP: 35.0, DF: 50.0, RJ: 50.0, ES: 50.0, MG: 50.0, GO: 50.0, PR: 50.0, SC: 50.0,
    RS: 50.0, MS: 50.0, MT: 60.0, BA: 60.0, CE: 75.0, SE: 105.0, AL: 115.0,
    PB: 105.0, RN: 105.0, PI: 105.0, AP: 105.0, TO: 95.0, PE: 95.0, MA: 105.0,
    AM: 105.0, PA: 95.0, RO: 105.0
  },
  TRANSPORTADORA: {
    SP: 53.0, RJ: 75.0, ES: 75.0, MG: 75.0, DF: 75.0, SC: 75.0, PR: 75.0,
    RS: 105.0, SE: 90.0, AL: 90.0, BA: 85.0, PB: 105.0, CE: 85.0, PI: 115.0,
    PA: 115.0, GO: 80.0, TO: 115.0, MS: 85.0, RN: 105.0, MA: 95.0, MT: 80.0,
    PE: 90.0, AM: 110.0, AP: 125.0, AC: 150.0
  }
} as const;

export type ShippingService = keyof typeof SHIPPING_RATES;
export type StateCode = keyof typeof SHIPPING_RATES.SEDEX;

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: StateCode;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse | null> {
  try {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;
    
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    
    if (data.erro) return null;
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}

export function getShippingOptions(stateCode: StateCode) {
  return Object.entries(SHIPPING_RATES).map(([service, rates]) => ({
    name: service,
    price: rates[stateCode] || 0
  })).filter(option => option.price > 0);
}