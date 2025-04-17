import { LitElement, PropertyValues, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { checkCollorAccessibility } from './helpers';

export class BackgroundComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--background, #fff);
    }
  `;

  @property({ type: String }) backgroundStyle: 'solid' | 'gradient' = 'solid';
  @property({ type: String }) solidColor: string = '#fff';
  @property({ type: String }) gradientColor1: string = '#fff';
  @property({ type: String }) gradientColor2: string = '#ccc';
  @property({ type: Number }) gradientPercentage: number = 50;
  @property({ type: Number }) gradientAngle: number = 90;
  @property({ type: String }) contrastTextColor: string = '#000';
  
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
    if (changedProperties.has('solidColor') || changedProperties.has('gradientColor1')){
      const backgroundColor = this.backgroundStyle === 'solid' ? this.solidColor : this.gradientColor1;
      const isAccessible = checkCollorAccessibility(this.black, backgroundColor);
          this.contrastTextColor = isAccessible ? this.black : this.white;
    }
  }

  render() {
    return html`
      <style>
        :host {
          --background: ${this.getBackgroundStyle()};
          --text-color: ${this.contrastTextColor};
        }
      </style>
    `;
  }
}