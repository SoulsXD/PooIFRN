import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turma } from '../models/Turma';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  nomeTurma: string = '';

  constructor(private turmaService: TurmaService) {}

  ngOnInit() {
    this.carregarTurmas();
  }

  carregarTurmas() {
    this.turmas = this.turmaService.listarTurmas();
  }

  adicionarTurma() {
    if (!this.nomeTurma.trim()) {
      alert('O nome da turma não pode estar vazio.');
      return;
    }

    const novaTurma = new Turma(this.nomeTurma);
    this.turmaService.adicionarTurma(novaTurma);
    this.carregarTurmas();
    this.nomeTurma = '';
  }

  removerTurma(nome: string) {
    this.turmaService.removerTurma(nome);
    this.carregarTurmas();
  }
}
