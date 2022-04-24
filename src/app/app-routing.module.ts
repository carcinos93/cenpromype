import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pd', loadChildren: () => import('./pd/pd.module').then(m => m.PdModule)  },
  { path: 'login', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', anchorScrolling: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
