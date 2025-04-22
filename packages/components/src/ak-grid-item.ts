import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ak-grid-item')
export class AkGridItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      all: initial;
    }

    ::slotted(.wrapper) {
      min-width: 0; /* Prevent overflow */
      min-height: 0; /* Allow shrinking, but content will expand */
    }
  `;

  @property({ type: Number, attribute: 'proportion' }) proportion: number = 1; // Proportion of the item (e.g., 1, 2, 3)

  firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const nodes = slot!.assignedElements({ flatten: true });

    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('wrapper');
        Array.from(node.children).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            child.setAttribute('style', `${child.getAttribute('style') ?? ''}; grid-column: span ${this.proportion};`);
          }
        });
      }
    });
  }

  render() {
    return html`
      <slot name="wrapper"></slot>
    `;
  }
}

export default AkGridItem;