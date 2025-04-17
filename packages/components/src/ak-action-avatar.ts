import { html, css, PropertyValues, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getLighterColor } from './helpers'; // Adjust path as needed

@customElement('ak-action-avatar')
export class AkActionAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      border-radius: var(--border-radius, 50%);
      background: var(--background, #e6f5ff);
      color: var(--text-color, #228be6);
      text-align: center;
      font-weight: 500;
      text-decoration: none;
      gap: 8px;
    }

    .avatar-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }

    .avatar {
      width: var(--avatar-size, 40px);
      height: var(--avatar-size, 40px);
      border-radius: 50%; /* Always round */
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--avatar-background, #e6f5ff);
      overflow: hidden;
      font-size: var(--font-size, 16px);
      line-height: 1;
      text-transform: uppercase;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar .initials {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar .icon {
      width: 24px;
      height: 24px;
    }

    .text {
      padding: 0 12px 0 12px;
      font-size: var(--font-size, 16px);
    }

    /* SVG icon styles */
    .icon svg {
      width: 100%;
      height: 100%;
      fill: var(--text-color, #228be6);
    }
  `;

  @property({ type: String }) image: string = '';
  @property({ type: String }) text: string = '';
  @property({ type: String }) icon: 'phone' | 'person' | 'email' | 'play' | '' =
    '';
  @property({ type: String }) additionalText: string = '';
  @property({ type: String }) link: string = '';
  @property({ type: String }) color: string = '#228be6'; // Default to blue hex
  @property({ type: String }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'; // Default size

  private getSizeStyles() {
    switch (this.size) {
      case 'xs':
        return { avatarSize: '24px', fontSize: '12px' };
      case 'sm':
        return { avatarSize: '32px', fontSize: '14px' };
      case 'md':
        return { avatarSize: '40px', fontSize: '16px' };
      case 'lg':
        return { avatarSize: '48px', fontSize: '18px' };
      case 'xl':
        return { avatarSize: '56px', fontSize: '20px' };
      default:
        return { avatarSize: '40px', fontSize: '16px' };
    }
  }

  private getInitials(): string {
    if (!this.text) return '';
    const words = this.text.trim().split(/\s+/);
    if (words.length >= 2) {
      // Take first letter of first two words
      return `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase();
    } else {
      // Take first two letters of the single word
      return words[0].slice(0, 2).toUpperCase();
    }
  }

  private getIcon() {
    switch (this.icon || (this.text || this.image ? this.icon : 'person')) {
      case 'phone':
        return html`<svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          />
        </svg>`;
      case 'person':
        return html`<svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>`;
      case 'email':
        return html`<svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>`;
      case 'play':
        return html`<svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>`;
      default:
        return '';
    }
  }

  render() {
    // Use "light" variant styling: colored text, lighter background
    const background = getLighterColor(this.color, 40);
    const textColor = this.color;

    const sizeStyles = this.getSizeStyles();

    // Determine the content of the avatar
    const avatarContent = this.image
      ? html`<img src="${this.image}" alt="Avatar" />`
      : this.text
        ? html`<span class="initials">${this.getInitials()}</span>`
        : html`<div class="icon">${this.getIcon()}</div>`;

    const getavatarWrapper = () => {
      return this.link
        ? html`<a href="${this.link}" target="_blank" class="avatar-link"
            ><div class="avatar">${avatarContent}</div>
            ${this.additionalText
              ? html`<span class="text">${this.additionalText}</span>`
              : ''}</a
          >`
        : html`<div class="avatar-link">
            <div class="avatar">${avatarContent}</div>
            ${this.additionalText
              ? html`<span class="text">${this.additionalText}</span>`
              : ''}
          </div>`;
    };

    return html`
      <style>
        :host {
          --background: ${background};
          --text-color: ${textColor};
          --avatar-background: ${background};
          --border-radius: ${this.additionalText ? '999px' : '50%'};
          --avatar-size: ${sizeStyles.avatarSize};
          --font-size: ${sizeStyles.fontSize};
        }
      </style>
      ${getavatarWrapper()}
    `;
  }
}

export default AkActionAvatar;
