import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {SecureInnerPagesGuard} from "./guards/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]},
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule), canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule), canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'comment/:id',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'event-create',
    loadChildren: () => import('./event-create/event-create.module').then( m => m.EventCreatePageModule)
  },
  {
    path: 'event-detail',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'event-create',
    loadChildren: () => import('./event-create/event-create.module').then( m => m.EventCreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
