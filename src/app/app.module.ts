import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlockComponent } from './block-view/block-view.component';
import { BlockService } from './services/block.service';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
