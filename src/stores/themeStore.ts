// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "dark" | "light" | "system";

// Theme atom with system as default to match most user expectations
export const themeAtom = atomWithStorage<Theme>("app-theme", "system");
themeAtom.debugLabel = "Theme";