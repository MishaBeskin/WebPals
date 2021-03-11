import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/auth/login" },
  { path: "home", component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'git-profiles',
    loadChildren: () => import('./modules/profiles/profiles.module').then(m => m.ProfilesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
