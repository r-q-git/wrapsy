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
  @ViewChild(EditorComponent) editor!: EditorComponent;

  state$ = combineLatest([
    this.shapeService.config$,
    this.shapeService.shapes$,
  ]).pipe(map(([config, shapes]) => ({ config, shapes })));

  constructor(private shapeService: ShapeService) {}

  getCurrentPath(shapes: any[], id: string): string {
    return shapes.find((s) => s.id === id)?.d || '';
  }

  getDashArray(type: string): string {
    if (type === 'dashed') return '8,4';
    if (type === 'dotted') return '2,4';
    return '0';
  }

  triggerEditor(event: MouseEvent) {
    event.stopPropagation();

    if (this.editor) {
      this.editor.show(event.clientX, event.clientY);
    }
  }
  closeEditor() {
    if (this.editor && this.editor.isVisible) {
      this.editor.hide();
    }
  }
}
