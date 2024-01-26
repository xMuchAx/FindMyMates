import { col1 } from "../theme/colors";

export const style: any = {
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
  },

  rightDiv: {
    flex: 1,
  },
  leftDiv: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: "3.7rem",
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: "4rem",
  },
  p: {
    fontSize: "1.6rem",
    color: "#525252",
    textAlign: "center",
    marginBottom: "5rem",
    padding: "0 0.4rem",
    letterSpacing: "0.01rem",
  },
  words: { color: col1 },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
