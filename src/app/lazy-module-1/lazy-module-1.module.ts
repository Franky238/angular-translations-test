import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../translate.module';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild('lazy-module-1'),
    RouterModule.forChild([
      {
        path: '',
        component: TestComponent,
      },
    ]),
  ],
  declarations: [TestComponent],
})
export class LazyModule1Module {}
