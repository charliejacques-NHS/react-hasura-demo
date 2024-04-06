import { BaseTable } from './BaseTable';

export interface Product extends BaseTable {
  name: string;
  description: string;
  price: number;
  image_src: string;
}
