import { Composition } from "remotion";
import { Hero } from "./scenes/Hero";
import { LinkButton, type LinkButtonProps } from "./scenes/LinkButton";
import { SectionTitle, type SectionTitleProps } from "./scenes/SectionTitle";
import { Stack } from "./scenes/Stack";
import { FPS, LOOP_FRAMES } from "./theme";

const TITLES: (SectionTitleProps & { id: string })[] = [
    { id: "title-portfolio", title: "портфолио", icon: "folder" },
  { id: "title-contacts", title: "контакты", icon: "telegram" },
];

const BUTTONS: (LinkButtonProps & { id: string })[] = [
  { id: "button-telegram", label: "написать в telegram", icon: "telegram" },
  { id: "button-channel", label: "канал с работами", icon: "megaphone" },
  { id: "button-site", label: "сайт-портфолио", icon: "globe" },
  { id: "button-reviews", label: "отзывы", icon: "star" },
];

const timing = { fps: FPS, durationInFrames: LOOP_FRAMES };

export const Root = () => (
  <>
    <Composition id="hero" component={Hero} width={1200} height={600} {...timing} />
    <Composition id="stack" component={Stack} width={1200} height={1056} {...timing} />
    {TITLES.map(({ id, ...props }) => (
      <Composition key={id} id={id} component={SectionTitle} width={1200} height={170} defaultProps={props} {...timing} />
    ))}
    {BUTTONS.map(({ id, ...props }) => (
      <Composition key={id} id={id} component={LinkButton} width={860} height={150} defaultProps={props} {...timing} />
    ))}
  </>
);
