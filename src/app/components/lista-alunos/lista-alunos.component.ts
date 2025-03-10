import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/Aluno';
import { TurmaService } from '../../services/turma.service';
import { Turma } from '../../models/Turma';

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
  turmaSelecionada: string = '';
  turmas: Turma[] = [];
  novaTurmaNome: string = '';

  constructor(private alunoService: AlunoService, private turmaService: TurmaService) {}

  ngOnInit() {
    this.carregarAlunos();
    this.carregarTurmas();
  }

  carregarAlunos() {
    this.alunos = this.alunoService.listarAlunos();
  }

  carregarTurmas() {
    const turmasSalvas = localStorage.getItem('turmas');
    if (turmasSalvas) {
      this.turmas = JSON.parse(turmasSalvas);
    } else {
      this.turmas = this.turmaService.listarTurmas();
    }
  }

  salvarTurmas() {
    localStorage.setItem('turmas', JSON.stringify(this.turmas));
  }

  adicionarAluno() {
    if (!this.turmaSelecionada) {
      alert('Selecione uma turma para adicionar o aluno.');
      return;
    }
    const novaTurma = this.turmas.find(t => t.nome === this.turmaSelecionada);
    if (!novaTurma) {
      alert('Turma inválida.');
      return;
    }

    const idadeMaxima = 116;

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

    const idadeRegex = /^[0-9]+$/;
    if (!idadeRegex.test(this.idade)) {
      alert('A idade deve conter apenas números.');
      return;
    }

    const idadeNumber = +this.idade;
    if (idadeNumber > idadeMaxima) {
      alert(`Impossível! O ser humano mais velho tem ${idadeMaxima} anos.`);
      return;
    }

    if (idadeNumber < 0) {
      alert('Nem nasceu ainda? Como está digitando? 🤔');
      return;
    }

    console.log('Dados recebidos:', this.nome, this.idade, this.matricula);

    if (this.nome && this.idade && this.matricula) {
      const novoAluno = new Aluno(this.nome, +this.idade, this.matricula);
      novaTurma.adicionarAluno(novoAluno);
      this.alunoAdicionado = true;
      setTimeout(() => {
        this.alunoAdicionado = false;
      }, 3000);
      this.nome = '';
      this.idade = '';
      this.matricula = '';
      this.salvarTurmas();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  adicionarTurma() {
    if (!this.novaTurmaNome.trim()) {
      alert('O nome da turma não pode estar vazio!');
      return;
    }
    const turmaExistente = this.turmas.some(turma => turma.nome.toLowerCase() === this.novaTurmaNome.toLowerCase());
    if (turmaExistente) {
      alert('Já existe uma turma com esse nome!');
      return;
    }

    const novaTurma = new Turma(this.novaTurmaNome);
    this.turmaService.adicionarTurma(novaTurma);
    this.turmas.push(novaTurma);
    this.novaTurmaNome = '';
    this.salvarTurmas();
  }

  removerAluno(matricula: string, turmaNome: string) {
    const turma = this.turmas.find(t => t.nome === turmaNome);  
    if (turma) {
      turma.alunos = turma.alunos.filter(aluno => aluno.matricula !== matricula);
      this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
      this.salvarTurmas();
    }
  }
  
  mostrarDetalhes(aluno: Aluno) {
    this.detalhes = aluno.apresentar();
  
    setTimeout(() => {
      this.detalhes = '';
    }, 5000);
  }

  removerTurma(nomeTurma: string) {
    const confirmar = confirm(`Tem certeza que deseja remover a turma "${nomeTurma}" e todos os seus alunos?`);
    if (confirmar) {
      this.turmas = this.turmas.filter(turma => turma.nome !== nomeTurma);
      this.salvarTurmas();
    }
  }
}