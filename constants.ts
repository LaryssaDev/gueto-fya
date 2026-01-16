import { Product } from './types.ts';

export const WHATSAPP_NUMBER = '11977809124'; // Format: 5511...
export const CURRENCY_LOCALE = 'pt-BR';
export const CURRENCY_CODE = 'BRL';

export const LOGO_URL = 'https://i.imgur.com/1ajPNUV.png';
export const BANNER_URL = 'https://i.imgur.com/62kpOCt.png';
export const INSTAGRAM_URL = 'https://www.instagram.com/gueto.fya/';

export const INITIAL_PRODUCTS: Product[] = [
  // CAMISETAS
  {
    id: 'c1',
    name: 'Camiseta Chronic 1',
    price: 64.99,
    description: 'Camiseta streetwear original Chronic. Estampa de alta qualidade e durabilidade.',
    images: ['https://i.imgur.com/2c7168K.png', 'https://i.imgur.com/lCyxGCB.png'],
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    category: 'Camisetas',
    stock: 100
  },
  {
    id: 'c2',
    name: 'Camiseta Chronic 2',
    price: 64.99,
    description: 'Camiseta streetwear original Chronic. Conforto e estilo urbano.',
    images: ['https://i.imgur.com/1ERKSbB.png', 'https://i.imgur.com/NLquKDm.png'],
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    category: 'Camisetas',
    stock: 100
  },
  {
    id: 'c3',
    name: 'Camiseta Chronic 3',
    price: 64.99,
    description: 'Camiseta streetwear original Chronic. Design exclusivo da coleção.',
    images: ['https://i.imgur.com/T818GPO.png', 'https://i.imgur.com/8xYparx.png'],
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    category: 'Camisetas',
    stock: 100
  },
  {
    id: 'c4',
    name: 'Camiseta Chronic 4',
    price: 64.99,
    description: 'Camiseta streetwear original Chronic. Tecido premium 100% algodão.',
    images: ['https://i.imgur.com/8G4m80q.png', 'https://i.imgur.com/jQz2dSl.png'],
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    category: 'Camisetas',
    stock: 100
  },
  {
    id: 'c5',
    name: 'Camiseta Chronic 5',
    price: 64.99,
    description: 'Camiseta streetwear original Chronic. Arte urbana autêntica.',
    images: ['https://i.imgur.com/JdmMMuc.png', 'https://i.imgur.com/w9paFXw.png'],
    sizes: ['P', 'M', 'G', 'GG', 'EXG'],
    category: 'Camisetas',
    stock: 100
  },
  // BONÉS
  {
    id: 'b1',
    name: 'Boné Chronic 1',
    price: 90.00,
    description: 'Boné aba reta estruturado. Ajuste snapback.',
    images: ['https://i.imgur.com/i1j2zkz.png'],
    sizes: ['ÚNICO'],
    category: 'Bonés',
    stock: 50
  },
  {
    id: 'b2',
    name: 'Boné Chronic 2',
    price: 90.00,
    description: 'Boné estilo dad hat. Bordado frontal.',
    images: ['https://i.imgur.com/j7TRXya.png'],
    sizes: ['ÚNICO'],
    category: 'Bonés',
    stock: 50
  },
  // MOLETONS
  {
    id: 'm1',
    name: 'Moletom Chronic 1',
    price: 150.00,
    description: 'Moletom canguru com capuz. Flanelado interno para máximo conforto.',
    images: ['https://i.imgur.com/sF84OSq.png', 'https://i.imgur.com/EE9X9DH.png'],
    sizes: ['P', 'M', 'G', 'GG'],
    category: 'Moletons',
    stock: 30
  },
  {
    id: 'm2',
    name: 'Moletom Chronic 2',
    price: 120.00,
    description: 'Moletom careca (sem capuz). Estampa full print nas mangas.',
    images: ['https://i.imgur.com/ajcwBju.png', 'https://i.imgur.com/qYnCcuK.png'],
    sizes: ['P', 'M', 'G', 'GG'],
    category: 'Moletons',
    stock: 30
  },
  // BERMUDAS
  {
    id: 'ber1',
    name: 'Bermuda Chronic 1',
    price: 70.00,
    description: 'Bermuda tactel leve, secagem rápida. Ideal para o dia a dia.',
    images: ['https://i.imgur.com/WpoJgbS.png', 'https://i.imgur.com/aCyQPXm.png'],
    sizes: ['38', '40', '42', '44', '46'],
    category: 'Bermudas',
    stock: 40
  },
  {
    id: 'ber2',
    name: 'Bermuda Chronic 2',
    price: 70.00,
    description: 'Bermuda cargo com bolsos laterais funcionais.',
    images: ['https://i.imgur.com/7iIJ6ve.png', 'https://i.imgur.com/HO1DBMs.png'],
    sizes: ['38', '40', '42', '44', '46'],
    category: 'Bermudas',
    stock: 40
  }
];