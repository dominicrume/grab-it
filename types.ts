export enum AppMode {
  CONSUMER = 'CONSUMER',
  MERCHANT = 'MERCHANT'
}

export enum ViewState {
  FEED = 'FEED',
  MAP = 'MAP',
  PROFILE = 'PROFILE',
  MERCHANT_DASH = 'MERCHANT_DASH',
  MERCHANT_CREATE = 'MERCHANT_CREATE'
}

export interface Deal {
  id: string;
  merchantName: string;
  title: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountPrice: number;
  unitsLeft: number;
  distanceMeters: number;
  tags: string[];
  expiresAt: number; // Timestamp
}

export interface ActiveGrab {
  deal: Deal;
  grabTime: number;
  qrCodeData: string;
}

export interface MerchantStats {
  activeCustomers: number;
  redeemedToday: number;
  trafficLive: boolean;
}

export interface AdVariation {
  id: string;
  styleName: string;
  title: string;
  description: string;
  tags: string[];
  musicVibe: string;
  animationStyle: 'zoom' | 'pan' | 'pulse';
  accentColor: string;
}