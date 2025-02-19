export class Pessoa {
  constructor(public nome: string, public idade: number) {}

  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}