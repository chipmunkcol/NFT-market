const theme = {
  size: {
    mobile: "480px",
    tablet: "640px",
    laptop: "1200px",
    desktop: "1800px",
  },
  color: {
    bg: {
      mainColor: "#6ABD8C",
      mainColorLight: "#CCDFB0",
      backgroundColor: "#F6F9F0",
      darkGray: "#595959",
      lightGray: "#939292",
      superLightGray: "#F1F2F5",
    },
    font: {
      main: "#F6F9F0",
    },
  },
  variables: {
    flex: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    flexColumn: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
    flexBetween: `
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
  },
};

export default theme;
