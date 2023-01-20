import { createTheme } from "@mui/material/styles";
import { GRAY_500, PRIMARY, RED_500 } from "../utils/colors";

export const configureDesignSystem = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: GRAY_500,
    },
    error: {
      main: RED_500,
    },
  },

  typography: {
    fontFamily: "Montserrat",
    allVariants: {
      textTransform: "none",
      letterSpacing: "0.05em",
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          maxHeight: "45px",
        },
        input: {
          padding: 0,
        },
      },
    },
  },
  shape: { borderRadius: 4 },
  spacing: 8,
  direction: "rtl",
});
