import { dark } from "@clerk/themes";
import type { Appearance } from "@clerk/types";

export const chronosClerkAppearance: Appearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#a855f7",
    colorDanger: "#fb7185",

    colorBackground: "#060607",
    colorText: "#f8fafc",
    colorTextSecondary: "rgba(248,250,252,0.68)",

    colorInputBackground: "rgba(255,255,255,0.04)",
    colorInputText: "#f8fafc",

    borderRadius: "16px",
    fontFamily: "Inter, ui-sans-serif, system-ui",
  },
  elements: {
    card: "rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_80px_rgba(168,85,247,0.25)]",
    headerTitle: "text-2xl font-black tracking-tight text-white",
    headerSubtitle: "text-sm text-white/60",

    dividerLine: "bg-white/10",
    dividerText: "text-white/45 text-xs",

    formFieldLabel: "text-white/70 text-xs font-medium",
    formFieldInput:
      "rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25",

    formButtonPrimary:
      "rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)] transition",

    footerActionText: "text-white/55",
    footerActionLink: "text-purple-300 hover:text-purple-200",

    socialButtonsBlockButton:
      "rounded-xl border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] transition",
    socialButtonsBlockButtonText: "text-white/80 font-medium",
    socialButtonsProviderIcon: "opacity-90",

    formFieldHintText: "text-white/45 text-xs",
    identityPreviewText: "text-white/70",
    identityPreviewEditButton: "text-purple-300 hover:text-purple-200",
  },
};
