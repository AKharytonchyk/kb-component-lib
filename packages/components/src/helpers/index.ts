import { css } from 'lit';
import tinycolor from 'tinycolor2';

/**
 * Adjusts the text color to meet WCAG contrast requirements with the given background color.
 * @param textColor - The initial text color in any valid CSS format (e.g., hex, rgb, etc.).
 * @param backgroundColor - The background color in any valid CSS format.
 * @param level - The WCAG level to check against ('AA' or 'AAA').
 * @param largeText - Whether the text is considered large (18pt+ or bold 14pt+).
 * @returns A boolean indicating whether the text color is accessible against the background color.
 */
export function checkCollorAccessibility(
  textColor: string,
  backgroundColor: string,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean {
  let text = tinycolor(textColor);
  const isAccessible = (textColor: tinycolor.Instance) =>
    tinycolor.readability(textColor.toHexString(), backgroundColor) >=
    (level === 'AA'
      ? largeText
        ? 3
        : 4.5
      : largeText
      ? 4.5
      : 7);

  return isAccessible(text);
}

/**
 * Generates a lighter version of the given color using tinycolor2.
 * @param color - The input color in any valid CSS format (e.g., hex, rgb, etc.).
 * @param amount - The amount to lighten the color (0-100, default: 80 for a very light version).
 * @returns The lighter color as a hex string.
 */
export function getLighterColor(color: string, amount: number = 80): string {
  return tinycolor(color).lighten(amount).toHexString();
}

export const defaultStyles = css`
  :host {
    font-family: "Open Sans", sans-serif;
    font-size: 18px;
    line-height: 1.5;
  }`