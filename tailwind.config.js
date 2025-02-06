/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width:{
        'modalWidth':"800px"
      },
      maxWidth:{
        'modalMaxWidth':"800px"
      },
     
    },
  },
  plugins: [],
};