// src/app/add-to-project/add-to-project.component.ts
import { Component } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html'
})
export class AddToProjectComponent {
  config$ = this.shapeService.config$;

  constructor(private shapeService: ShapeService) {}

  private getExportSvg(): string {
    const config = this.shapeService.getCurrentConfig();
    const svgEl = document.getElementById('mainSvg')?.cloneNode(true) as HTMLElement;
    
    if (svgEl) {
      svgEl.setAttribute('width', config.exportWidth.toString());
      svgEl.setAttribute('height', config.exportHeight.toString());
      
      // Remove guide path if hidden
      if (!config.showPath) {
        svgEl.querySelector('#guide')?.remove();
      }
      return new XMLSerializer().serializeToString(svgEl);
    }
    return '';
  }

  downloadSVG() {
    const svgData = this.getExportSvg();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `wrapsy-export-${Date.now()}.svg`;
    link.click();
  }

  copyBase64() {
    const svgData = this.getExportSvg();
    const base64 = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
    navigator.clipboard.writeText(base64);
    alert('Base64 Copied!');
  }

  addToProject() {
    console.log('Pushing to project database...', this.shapeService.getCurrentConfig());
    // Logic for your specific project integration goes here
  }
}