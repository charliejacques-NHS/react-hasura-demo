import { BaseTable } from './BaseTable';

export interface Category extends BaseTable {
  name: string;
  friendly_name: string;
}
