import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

@customElement('ak-timeline')
export class AkTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      padding-left: 40px; /* Space for the timeline line and circles */
    }

    .timeline-item {
      position: relative;
      margin-bottom: 24px;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-circle {
      position: absolute;
      left: -40px; /* Align with the timeline line */
      top: 12px; /* Adjusted to align with the box */
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--circle-color, #228be6);
      background: white;
      z-index: 1;
    }

    .timeline-circle.inactive {
      border-color: #d9d9d9;
    }

    .timeline-content {
      background: white;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .timeline-title {
      font-weight: bold;
      font-size: 16px;
      margin: 0 0 4px 0;
      color: #333;
    }

    .timeline-description {
      font-size: 14px;
      color: #666;
      margin: 0 0 4px 0;
    }

    .timeline-date {
      font-size: 12px;
      color: #999;
      margin: 0;
    }
  `;

  @property({
    type: Array,
    attribute: 'items',
    converter: (value) =>
      value && (value as string).length > 2 ? JSON.parse(value) : [],
  })
  items: TimelineItem[] = [];
  @property({ type: String, attribute: 'line-color' }) lineColor: string = '#228be6'; // Default blue
  @property({ type: Number, attribute: 'active-items' }) activeItems: number = 0;

  private getTimelineItems() {
    return this.items.map((item, index) => {
      const circleIsActive = index < this.activeItems;
      const lineIsActive = index < this.activeItems - 1;

      // Calculate the height of the line segment
      const lineSegmentHeight =
        index < this.items.length - 1 ? 'calc(100% + 24px)' : '0';

      return html`
        <div class="timeline-item">
          <div
            class="timeline-circle ${circleIsActive ? '' : 'inactive'}"
          ></div>
          ${index < this.items.length - 1
            ? html`
                <div
                  class="timeline-line-segment"
                  style="
                    position: absolute;
                    top: 28px;
                    left: calc(-40px + 8px);
                    width: 2px;
                    height: ${lineSegmentHeight};
                    background: ${lineIsActive ? this.lineColor : '#d9d9d9'};
                    z-index: 0;
                  "
                ></div>
              `
            : ''}
          <div class="timeline-content">
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-description">${item.description}</div>
            <div class="timeline-date">${item.date}</div>
          </div>
        </div>
      `;
    });
  }

  render() {
    return html`
      <style>
        :host {
          --circle-color: ${this.lineColor};
        }
      </style>
      <div class="timeline-line"></div>
      ${this.getTimelineItems()}
    `;
  }
}

export default AkTimeline;
