import { Injectable } from '@angular/core';
import { QlIframeMessageService } from './QlIframeMessageService';
import { IframeMessageType } from '../models/iframeMessage.model';
import { ShapeService } from './shape.service'; // Ensure the path is correct

@Injectable({ providedIn: 'root' })
export class ProjectExportService {
  constructor(private shapeService: ShapeService) {}

  /**
   * Captures the current SVG from the Canvas and sends it to the parent project
   */
  exportCurrentDrawing() {
    const config = this.shapeService.getCurrentConfig();
    const svgEl = document
      .getElementById('mainSvg')
      ?.cloneNode(true) as HTMLElement;

    if (!svgEl) {
      console.warn('SVG element not found for export');
      return;
    }

    // 1. Prepare the SVG for export by applying the user-defined export dimensions
    svgEl.setAttribute('width', config.exportWidth.toString());
    svgEl.setAttribute('height', config.exportHeight.toString());

    // 2. Remove the guide path if the user has it hidden in the UI
    if (!config.showPath) {
      const guide = svgEl.querySelector('#guide');
      if (guide) guide.remove();
    }

    // 3. Convert the cleaned SVG to a Base64 string
    const svgString = new XMLSerializer().serializeToString(svgEl);
    const base64Svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

    // 4. Send the message with the proper size and shape metadata
    QlIframeMessageService.sendMessageToParent(
      {
        type: IframeMessageType.ADD_OBJECT,
        payload: {
          dataString: base64Svg,
          type: 'stickerbox',
          metaData: {
            width: config.exportWidth,
            height: config.exportHeight,
            name: `Wrapsy-${config.selectedShapeId}`,
            userInput: config.userInput,
            createdAt: new Date().toISOString(),
            currentConfig: config,
          },
        },
      },
      '*',
    );
  }
}
