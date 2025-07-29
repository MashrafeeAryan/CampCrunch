// utils/themeHelpers.ts
import { darkTheme } from './themeColors';

export const getTextStyle = (theme: string) =>
  theme === 'dark' ? { color: darkTheme.text } : {};

export const getCardStyle = (theme: string) =>
  theme === 'dark' ? { backgroundColor: darkTheme.card } : {};

export const getBackgroundStyle = (theme: string) =>
  theme === 'dark' ? { backgroundColor: darkTheme.background } : {};

export const getSectionBorderStyle = (theme: string) =>
  theme === 'dark' ? { borderWidth: 1, borderColor: '#fff', borderRadius: 16 } : {};