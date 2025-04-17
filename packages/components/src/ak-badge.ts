import { html, css, PropertyValues, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkCollorAccessibility, getLighterColor } from './helpers'; 

@customElement('ak-badge')
export class AkBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      border-radius: var(--border-radius, 12px);
      padding: var(--padding, 4px 12px);
      font-size: var(--font-size, 14px);
      line-height: 1.5;
      background: var(--background, transparent);
      color: var(--text-color, #000);
      border: var(--border, none);
      text-align: center;
      font-weight: 800;
      text-transform: uppercase;
    }
  `;

  @property({ type: String }) variant: 'filled' | 'light' | 'outline' = 'filled';
  @property({ type: String }) color: string = '#228be6';
  @property({ type: String }) radius: string = '12px'; 
  @property({ type: String }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
  }

  private getSizeStyles() {
    switch (this.size) {
      case 'xs':
        return { padding: '2px 8px', fontSize: '12px' };
      case 'sm':
        return { padding: '3px 10px', fontSize: '13px' };
      case 'md':
        return { padding: '4px 12px', fontSize: '14px' };
      case 'lg':
        return { padding: '5px 14px', fontSize: '16px' };
      case 'xl':
        return { padding: '6px 16px', fontSize: '18px' };
      default:
        return { padding: '4px 12px', fontSize: '14px' };
    }
  }

  render() {
    const background = this.variant === 'filled' ? this.color : this.variant === 'light' ? getLighterColor(this.color, 40) : '#fff';

    let textColor: string;
    if (this.variant === 'filled') {
      textColor = checkCollorAccessibility('#ffffff', background, 'AA', false) ? '#ffffff' : '#000000';
    } else {
      textColor = this.color;
    }

    const styles = {
      background,
      border: this.variant === 'outline' ? `1px solid ${this.color}` : 'none',
      text: textColor,
    };

    const sizeStyles = this.getSizeStyles();

    return html`
      <style>
        :host {
          --background: ${styles.background};
          --border: ${styles.border};
          --text-color: ${styles.text};
          --border-radius: ${this.radius};
          --padding: ${sizeStyles.padding};
          --font-size: ${sizeStyles.fontSize};
        }
      </style>
      <slot></slot>
    `;
  }
}

export default AkBadge;