import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from "./main-page.component";
import { TaskItemComponent } from "./task-item/task-item.component";


@NgModule({
  declarations: [
    MainPageComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    MainPageComponent
  ],
  providers: [],
})
export class MainPageModule {}
