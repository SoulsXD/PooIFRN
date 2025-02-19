import { Injectable } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { Turma } from '../models/Turma';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private turma: Turma = new Turma("Turma A");

  constructor() {
    this.carregarAlunosDoLocalStorage();
  }

  adicionarAluno(aluno: Aluno) {
    console.log('Tentando adicionar aluno:', aluno);
    const alunoExistente = this.turma.alunos.find(a => a.matricula === aluno.matricula);
    if (!alunoExistente) {
      this.turma.adicionarAluno(aluno);
      this.salvarAlunosNoLocalStorage();
      console.log('Aluno adicionado:', aluno);
    } else {
      console.log('Aluno com essa matrícula já existe:', aluno);
    }
  }

  listarAlunos(): Aluno[] {
    console.log('Listando alunos:', this.turma.alunos);
    return this.turma.alunos;
  }

  removerAluno(matricula: string) {
    this.turma.removerAluno(matricula);
    this.salvarAlunosNoLocalStorage();
  }

  private salvarAlunosNoLocalStorage() {
    localStorage.setItem('alunos', JSON.stringify(this.turma.alunos));
  }

  private carregarAlunosDoLocalStorage() {
    const alunosSalvos = localStorage.getItem('alunos');
    if (alunosSalvos) {
      const alunosParseados: any[] = JSON.parse(alunosSalvos);
      this.turma.alunos = alunosParseados.map(a => new Aluno(a.nome, a.idade, a.matricula));
    }
  }
}
