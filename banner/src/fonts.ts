import "@fontsource/unbounded/latin-700.css";
import "@fontsource/unbounded/cyrillic-700.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/cyrillic-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/manrope/cyrillic-800.css";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

const SAMPLE = "hokemka стек портфолио";
const FACES = ["700 20px Unbounded", "600 20px Manrope", "700 20px Manrope", "800 20px Manrope"];

export const useFonts = (): void => {
  const [handle] = useState(() => delayRender("fonts"));

  useEffect(() => {
    Promise.all(FACES.map((face) => document.fonts.load(face, SAMPLE)))
      .then(() => document.fonts.ready)
      .then(() => continueRender(handle));
  }, [handle]);
};
