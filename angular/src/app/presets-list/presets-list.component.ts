import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { PresetsService, Preset } from '../presets.service';

@Component({
  selector: 'app-presets-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presets-list.component.html',
  styleUrls: ['./presets-list.component.css']
})
export class PresetsListComponent implements OnInit {
  presets: Preset[] = [];
  loading = false;
  error: string | null = null;

  constructor(private svc: PresetsService) {}

  ngOnInit(): void {
    this.load();
  }
  // fonction de chargement de la liste des presets depuis le back end
  // appelé lors de l'initialisation du composant et après chaque modification
  load() {
    this.loading = true;
    this.error = null;
    this.svc
      .list()
      .pipe(
        finalize(() => {
          // Toujours désactiver le message "Loading" quand la requête se termine
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Presets chargés depuis API', res);
          this.presets = res || [];
        },
        error: (err) => {
          console.error('Erreur lors du chargement des presets', err);
          this.error = String(err?.message || err);
        }
      });
  }
  // fonction de renommage de preset
  async rename(p: Preset) {
    const n = prompt('Nouveau nom pour le preset', p.name);
    if (!n || n.trim() === '' || n === p.name) return;
    this.svc.rename(p.name, n).subscribe({ next: () => this.load(), error: (e) => alert('Erreur: '+(e?.message||e)) });
  }
  // fonction de suppression de preset avec confirmation
  delete(p: Preset) {
    if (!confirm(`Supprimer le preset "${p.name}" ?`)) return;
    this.svc.delete(p.name).subscribe({
      next: () => this.load(),
      error: (e) => alert('Erreur lors de la suppression: ' + (e?.message || e))
    });
  }
}
