// src/app/core/services/shape.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SvgConfig {
  selectedShapeId: string;
  userInput: string;
  fontSize: number;
  textColor: string;
  startOffset: number;
  textDy: number;
  showPath: boolean;
  pathColor: string;
  pathStrokeType: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  letterSpacing: number;
  wordSpacing: number;
  strokeWidth: number;
  textAnchor: string;
  vbWidth: number;
  vbHeight: number;
  exportWidth: number;
  exportHeight: number;
}

@Injectable({ providedIn: 'root' })
export class ShapeService {
  private initialState: SvgConfig = {
    selectedShapeId: 'circle-1',
    userInput: 'Click Here To Edit!',
    fontSize: 14,
    textColor: '#0f172a',
    startOffset: 50,
    textDy: 1,
    showPath: true,
    pathColor: '#ff9100',
    pathStrokeType: 'solid',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 1,
    wordSpacing: 1,
    strokeWidth: 1,
    textAnchor: 'middle',
    vbWidth: 300,
    vbHeight: 300,
    exportWidth: 800,
    exportHeight: 800,
  };

  private configSubject = new BehaviorSubject<SvgConfig>(this.initialState);
  config$ = this.configSubject.asObservable();

  // Observable for the list of shapes (including uploaded ones)
  private shapesSubject = new BehaviorSubject<any[]>([]);
  shapes$ = this.shapesSubject.asObservable();

  getCurrentConfig(): SvgConfig {
    return this.configSubject.value;
  }

  updateConfig(newConfig: Partial<SvgConfig>) {
    this.configSubject.next({ ...this.configSubject.value, ...newConfig });
  }

  setShapes(shapes: any[]) {
    this.shapesSubject.next(shapes);
  }

  addCustomShape(shape: any) {
    const current = this.shapesSubject.value;
    this.shapesSubject.next([...current, shape]);
  }
}
