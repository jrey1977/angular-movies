import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { PosterPipe } from './poster.pipe';
import { RoundPipe } from './round.pipe';
import { HoursPipe } from './hours.pipe';



@NgModule({
  declarations: [TruncatePipe, PosterPipe, RoundPipe, HoursPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    PosterPipe,
    RoundPipe,
    HoursPipe
  ]
})
export class PipesModule { }
