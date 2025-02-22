import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/Aluno';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  alunoAdicionado: boolean = false;
  nome: string = '';
  idade: string = '';
  matricula: string = '';
  detalhes: string = '';
  erroIdade: string = '';

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunos = this.alunoService.listarAlunos();
  }

  adicionarAluno() {
    const idadeMaxima = 116;

    const idadeNumber = +this.idade;
    if (isNaN(idadeNumber)) {
      alert('A idade deve conter apenas números.');
      return;
  }
    const nomeRegex = /^[A-Za-záàãâäéèêëíìîïóòôöõúùûüçÇ ]+$/;
    if (!nomeRegex.test(this.nome)) {
      alert('O nome deve conter apenas letras.');
      return;
    }

    const matriculaRegex = /^[0-9]+$/;
    if (!matriculaRegex.test(this.matricula)) {
      alert('A matrícula deve conter apenas números.');
      return;
    }

    if (+this.idade > idadeMaxima) {
      alert(`Impossível! O ser humano mais velho tem ${idadeMaxima} anos.`);
      return;
    }

    console.log('Dados recebidos:', this.nome, this.idade, this.matricula);

    if (this.nome && this.idade && this.matricula) {
      const novoAluno = new Aluno(this.nome, +this.idade, this.matricula);
      this.alunoService.adicionarAluno(novoAluno);
      this.carregarAlunos();
      this.alunoAdicionado = true;
      setTimeout(() => {
        this.alunoAdicionado = false;
      }, 3000);
      this.nome = '';
      this.idade = '';
      this.matricula = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  removerAluno(matricula: string) {
    this.alunoService.removerAluno(matricula);
    this.carregarAlunos();
    this.detalhes = '';
  }

  mostrarDetalhes(aluno: Aluno) {
    this.detalhes = aluno.apresentar();
  }
}
