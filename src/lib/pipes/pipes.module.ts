import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './file-size/file-size.pipe';
import { HighlightPipe } from './highlight/highlight.pipe';
import { ContainsPipe } from './contains/contains.pipe';
import { IllionsPipe } from './illions/illions.pipe';
import { InsertHtmlPipe } from './insert-html/insert-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FileSizePipe,
    HighlightPipe,
    ContainsPipe,
    IllionsPipe,
    InsertHtmlPipe
  ],

  exports: [
    FileSizePipe,
    HighlightPipe,
    ContainsPipe,
    IllionsPipe,
    InsertHtmlPipe
  ]
})
export class PipesModule {}
