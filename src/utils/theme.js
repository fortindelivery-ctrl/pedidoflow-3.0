export const THEME_STORAGE_KEY = 'pedidoFlowTheme';

export const THEMES = [
  {
    key: 'atlas',
    name: 'Atlas Sunset',
    description: 'Base profunda com acento laranja vibrante.',
    preview: {
      accent: '#ff7b3e',
      bg: '#0b111a',
      surface: '#162334',
      border: '#2a425f',
    },
  },
  {
    key: 'safira',
    name: 'Blue Safira',
    description: 'Tons frios com foco em contraste limpo.',
    preview: {
      accent: '#49a0ff',
      bg: '#0d1420',
      surface: '#1a2942',
      border: '#33507d',
    },
  },
  {
    key: 'graphite',
    name: 'Graphite Mint',
    description: 'Painel grafite com acento aqua moderno.',
    preview: {
      accent: '#00c2a8',
      bg: '#111416',
      surface: '#20292e',
      border: '#374a56',
    },
  },
  {
    key: 'sage',
    name: 'Sage Stone',
    description: 'Visual natural com verdes mais calmos.',
    preview: {
      accent: '#9ccf5b',
      bg: '#0f1613',
      surface: '#1d2a24',
      border: '#365044',
    },
  },
  {
    key: 'copper',
    name: 'Copper Loft',
    description: 'Tema quente com atmosfera premium.',
    preview: {
      accent: '#ff8c61',
      bg: '#17110f',
      surface: '#2a201c',
      border: '#4b3a32',
    },
  },
];

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'atlas';
  return window.localStorage.getItem(THEME_STORAGE_KEY) || 'atlas';
};

export const applyTheme = (themeKey) => {
  if (typeof window === 'undefined') return;
  const next = THEMES.find((theme) => theme.key === themeKey)?.key || 'atlas';
  document.documentElement.setAttribute('data-theme', next);
  window.localStorage.setItem(THEME_STORAGE_KEY, next);
};
