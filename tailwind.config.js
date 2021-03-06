module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        login:
          "url('https://digitalpress.fra1.cdn.digitaloceanspaces.com/hmyl99k/2021/03/3402026.png')",
      }),
    },
    height: {
      "1/2": "50%",
      "1/4": "25%",
      "3/4": "75%",
      "1/3": "33.33%",
      "2/3": "66.66%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.44%",
      "5/6": "83.56%",
      "1/9": "11.1%",
      "8/9": "88.9%",
      "1/8": "12.4%",
      "7/8": "87.6%",
      "1/12": "8.33%",
      "1/10": "10%",
      "3/20": "15%",
      "1/20": "5%",
      "17/20": "85%",
      "9/10": "90%",
      "11/12": "91.67%",
      "1/14": "7.1%",
      "13/14": "92.9%",
      "19/20": "95%",
      "45/100": "45%",
      "55/100": "55%",
      1: "1px",
      2: "2px",
      8: "8px",
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      20: "20px",
      22: "22px",
      24: "24px",
      28: "28px",
      32: "32px",
      36: "36px",
      38: "38px",
      40: "40px",
      42: "42px",
      44: "44px",
      46: "46px",
      48: "48px",
      49: "49px",
      56: "56px",
      62: "62px",
      72: "72px",
      78: "78px",
      96: "96px",
      108: "108px",
      120: "120px",
      280: "280px",
      320: "320px",
      screen: "100vh",
      full: "100%",
    },
    width: {
      0: "0%",
      "1/2": "50%",
      "1/3": "33.33%",
      "2/3": "66.66%",
      "1/4": "25%",
      "3/4": "75%",
      "1/6": "16.666667%",
      "1/12": "8.33%",
      "11/12": "91.67%",
      "1/8": "12.5%",
      "5/6": "83.333333%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/7": "14.2%",
      "6/7": "85.8%",
      "85/100": "85%",
      "95/100": "95%",
      "96/100": "96%",
      "98/100": "98%",
      "1/10": "10%",
      "3/10": "30%",
      "9/10": "90%",
      "1/20": "5%",
      "9/20": "45%",
      "19/20": "95%",
      "1/8": "12,5%",
      "1/35": "2.85%",
      "34/35": "97.15%",
      1: "1px",
      2: "2px",
      12: "12px",
      16: "16px",
      20: "20px",
      24: "24px",
      28: "28px",
      32: "32px",
      42: "42px",
      48: "48px",
      52: "52px",
      56: "56px",
      62: "62px",
      72: "72px",
      82: "82px",
      96: "96px",
      108: "108px",
      120: "120px",
      180: "180px",
      220: "220px",
      420: "420px",
      screen: "100vw",
      full: "100%",
    },
    fontSize: {
      8: "8px",
      10: "10px",
      12: "12px",
      14: "14px",
      15: "15px",
      16: "16px",
      18: "18px",
      20: "20px",
      22: "22px",
      24: "24px",
      26: "26px",
      28: "28px",
      32: "32px",
      36: "36px",
      56: "56px",
      72: "72px",
    },
    padding: {
      1: "1px",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
      12: "12px",
      14: "14px",
      16: "16px",
      24: "24px",
      32: "32px",
      36: "36px",
      42: "42px",
      48: "48px",
    },
    margin: {
      0: "0px",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
      10: "10px",
      12: "12px",
      16: "16px",
      20: "20px",
      22: "22px",
      24: "24px",
      32: "32px",
      36: "36px",
      40: "40px",
      42: "42px",
      48: "48px",
      56: "56px",
      "-2": "-2px",
      "-4": "-4px",
      "-6": "-6px",
      "-8": "-8px",
      "1/10": "10%",
      "1/5": "20%",
      "1/3": "33.33%",
      "1/4": "25%",
      "1/2": "50%",
      auto: "auto",
    },
    border: {
      1: "1px",
      2: "2px",
    },
    borderRadius: {
      none: "0",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      16: "16px",
      24: "24px",
      48: "48px",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    screens: {
      mobile: "320px",

      tablet: "768px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {
      height: ["hover", "focus"],
      width: ["hover", "focus"],
    },
  },
  plugins: [],
};
