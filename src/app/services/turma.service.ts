import { Injectable } from '@angular/core';
import { Turma } from '../models/Turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private turmas: Turma[] = [];

  listarTurmas(): Turma[] {
    return this.turmas;
  }

  adicionarTurma(turma: Turma) {
    this.turmas.push(turma);
  }

  removerTurma(nome: string) {
    this.turmas = this.turmas.filter(turma => turma.nome !== nome);
  }
}
