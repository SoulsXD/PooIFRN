import { Component } from '@angular/core';
import { ListaAlunosComponent } from './components/lista-alunos/lista-alunos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaAlunosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'atividade-poo';

}