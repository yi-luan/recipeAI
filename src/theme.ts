import type { ThemeConfig } from 'antd';

/** Brand palette, shared by antd tokens and Tailwind arbitrary values. */
export const colors = {
  primary: '#ee7f2b',
  primaryHover: '#f19a55',
  text: '#1b130d',
  muted: '#9a6e4c',
  border: '#e7dacf',
  surface: '#fcfaf8',
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorLink: colors.primary,
    colorText: colors.text,
    colorTextSecondary: colors.muted,
    colorBorder: colors.border,
    borderRadius: 8,
  },
};
