import { Aluno } from "./Aluno";

export class Turma {
  constructor(public nome: string, public alunos: Aluno[] = []) {}

  adicionarAluno(aluno: Aluno) {
    this.alunos.push(aluno);
  }

  removerAluno(matricula: string) {
    this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
  }
}