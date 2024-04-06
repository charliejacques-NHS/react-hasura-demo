import { BaseTable } from './BaseTable';

export interface FeatureFlag extends BaseTable {
  name: string;
  friendly_name: string;
  enabled: boolean;
}
