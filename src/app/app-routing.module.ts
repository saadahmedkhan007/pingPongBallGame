import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './Components/entry/entry.component';
import { GamePageComponent } from './Components/game-page/game-page.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
  },
  { path: 'gamePage', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
