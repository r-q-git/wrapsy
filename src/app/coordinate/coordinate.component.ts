// src/app/coordinate/coordinate.component.ts
import { Component } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-coordinate',
  templateUrl: './coordinate.component.html'
})
export class CoordinateComponent {
  config$ = this.shapeService.config$;

  constructor(private shapeService: ShapeService) {}

  update(key: string, event: any) {
    this.shapeService.updateConfig({ [key]: Number(event.target.value) });
  }
}