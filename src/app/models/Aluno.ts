import { Pessoa } from "./Pessoa";

export class Aluno extends Pessoa {
  constructor(nome: string, idade: number, public matricula: string) {
    super(nome, idade);
  }

  override apresentar(): string {
    return `Sou ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`;
  }
}