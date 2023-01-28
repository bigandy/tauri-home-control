import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

export const theme = createTheme({
  status: {
    danger: orange[500],
  },
  typography: {
    poster: {
      color: orange[500],
      fontSize: 20,
    },
    // Disable h3 variant
    // h3: undefined,
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true;
    // h3: false;
  }
}
