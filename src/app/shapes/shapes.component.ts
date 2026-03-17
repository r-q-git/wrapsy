// src/app/shapes/shapes.component.ts
import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-shapes',
  templateUrl: './shapes.component.html'
})
export class ShapesComponent implements OnInit {
  shapes$ = this.shapeService.shapes$;
  config$ = this.shapeService.config$;

  constructor(private shapeService: ShapeService) {}

  ngOnInit() {
    // Initially load shapes from your JSON/Assets
    fetch('assets/shapes.json')
      .then(res => res.json())
      .then(data => this.shapeService.setShapes(data));
  }

  selectShape(id: string) {
    this.shapeService.updateConfig({ selectedShapeId: id });
  }

  handleSvgUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(e.target.result, "image/svg+xml");
      
      // Extract text content if available
      const textEl = doc.querySelector("text") || doc.querySelector("tspan");
      if (textEl) {
        this.shapeService.updateConfig({ userInput: textEl.textContent?.trim() || '' });
      }

      // Extract path and add to carousel
      const path = doc.querySelector("path");
      if (path) {
        const newId = "custom-" + Date.now();
        const d = path.getAttribute("d") || '';
        this.shapeService.addCustomShape({ id: newId, name: "Uploaded", d });
        this.shapeService.updateConfig({ selectedShapeId: newId });
      }
    };
    reader.readAsText(file);
  }
}