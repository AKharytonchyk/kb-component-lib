import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultStyles } from './helpers';

@customElement('ak-grid-group')
export class AkGridGroup extends LitElement {
  constructor() {
    super();
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const slot = this.shadowRoot!.querySelector('slot');
          const nodes = slot?.assignedElements({ flatten: true }) || [];
          this.updateSlotStyles(nodes);
        }
      });
    });
  }

  private mutationObserver: MutationObserver;

  private updateSlotStyles(nodes: Element[]) {
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('wrapper');
        node.setAttribute(
          'style',
          `grid-template-columns: repeat(${this.columns}, 1fr);`
        );

        if (!node.hasAttribute('initialized')) {
          node.setAttribute('initialized', 'true');
          this.mutationObserver.observe(node, {
            childList: true,
            subtree: true,
          });
        }

        Array.from(node.children).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            child.setAttribute(
              'style', 'grid-column: span 1;'
            );
          }
        });
      }
    });
  }

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
    this.updateSlotStyles(nodes);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
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