const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')


  
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{components,app,prebuilt}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
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
