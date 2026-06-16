// ─── Social Links Data ───
// Source: docs/gosofia-requirements.md section 1.5

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  /** Simple SVG icon markup for inline rendering */
  icon: string;
}

export const socials: SocialLink[] = [
  {
    platform: 'twitter',
    label: 'X / Twitter',
    url: 'https://x.com/Gosofiade',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },

  {
    platform: 'vgen',
    label: 'VGen',
    url: 'https://vgen.co/Gosofia/portfolio',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  },
  {
    platform: 'kofi',
    label: 'Ko-fi',
    url: 'https://ko-fi.com/gosofia2',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>',
  },
  {
    platform: 'patreon',
    label: 'Patreon',
    url: 'https://www.patreon.com/c/u60424029',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/></svg>',
  },
  {
    platform: 'pixiv',
    label: 'Pixiv',
    url: 'https://www.pixiv.net/users/62737972',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.085-3.211 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116.852.264 1.333.453h-4.37v-.766l1.663-.463V5.798L4.075 5.29v-.766h5.624c.461-.098 1.06-.176 2.052-.176h.994zM12 5.93c-.815 0-1.427.05-1.853.126v8.757c.328.067.863.123 1.494.123 1.252 0 2.354-.41 3.163-1.138.81-.727 1.282-1.812 1.282-3.202 0-1.318-.41-2.465-1.197-3.259C14.103 6.527 13.133 5.93 12 5.93z"/></svg>',
  },
  {
    platform: 'deviantart',
    label: 'DeviantArt',
    url: 'https://www.deviantart.com/gosofia',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 6h4l4-6h4v6h-4l-4 6h4l-4 6H6v-6h4l4-6H6V6z"/></svg>',
  },
];
