/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 企业级灰度体系
        ink: {
          50: '#F7F8FA',
          100: '#EEF0F4',
          200: '#DCE0E8',
          300: '#B8BFCC',
          400: '#8B95A8',
          500: '#5F6A7D',
          600: '#3F4758',
          700: '#2A3040',
          800: '#1A1F2C',
          900: '#0F121A',
        },
        brand: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 18, 26, 0.04), 0 4px 12px rgba(15, 18, 26, 0.06)',
      },
    },
  },
  plugins: [],
};
