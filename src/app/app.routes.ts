import { Routes } from '@angular/router';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/lista-alunos', pathMatch: 'full' },
  { path: 'lista-alunos', component: ListaAlunosComponent }
];
