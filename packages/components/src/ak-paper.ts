import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BackgroundComponent } from './ak-background';
import { defaultStyles } from './helpers';

@customElement('ak-paper')
export class AkPaper extends BackgroundComponent {
  static styles = css`
    :host {
      display: block;
      border-radius: var(--border-radius, 4px);
      box-sizing: border-box;
    }

    ${defaultStyles}

    .paper {
      padding: var(--padding, 16px);
      box-shadow: var(
        --shadow,
        0 1px 3px rgba(0, 0, 0, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.06)
      );
      border: var(--border, 1px solid transparent);
      border-radius: var(--border-radius, 4px);
      color: var(--text-color, #000);
    }

    .title {
      margin: 0 0 8px 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color, #000);
    }

    .text {
      margin: 0;
      font-size: 1rem;
      color: var(--text-color, #000);
    }
  `;

  @property({ type: String }) title: string = 'Default Title';
  @property({ type: String }) text: string = 'Default Text';

  render() {
    return html`
      ${super.render()}
      <div class="paper">
        ${this.title ? html`<h2 class="title">${this.title}</h2>` : ''}
        ${this.text ? html`<p class="text">${this.text}</p>` : ''}
      </div>
    `;
  }
}

export default AkPaper;
