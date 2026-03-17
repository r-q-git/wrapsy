// src/app/canvas/canvas.component.ts
import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { ShapeService } from '../core/services/shape.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  // Use @ViewChild with a template reference or the component class
  @ViewChild(EditorComponent) editor!: EditorComponent;

  // Now combineLatest and map are recognized
  state$ = combineLatest([
    this.shapeService.config$,
    this.shapeService.shapes$,
  ]).pipe(map(([config, shapes]) => ({ config, shapes })));

  constructor(private shapeService: ShapeService) {}

  getCurrentPath(shapes: any[], id: string): string {
    // Finds the d-attribute for the selected shape [cite: 138]
    return shapes.find((s) => s.id === id)?.d || '';
  }

  getDashArray(type: string): string {
    // Converts UI selection to SVG stroke-dasharray values [cite: 139]
    if (type === 'dashed') return '8,4';
    if (type === 'dotted') return '2,4';
    return '0';
  }

  triggerEditor(event: MouseEvent) {
    event.stopPropagation();
    // This will only work if <app-editor> is present in your template
    if (this.editor) {
      this.editor.show(event.clientX, event.clientY);
    }
  }
}
