// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "dark" | "light" | "system";

// Theme atom
export const themeAtom = atomWithStorage<Theme>("app-theme", "dark");
themeAtom.debugLabel = "app-theme";