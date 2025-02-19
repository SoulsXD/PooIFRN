import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/Aluno';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  alunoAdicionado: boolean = false;
  nome: string = '';
  idade: string = '';
  matricula: string = '';

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunos = this.alunoService.listarAlunos();
  }

  adicionarAluno() {
    console.log('Dados recebidos:', this.nome, this.idade, this.matricula);
    if (this.nome && this.idade && this.matricula) {
      const novoAluno = new Aluno(this.nome, +this.idade, this.matricula);
      this.alunoService.adicionarAluno(novoAluno);
      this.carregarAlunos();
      this.alunoAdicionado = true;
      setTimeout(() => {
        this.alunoAdicionado = false;
      }, 3000);
      // Limpa os campos após adicionar
      this.nome = '';
      this.idade = '';
      this.matricula = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
