import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BackgroundComponent } from './ak-background';

@customElement('ak-alert')
export class AkAlert extends BackgroundComponent {
  static styles = css`
    :host {
      display: block;
      border-radius: var(--border-radius, 4px);
      padding: var(--padding, 16px);
      color: var(--text-color, #4a2700);
      border: var(--border, 1px solid #ff922b);
      position: relative;
      box-shadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
      background: var(--background, #fff);
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .icon {
      font-size: 1.5rem;
      color: var(--icon-color, #ff922b);
      width: 32px;
      height: 32px;
    }

    .content {
      flex: 1;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--text-color, #4a2700);
    }

    .body {
      margin: 0;
      font-size: 1rem;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--close-button-color, #4a2700);
      padding: 0;
      line-height: 1;
    }

    .close-button:hover {
      color: var(--close-button-hover-color, #ff922b);
    }
  `;

  @property({ type: String }) variant: 'filled' | 'light' | 'outline' = 'light';
  @property({ type: String }) title: string = '';
  @property({ type: Boolean }) withCloseButton: boolean = false;
  @property({ type: String }) borderRadius: string = '';
  @property({ type: String }) padding: string = '';
  @property({ type: String }) color: string = '#ff922b';
  @property({ type: String }) iconType: 'warn' | 'info' | 'error' = 'warn';

  @state() private isVisible: boolean = true;

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (changedProperties.has('withCloseButton') && !this.isVisible) {
      this.isVisible = true;
    }
  }

  private closeAlert() {
    this.isVisible = false;
  }

  private getIcon() {
    switch (this.iconType) {
      case 'warn':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zM12 18q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15"
          />
        </svg>`;
      case 'error':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m9.4 14l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 7.4L14.6 6L12 8.6L9.4 6L8 7.4l2.6 2.6L8 12.6zM2 22V2h20v16H6zm3.15-6H20V4H4v13.125zM4 16V4z"
          />
        </svg>`;
      case 'info':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m-1 8h2V9h-2zm-9 7V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
          />
        </svg>`;
      default:
        return '';
    }
  }

  render() {
    if (!this.isVisible) return html``;

    const styles = {
      border: this.variant === 'outline' ? `1px solid ${this.color}` : 'none',
      icon: this.variant === 'filled' ? '' : this.color,
    };

    if (this.variant === 'filled') {
      this.solidColor = this.color;
    }

    return html`
      ${this.variant === 'filled' ? super.render() : ''}
      <style>
        :host {
          --border: ${styles.border};
          --icon-color: var(--text-color, ${styles.icon});
          --close-button-color: var(--text-color, #4a2700);
          --close-button-hover-color: ${styles.icon};
          --border-radius: ${this.borderRadius || '8px'};
          --padding: ${this.padding || '16px'};
        }
      </style>
      <div class="alert">
        ${this.iconType ? html`<div class="icon">${this.getIcon()}</div>` : ''}
        <div class="content">
          ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
          <div class="body">
            <slot></slot>
          </div>
        </div>
        ${this.withCloseButton
          ? html`<button class="close-button" @click=${this.closeAlert}>
              ×
            </button>`
          : ''}
      </div>
    `;
  }
}

export default AkAlert;
