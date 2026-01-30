import { Routes } from '@angular/router';
import { PresetsListComponent } from './presets-list/presets-list.component';
import { CreateSamplerComponent } from './create-sampler/create-sampler.component';
import { ModifySamplerComponent } from './modify-sampler/modify-sampler.component';

export const routes: Routes = [
  { path: '', component: PresetsListComponent },
  { path: 'createsampler', component: CreateSamplerComponent },
  { path: 'modifysampler/:name', component: ModifySamplerComponent },
  { path: '**', redirectTo: '' }
];
