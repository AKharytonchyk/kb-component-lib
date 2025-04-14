import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BackgroundComponent } from './ak-background'; // Adjust path as needed

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
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .icon {
      font-size: 1.5rem;
      color: var(--icon-color, #ff922b);
    }

    .content {
      flex: 1;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--title-color, #4a2700);
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
    
    ${super.styles}
  `;

  @property({ type: String }) variant: 'filled' | 'light' | 'outline' = 'light';
  @property({ type: String }) title: string = '';
  @property({ type: String }) icon: string = '⚠';
  @property({ type: Boolean }) withCloseButton: boolean = false;
  @property({ type: String }) borderRadius: string = '';
  @property({ type: String }) padding: string = '';
  @property({ type: String }) color: string = '#ff922b';

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

  private isLightColor(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Calculate luminance (simplified formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5; // Light if luminance > 0.5
  }

  render() {
    if (!this.isVisible) return html``;

    const isLight = this.isLightColor(this.backgroundStyle === 'solid' ? this.solidColor : this.gradientColor1);
    const textColor = isLight ? '#000' : '#fff';
    const iconColor = this.variant === 'filled' ? textColor : this.color;

    const styles = {
      border: this.variant === 'outline' ? `1px solid ${this.color}` : 'none',
      text: this.variant === 'filled' ? textColor : '#333',
      icon: iconColor,
    };

    return html`
      ${this.variant === 'filled' ? super.render() : ''}
      <style>
        :host {
          --border: ${styles.border};
          --text-color: ${textColor};
          --title-color: ${styles.text};
          --icon-color: ${styles.icon};
          --close-button-color: ${styles.text};
          --close-button-hover-color: ${styles.icon};
          --border-radius: ${this.borderRadius || '8px'};
          --padding: ${this.padding || '16px'};
        }
      </style>
      <div class="alert">
        ${this.icon ? html`<span class="icon">${this.icon}</span>` : ''}
        <div class="content">
          ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
          <div class="body">
            <slot></slot>
          </div>
        </div>
        ${this.withCloseButton
          ? html`<button class="close-button" @click=${this.closeAlert}>×</button>`
          : ''}
      </div>
    `;
  }
}

export default AkAlert;