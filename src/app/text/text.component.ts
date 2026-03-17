// src/app/text/text.component.ts
import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../core/services/shape.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
  config$ = this.shapeService.config$;
  fonts: any[] = [];

  constructor(private shapeService: ShapeService) {}

  ngOnInit() {
    fetch('assets/fonts.json')
      .then(res => res.json())
      .then(data => this.fonts = data);
  }

  update(key: string, event: any) {
    this.shapeService.updateConfig({ [key]: event.target.value });
  }
}