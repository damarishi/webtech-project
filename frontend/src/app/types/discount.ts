export interface Discount {
  discount_id: number;
  code: string;
  value: number;
  source?: 'CODE' | 'LOYALTY';
}
