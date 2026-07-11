import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmAvatar } from '../../../../shared/components/ui/avatar/src';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, HlmButtonImports, HlmBadgeImports, HlmAvatarImports, HlmAvatar],
  templateUrl: './hero.html',
})
export class HeroComponent {}
