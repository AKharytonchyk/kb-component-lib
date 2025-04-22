import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defaultStyles } from './helpers';

@customElement('ak-flex-group')
export class AkFlexGroup extends LitElement {
  constructor() {
    super();
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          console.warn('Go go power rangers');

          const slot = this.shadowRoot!.querySelector('slot');
          const nodes = slot?.assignedElements({ flatten: true }) || [];
          this.updateSlotStyles(nodes);
        }
      });
    });
  }

  private mutationObserver: MutationObserver;

  static styles = css`
    :host {
      display: block;
      all: initial;
    }

    ${defaultStyles}

    ::slotted(.wrapper) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: var(--gap, 16px);
    }
  `;

  @property({ type: String, attribute: 'gap' }) gap: string = '16px';

  private updateSlotStyles(nodes: Element[]) {
    console.warn('updateSlotStyles called');
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('wrapper');
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
              'style',
              `${child.getAttribute('style')}; flex: 1 1 auto;`
            );
          }
        });
      }
    });
  }

  firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const nodes = slot?.assignedElements({ flatten: true }) || [];

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

export default AkFlexGroup;
