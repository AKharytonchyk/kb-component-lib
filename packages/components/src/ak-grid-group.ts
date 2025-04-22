import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultStyles } from './helpers';

@customElement('ak-grid-group')
export class AkGridGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
      all: initial;
    }

    ${defaultStyles}

    ::slotted(.wrapper) {
      display: grid;
      gap: var(--gap, 16px);
    }
  `;

  @property({ type: Number, attribute: 'columns' }) columns: number = 3;
  @property({ type: String, attribute: 'gap' }) gap: string = '16px';

  firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const nodes = slot!.assignedElements({ flatten: true });

    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('wrapper');
        const hasGridItems = Array.from(node.children).some(child => child.tagName.toLowerCase() === 'ak-grid-item');
        if (!hasGridItems) {
          (node as HTMLElement).style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        }

        Array.from(node.children).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== 'ak-grid-item') {
            child.classList.add('item');
          }
        });
      }
    });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('columns')) {
      const slot = this.shadowRoot!.querySelector('slot');
      const nodes = slot!.assignedElements({ flatten: true });

      nodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          (node as HTMLElement).style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        }
      });
    }
  }

  render() {
    return html`
      <style>
        :host {
          --gap: ${this.gap};
        }
      </style>
      <slot name="wrapper"></slot>
    `;
  }
}

export default AkGridGroup;