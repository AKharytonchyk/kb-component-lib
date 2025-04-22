import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Renderer, marked } from 'marked';
import { defaultStyles } from './helpers';

interface AccordionItem {
  title: string;
  md: string;
  text: string;
  links?: AccordionItemLink[];
}

interface AccordionItemLink {
  text: string;
  href: string;
}

@customElement('ak-accordion')
export class AkAccordion extends LitElement {
  constructor() {
    super();

    this._renderMarkdown = new Renderer();
    this._renderMarkdown.link = ({ href, title, text }) => {
      return `<a href="${href}" target="_blank" class="link-button">${text}</a>`;
    };
  }

  private _renderMarkdown: Renderer;

  static styles = css`
    :host {
      all: initial;
      display: block;
      border-radius: var(--border-radius, 4px);
      overflow: hidden;
    }

    ${defaultStyles}

    .item {
      border-bottom: var(--item-border, 1px solid #e0e0e0);
    }

    .item:last-child {
      border-bottom: none;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--header-padding, 12px 16px);
      background: var(--header-background, #f9f9f9);
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;
    }

    .header:hover {
      background: var(--header-hover-background, #f0f0f0);
    }

    .title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--title-color, #000);
    }

    .chevron {
      font-size: 0.875rem;
      transition: transform 0.2s ease;
    }

    .open .chevron {
      transform: rotate(180deg);
    }

    .content {
      display: none;
      padding: var(--content-padding, 16px);
      background: var(--content-background, #fff);
      color: var(--text-color, #000);
    }

    .open .content {
      display: block;
    }

    .links {
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 8px;
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
      background-color: var(--button-hover-background, #005a9e);
      border-color: var(--button-hover-border, #005a9e);
    }

    .link-button:active {
      background-color: var(--button-active-background, #00447a);
      border-color: var(--button-active-border, #00447a);
    }

    .link-button:disabled {
      background-color: var(--button-disabled-background, #e0e0e0);
      color: var(--button-disabled-color, #a0a0a0);
      cursor: not-allowed;
      border-color: var(--button-disabled-border, #e0e0e0);
    }
  `;

  // Properties for the items and styling
  @property({
    type: Array,
    converter: (input) =>
      (input as string)?.length > 0 ? JSON.parse(input as string) : [],
  })
  items: AccordionItem[] = [];
  @property({ type: String, attribute: 'header-background' }) headerBackground: string = '';
  @property({ type: String }) headerHoverBackground: string = '';
  @property({ type: String }) contentBackground: string = '';
  @property({ type: String }) itemBorder: string = '';
  @property({ type: String }) headerPadding: string = '';
  @property({ type: String }) contentPadding: string = '';
  @property({ type: String }) borderRadius: string = '';
  @property({ type: String }) titleColor: string = '';
  @property({ type: String }) textColor: string = '';

  // Internal state to track the open item
  @state() private _openIndex: number = -1;

  // Toggle the open state of an item
  private _toggleItem(index: number) {
    this._openIndex = this._openIndex === index ? -1 : index;
  }

  // Render the accordion
  render() {
    return html`
      <style>
        :host {
          --header-background: ${this.headerBackground || '#f9f9f9'};
          --header-hover-background: ${this.headerHoverBackground || '#f0f0f0'};
          --content-background: ${this.contentBackground || '#fff'};
          --item-border: ${this.itemBorder || '1px solid #e0e0e0'};
          --header-padding: ${this.headerPadding || '12px 16px'};
          --content-padding: ${this.contentPadding || '16px'};
          --border-radius: ${this.borderRadius || '4px'};
          --title-color: ${this.titleColor || '#000'};
          --text-color: ${this.textColor || '#000'};
        }
      </style>
      ${this.items.map(
        (item, index) => html`
          <div class="item ${this._openIndex === index ? 'open' : ''}">
            <div class="header" @click=${() => this._toggleItem(index)}>
              <span class="title">${item.title}</span>
              <span class="chevron"
                >${this._openIndex === index ? '▼' : '▶'}</span
              >
            </div>
            <div class="content">
              <p>
                ${item.md
                  ? unsafeHTML(
                      marked(item.md, {
                        renderer: this._renderMarkdown,
                      }) as string
                    )
                  : item.text}
              </p>
              <div
                class="links"
                display="${this._openIndex === index ? 'block' : 'none'}"
              >
                ${item.links
                  ? item.links.map(
                      (link) => html`
                        <a
                          class="link-button"
                          href="${link.href}"
                          target="_blank"
                          >${link.text}</a
                        >
                      `
                    )
                  : ''}
              </div>
            </div>
          </div>
        `
      )}
    `;
  }
}

export default AkAccordion;
