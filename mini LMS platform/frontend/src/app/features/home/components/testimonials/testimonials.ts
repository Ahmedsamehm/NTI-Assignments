import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSeparator } from '../../../../shared/components/ui/separator/src';

@Component({
  selector: 'app-testimonials',
  imports: [HlmCardImports, HlmSeparatorImports, HlmSeparator],
  templateUrl: './testimonials.html',
})
export class TestimonialsComponent {}
