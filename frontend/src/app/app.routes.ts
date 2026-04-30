import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'player-list',
    loadComponent: () => import('./pages/player-list/player-list.page').then(m => m.PlayerListPage)
  },
  {
    path: 'player-detail/:id',
    loadComponent: () => import('./pages/player-detail/player-detail.page').then(m => m.PlayerDetailPage)
  },
  {
    path: 'player-form',
    loadComponent: () => import('./pages/player-form/player-form.page').then(m => m.PlayerFormPage)
  },
  {
    path: 'player-import',
    loadComponent: () => import('./pages/player-import/player-import.page').then(m => m.PlayerImportPage)
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news.page').then(m => m.NewsPage)
  },
  {
    path: 'ideal-team',
    loadComponent: () => import('./pages/ideal-team/ideal-team.page').then(m => m.IdealTeamPage)
  }
];