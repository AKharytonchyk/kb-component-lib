import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ak-paper')
export class AkPaper extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .paper {
      padding: var(--padding, 16px);
      border-radius: var(--border-radius, 4px);
      background: var(
        --background-gradient,
        linear-gradient(45deg, #ffffff, #fff)
      );
      box-shadow: var(
        --shadow,
        0 1px 3px rgba(0, 0, 0, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.06)
      );
      border: var(--border, 1px solid transparent);
      color: var(--text-color, #000);
      background-clip: padding-box;
      -webkit-background-clip: padding-box;
    }

    .title {
      margin: 0 0 8px 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--title-color, #000);
    }

    .text {
      margin: 0;
      font-size: 1rem;
      color: var(--text-color, #000);
    }
  `;

  @property({ type: String }) title: string = 'Default Title';
  @property({ type: String }) text: string = 'Default Text';
  @property({ type: String }) backgroundColor: string = '#fff';
  @property({ type: String }) borderColor: string = 'transparent';
  @property({ type: String }) borderRadius: string = '8px';
  @property({ type: String }) padding: string = '16px';
  @property({ type: String }) shadow: boolean = false;
  @property({ type: String }) shadowConifg: string =
    '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
  @property({ type: String }) titleColor: string = '#000';
  @property({ type: String }) textColor: string = '#000';

  render() {
    return html`
      <div
        class="paper"
        style="
          --background-gradient: linear-gradient(
            155deg,
            #ffffff 60%,
            ${this.backgroundColor}
          );
          --border: 1px solid ${this.borderColor};
          --border-radius: ${this.borderRadius};
          --padding: ${this.padding};
          --shadow: ${this.shadow ? this.shadowConifg : 'none'};
          --title-color: ${this.titleColor};
          --text-color: ${this.textColor};
        "
      >
        ${this.title ? html`<h2 class="title">${this.title}</h2>` : ''}
        ${this.text ? html`<p class="text">${this.text}</p>` : ''}
      </div>
    `;
  }
}

export default AkPaper;
