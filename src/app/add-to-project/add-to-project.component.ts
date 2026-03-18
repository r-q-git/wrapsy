import { Component, ViewChild } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';
import { ProjectExportService } from '../core/services/project-export.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
})
export class AddToProjectComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  config$ = this.shapeService.config$;

  constructor(
    private shapeService: ShapeService,
    private projectExport: ProjectExportService,
    private toastService: ToastService,
  ) {}

  private getExportSvg(): string {
    const config = this.shapeService.getCurrentConfig();
    const svgEl = document
      .getElementById('mainSvg')
      ?.cloneNode(true) as HTMLElement;

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
    this.toastService.show('SVG Downloaded Successfully!');
  }

  copyBase64() {
    const svgData = this.getExportSvg();
    const base64 = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
    navigator.clipboard.writeText(base64);
    this.toastService.show('Base64 Copied!');
  }

  addToProject() {
    this.projectExport.exportCurrentDrawing();
  }
}
