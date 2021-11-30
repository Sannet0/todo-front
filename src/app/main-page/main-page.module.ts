import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page.component';
import { TaskItemComponent } from './task-item/task-item.component';

@NgModule({
  declarations: [
    MainPageComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule {}
