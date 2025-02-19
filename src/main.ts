import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ListaAlunosComponent } from './app/components/lista-alunos/lista-alunos.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([])  // 🔹 Configuração de rotas (se necessário)
  ]
}).catch(err => console.error(err));
