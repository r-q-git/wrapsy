// src/app/editor/editor.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: [`
    #floatingInputContainer {
      position: fixed;
      z-index: 100;
      width: 300px;
    }
  `]
})
export class EditorComponent {
  isVisible = false;
  position = { x: 0, y: 0 };
  config$ = this.shapeService.config$;

  constructor(private shapeService: ShapeService) {}

  // This will be triggered by a global event listener or service call
  show(x: number, y: number) {
    this.position = { x: x - 150, y: y - 50 };
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onInput(event: any) {
    this.shapeService.updateConfig({ userInput: event.target.value });
  }
}