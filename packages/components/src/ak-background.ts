import { LitElement, PropertyValues, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { checkCollorAccessibility, defaultStyles } from './helpers';

export class BackgroundComponent extends LitElement {
  @property({ type: String, attribute: 'background-style' }) backgroundStyle: 'solid' | 'gradient' = 'solid';
  @property({ type: String, attribute: 'solid-color' }) solidColor: string = '#fff';
  @property({ type: String, attribute: 'gradient-color1' }) gradientColor1: string = '#fff';
  @property({ type: String, attribute: 'gradient-color2' }) gradientColor2: string = '#ccc';
  @property({ type: Number, attribute: 'gradient-percentage', converter: (value) => (value && isNaN(+value) ? Number(value) : 50) }) gradientPercentage: number = 50;
  @property({ type: Number, attribute: 'gradient-angle', converter: (value) => (value && isNaN(+value) ? Number(value) : 90) }) gradientAngle: number = 90;
  @property({ type: String, attribute: 'contrast-text-color' }) contrastTextColor: string = '#000';

  private readonly white = '#fff';
  private readonly black = '#000';

  protected getBackgroundStyle(): string {
    if (this.backgroundStyle === 'solid') {
      return this.solidColor || '#fff';
    } else {
      return `linear-gradient(${this.gradientAngle}deg, ${this.gradientColor1} 0%, ${this.gradientColor1} ${this.gradientPercentage}%,  ${this.gradientColor2} 100%)`;
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (
      changedProperties.has('solidColor') ||
      changedProperties.has('gradientColor1')
    ) {
      const backgroundColor =
        this.backgroundStyle === 'solid'
          ? this.solidColor
          : this.gradientColor1;
      const isAccessible = checkCollorAccessibility(
        this.black,
        backgroundColor
      );
      this.contrastTextColor = isAccessible ? this.black : this.white;
    }
  }

  render() {
    return html`
      <style>
        :host {
          background: var(--background, #fff);
          --background: ${this.getBackgroundStyle()};
          --text-color: ${this.contrastTextColor};
        }

        ${defaultStyles}
      </style>
    `;
  }
}
