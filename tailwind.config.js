const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    columnCount: [ 1, 2, 3, 4 ],
    columnGap: { // will fallback to 'gap' || 'gridGap' values
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
    },
    columnWidth: {
      sm: '120px',
      md: '240px',
      lg: '360px',
    },
    columnRuleColor: false, // will fallback to `borderColor` values
    columnRuleWidth: false, // will fallback to `borderWidth` values
    columnRuleStyle: [
      'none', 'hidden', 'dotted', 'dashed', 'solid',
      'double', 'groove', 'ridge', 'inset', 'outset',
    ],
    columnFill: [ 'auto', 'balance', 'balance-all' ],
    columnSpan: [ 'none', 'all' ],
    extend: {
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
       }
    },
  },
  variants: {
    columnCount: ['responsive'],
    columnGap: ['responsive'],
    columnWidth: ['responsive'],
    columnRuleColor: ['responsive'],
    columnRuleWidth: ['responsive'],
    columnRuleStyle: ['responsive'],
    columnFill: ['responsive'],
    columnSpan: ['responsive'],
    extend: {
      fontWeight: ['hover', 'focus'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
      transitionDuration: ['hover', 'focus'],
    }
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwindcss-multi-column')(),
  ],
}
