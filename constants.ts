import { Deal } from './types';

export const COLORS = {
  primary: '#FF6B00', // Energy Orange
  secondary: '#00FF41', // Success Green
  background: '#0A0A0A', // Obsidian Black
  surface: '#1A1A1A',
};

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    merchantName: 'Sushi Zen',
    title: 'Dragon Roll Overload',
    description: 'Fresh salmon, avocado, and spicy mayo. Chef over-prepped, your gain!',
    imageUrl: 'https://picsum.photos/600/1000',
    originalPrice: 18.00,
    discountPrice: 0.00,
    unitsLeft: 5,
    distanceMeters: 120,
    tags: ['#SushiLove', '#FreeFood', '#Spicy'],
    expiresAt: Date.now() + 3600000,
  },
  {
    id: '2',
    merchantName: 'Burger Kingpin',
    title: 'Double Smash Cheat Day',
    description: 'Double patty, triple cheese. We close in 30 mins.',
    imageUrl: 'https://picsum.photos/600/1001',
    originalPrice: 14.50,
    discountPrice: 4.99,
    unitsLeft: 12,
    distanceMeters: 450,
    tags: ['#Sizzling', '#MeatSweats', '#LateNight'],
    expiresAt: Date.now() + 7200000,
  },
  {
    id: '3',
    merchantName: 'Daily Dough',
    title: 'Glazed & Confused Box',
    description: 'Assorted dozen. Grab them before they go stale!',
    imageUrl: 'https://picsum.photos/600/1002',
    originalPrice: 22.00,
    discountPrice: 5.00,
    unitsLeft: 3,
    distanceMeters: 80,
    tags: ['#SugarRush', '#Donuts', '#Sweet'],
    expiresAt: Date.now() + 1800000,
  },
];