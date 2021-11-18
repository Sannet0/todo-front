import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './main-page.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { FormsModule } from "@angular/forms";


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
  ],
  providers: [],
})
export class MainPageModule {}
