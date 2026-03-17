// src/app/path/path.component.ts
import { Component } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html'
})
export class PathComponent {
  config$ = this.shapeService.config$;

  constructor(private shapeService: ShapeService) {}

  update(key: string, event: any) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.shapeService.updateConfig({ [key]: value });
  }

  togglePath() {
    const current = this.shapeService.getCurrentConfig().showPath;
    this.shapeService.updateConfig({ showPath: !current });
  }
}