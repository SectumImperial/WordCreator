export interface FormData {
  company_name_full: string;
  company_name_short: string;
  person_full: string;
  person_short: string;
  person_action: string;
  gender: 'male' | 'female';
  position: string;
  INN: number;
  KPP: number;
  BIC: number;
  OGRN: number;
  Bank: string;
  rs: number;
  ks: number;
  email: string;
  project_days: number;
  total_amount: number;
  imprest_amount: number;
  remaining_amount?: number;
  acting_word?: 'действующего' | 'действующая';
}

export type FormErrors = {
  INN?: string;
  KPP?: string;
  BIC?: string;
  OGRN?: string;
  rs?: string;
  ks?: string;
};
