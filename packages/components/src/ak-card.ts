import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { checkCollorAccessibility, getDarkerColor } from './helpers';

@customElement('ak-card')
export class AkCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #000;
      box-sizing: border-box;
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: #fff;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: var(--image-height, 200px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #e0e0e0; /* Fallback background color if image fails to load */
    }

    .title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 16px;
      margin: 16px 0;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .badge {
      background: var(--badge-background, #ff4081);
      color: var(--badge-text-color, #fff);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .text {
      color: #666;
      font-size: 14px;
      margin: 0;
      padding: 0 16px;
      margin: 16px 0;
    }

    .button-container {
      padding: 0 16px;
      margin: 16px 0;
    }

    .button {
      display: inline-block;
      background: var(--button-background, #1976d2);
      color: var(--button-text-color, #fff);
      padding: 12px 24px;
      border-radius: 24px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      border: none;
      width: 100%;
      box-sizing: border-box;
    }

    .button:hover {
      background: var(--button-background-hover, #1565c0);
    }
  `;

  @property({ type: String, attribute: 'image-url' }) imageUrl: string = '';
  @property({ type: String, attribute: 'image-height' }) imageHeight: string =
    '200px';
  @property({ type: String, attribute: 'title' }) title: string = '';
  @property({ type: String, attribute: 'badge-text' }) badgeText: string = '';
  @property({ type: String, attribute: 'title-position' }) titlePosition:
    | 'top'
    | 'below' = 'below';
  @property({ type: String, attribute: 'text' }) text: string = '';
  @property({ type: String, attribute: 'button-text' }) buttonText: string = '';
  @property({ type: String, attribute: 'button-link' }) buttonLink: string = '';
  @property({ type: String, attribute: 'badge-background' })
  badgeBackground: string = '#ff4081';
  @property({ type: String, attribute: 'button-background' })
  buttonBackground: string = '#1976d2';

  private badgeTextColor: string = '#fff';
  private buttonTextColor: string = '#fff';

  private readonly black: string = '#000';
  private readonly white: string = '#fff';

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('badgeBackground')) {
      const isAccessible = checkCollorAccessibility(
        this.black,
        this.badgeBackground
      );

      this.badgeTextColor = isAccessible ? this.black : this.white;
    }

    if (changedProperties.has('buttonBackground')) {
      const isAccessible = checkCollorAccessibility(
        this.black,
        this.buttonBackground
      );

      this.buttonTextColor = isAccessible ? this.black : this.white;
    }
  }

  render() {
    const showBadge = this.badgeText !== '';
    const showButton = this.buttonText !== '' && this.buttonLink !== '';
    const sanitizedImageUrl = this.imageUrl
      ? this.imageUrl.replace(/'/g, "\\'")
      : '';
    const buttonBackgroundHover = this.buttonBackground
      ? getDarkerColor(this.buttonBackground, 10)
      : '#1565c0';

    const badgeTextColor = checkCollorAccessibility(
      this.white,
      this.badgeBackground
    )
      ? this.white
      : this.black;
    const buttonTextColor = checkCollorAccessibility(
      this.white,
      this.buttonBackground
    )
      ? this.white
      : this.black;

    return html`
      <style>
        :host {
          --image-height: ${this.imageHeight};
          --badge-background: ${this.badgeBackground};
          --badge-text-color: ${badgeTextColor};
          --button-background: ${this.buttonBackground};
          --button-text-color: ${buttonTextColor};
          --button-background-hover: ${buttonBackgroundHover};
        }
        .image-container {
          background-image: url('${sanitizedImageUrl}');
        }
      </style>
      ${this.titlePosition === 'top' && this.title !== ''
        ? html`
            <div class="title-container">
              <h2 class="title">${this.title}</h2>
              ${showBadge
                ? html`<span class="badge">${this.badgeText} ${badgeTextColor}</span>`
                : ''}
            </div>
          `
        : ''}
      ${this.imageUrl !== '' ? html` <div class="image-container"></div> ` : ''}
      ${this.titlePosition === 'below' && this.title !== ''
        ? html`
            <div class="title-container">
              <h2 class="title">${this.title}</h2>
              ${showBadge
                ? html`<span class="badge">${this.badgeText}</span>`
                : ''}
            </div>
          `
        : ''}
      ${this.text !== '' ? html` <p class="text">${this.text}</p> ` : ''}
      ${showButton
        ? html`
            <div class="button-container">
              <a href="${this.buttonLink}" class="button">${this.buttonText}</a>
            </div>
          `
        : ''}
    `;
  }
}

export default AkCard;
