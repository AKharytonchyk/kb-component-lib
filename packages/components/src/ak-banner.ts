import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ak-banner')
export class AkBanner extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      height: var(--banner-height, 400px); 
      overflow: hidden;
    }

    .banner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      background-size: cover;
      background-position: center;
      background-attachment: var(--background-attachment, fixed);
      background-repeat: no-repeat;
    }

    .content {
      display: flex;
      flex: 1 1 auto;
      margin-block-start: auto;
      justify-content: space-between;
      color: var(--text-color, #fff);
      padding: .75rem 1.5rem;
      background: rgba(0, 0, 0, 0.5); 
    }
    
    .content__text.empty, .links.empty {
      display: none;
    }

    .links {
      display: flex;
      align-items: center;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }

    .text {
      font-size: 0.75rem;
      margin: 10px 0;
    }

    .link-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border: 1px solid transparent;
      border-radius: 4px;
      background-color: var(--button-background, #238be6);
      color: var(--button-color, #fff);
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }

    .link-button:hover {
      background-color: var(
        --button-hover-background,
        #005a9e
      ); 
      border-color: var(
        --button-hover-border,
        #005a9e
      ); 
    }

    .link-button:active {
      background-color: var(
        --button-active-background,
        #00447a
      ); 
      border-color: var(
        --button-active-border,
        #00447a
      ); 
    }

    .link-button:disabled {
      background-color: var(
        --button-disabled-background,
        #e0e0e0
      ); 
      color: var(--button-disabled-color, #a0a0a0); 
      cursor: not-allowed; 
      border-color: var(
        --button-disabled-border,
        #e0e0e0
      ); 
    }
  `;

  @property({ type: String, attribute: 'background-image' }) backgroundImage: string = '';
  @property({ type: String, attribute: 'title' }) title: string = '';
  @property({ type: String, attribute: 'text' }) text: string = '';
  @property({ type: String, attribute: 'link' }) link: string = '';
  @property({ type: String, attribute: 'link-text' }) linkText: string = 'Learn More';
  @property({ type: Number, attribute: 'banner-height' }) bannerHeight: number = 400;
  @property({ type: Boolean, attribute: 'parallax' }) parallax: boolean = true;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('bannerHeight')) {
      this.style.setProperty('--banner-height', `${this.bannerHeight}px`);
    }
    if (changedProperties.has('parallax')) {
      this.style.setProperty(
        '--background-attachment',
        this.parallax ? 'fixed' : 'scroll'
      );
    }
  }

  render() {
    return html`
      <div
        class="banner"
        style="
          background-image: url('${this.backgroundImage}');
        "
      >
        <div class="content">
            <div class="content__text ${!this.text && !this.title ? 'empty' : ''}">
            ${this.title ? html`<h1 class="title">${this.title}</h1>` : ''}
            ${this.text ? html`<p class="text">${this.text}</p>` : ''}
            </div>
          <div class="links ${!this.link ? 'empty' : ''}">
          ${this.link
            ? html`<a href="${this.link}" class="link-button">${this.linkText}</a>`
            : ''}
          </div>
        </div>
      </div>
    `;
  }
}