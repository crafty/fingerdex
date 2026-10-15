import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// Nocturne: a compact dark theme with a blurple accent, layered over Aura.
// Values mirror the tokens in index.css so PrimeReact and Tailwind match.
export const Nocturne = definePreset(Aura, {
  primitive: {
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "14px",
    },
  },
  semantic: {
    primary: {
      50: "#f5f4ff",
      100: "#e7e5fe",
      200: "#d2cefd",
      300: "#b5abfc",
      400: "#9184d9",
      500: "#968ae0",
      600: "#796cbf",
      700: "#5d5294",
      800: "#423a6a",
      900: "#2b2741",
      950: "#1f1c30",
    },
    // The site is dark-only, so surfaces are the Nocturne neutral ramp
    // ending in the surface (900) and page ground (950) colors.
    surface: {
      0: "#e9e9ed",
      50: "#f3f5fe",
      100: "#e4e7f5",
      200: "#cfd3e5",
      300: "#b2b6ca",
      400: "#9397ab",
      500: "#75798c",
      600: "#595d6c",
      700: "#3f424d",
      800: "#292b31",
      900: "#232532",
      950: "#161826",
    },
    text: {
      mutedColor: "{surface.300}",
      hoverMutedColor: "{surface.200}",
    },
    formField: {
      background: "{surface.900}",
      borderColor: "{surface.700}",
      hoverBorderColor: "{surface.500}",
    },
  },
});
