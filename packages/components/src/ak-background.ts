import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

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

  protected getBackgroundStyle(): string {
    console.log('Background style:', this.backgroundStyle);
    if (this.backgroundStyle === 'solid') {
      return this.solidColor || '#fff';
    } else {
      return `linear-gradient(${this.gradientAngle}deg, ${this.gradientColor1} 0%, ${this.gradientColor1} ${this.gradientPercentage}%,  ${this.gradientColor2} 100%)`;
    }
  }

  render() {
    return html`
      <style>
        :host {
          --background: ${this.getBackgroundStyle()};
        }
      </style>
    `;
  }
}