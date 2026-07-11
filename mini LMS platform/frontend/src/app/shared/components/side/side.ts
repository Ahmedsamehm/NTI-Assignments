import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side.html',
  styleUrl: './side.css',
})
export class Side {}

