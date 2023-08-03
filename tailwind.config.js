/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,mdx}',
    './components/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,mdx}',
    './app/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,mdx}',
    './prebuilt/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: { min: '320px', max: '576px' },
        sm: { min: '576px', max: '767px' },
        md: { min: '768px', max: '991px' },
        lg: { min: '992px', max: '1199px' },
        xl: { min: '1200px', max: '1444px' },
        xxl: { min: '1445px' },
      },
    },
  },
  daisyui: {
    themes: ['lofi', 'wireframe'],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
