export interface LoyaltyLevel {
  period: 'week' | 'month' | 'year';
  discount: number;
  progress: number;
  unlocked: boolean;
  used: boolean;
  available: boolean;
  stats: {
    orders: number;
    amount: number;
  };
  required: {
    orders: number;
    amount: number;
  };
}

export interface LoyaltyResponse {
  levels: LoyaltyLevel[];
}

