import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShapesComponent } from './shapes/shapes.component';
import { PathComponent } from './path/path.component';
import { TextComponent } from './text/text.component';
import { CoordinateComponent } from './coordinate/coordinate.component';
import { AddToProjectComponent } from './add-to-project/add-to-project.component';
import { CanvasComponent } from './canvas/canvas.component';
import { EditorComponent } from './editor/editor.component';
import { MainComponent } from './main/main.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShapesComponent,
    PathComponent,
    TextComponent,
    CoordinateComponent,
    AddToProjectComponent,
    CanvasComponent,
    EditorComponent,
    MainComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
