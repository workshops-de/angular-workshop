import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {}
