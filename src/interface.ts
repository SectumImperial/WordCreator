export interface FormData {
  object_address?: string;
  object_name?: string;
  contract_date?: string | number;
  company_post_address?: string;
  company_address?: string;
  company_name_full?: string;
  company_name_short?: string;
  person_full?: string;
  person_short?: string;
  person_action?: string;
  gender?: 'male' | 'female';
  position?: string;
  inn?: number | string;
  kpp?: number | string;
  bic?: number | string;
  ogrn?: number | string;
  bank?: string;
  rs?: number | string;
  ks?: number | string;
  email?: string;
  project_days?: number | string;
  project_days_word?: string;
  total_amount?: number | string;
  imprest_amount?: number | string;
  remaining_amount?: number | string;
  total_amount_word?: string;
  imprest_amount_word?: string;
  remaining_amount_word?: string;
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

export interface ParsedData {
  position?: string;
  person_action?: string;
  person_full?: string;
  company_name_full?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  bic?: string;
  rs?: string;
  ks?: string;
  email?: string;
}
