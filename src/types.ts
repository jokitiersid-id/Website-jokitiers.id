export interface NominalItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
}

export interface InputField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

export interface Game {
  id: string;
  name: string;
  developer: string;
  category: 'games' | 'specialist_mlbb' | 'specialist_roblox' | 'specialist_ff' | 'specialist_pubg' | 'specialist_magicchess' | 'specialist_hok' | 'voucher';
  logoSvg: string; // Or dynamic styling
  bannerImage: string;
  accentColor: string;
  inputFields: InputField[];
  nominals: NominalItem[];
  isHot?: boolean;
}

export interface PaymentGateway {
  id: string;
  name: string;
  group: 'Virtual Account' | 'E-Wallet' | 'Convenience Store' | 'QR Code';
  logoUrl?: string;
  fee: number;
  instructions: string[];
}

export interface Transaction {
  id: string;
  gameId: string;
  gameName: string;
  targetId: string; // userId, etc
  targetZone?: string; // zoneId, etc
  nominalId: string;
  nominalName: string;
  price: number;
  fee: number;
  totalPrice: number;
  paymentMethod: string;
  whatsapp: string;
  status: 'PENDING' | 'SUCCESS' | 'EXPIRED' | 'FAILED';
  createdAt: string;
  vaNumber?: string;
  qrCodeUrl?: string;
  paymentUrl?: string; // for real midtrans snap/redirect if available
  snapToken?: string; // real midtrans snap token
  paymentExpiredAt: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  totalSpends: number;
  avatarSeed: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
  readTime: string;
  upperText?: string;
  badgeText?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
}
