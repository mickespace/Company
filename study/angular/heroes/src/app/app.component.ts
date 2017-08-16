import { Component, OnInit } from '@angular/core';


import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})

export class AppComponent implements OnInit {

  title = 'first myApp';
  hero: Hero = new Hero();
  isbusy = true;
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) {

  };
  onSelected(data: Hero): void {
    this.selectedHero = data;
  };
  getHeroes(): void {
    this.heroService.getHeroes().then(data => this.heroes = data).catch(() => { alert('asdfadsfa') });
  }
  ngOnInit() {
    this.getHeroes();
  }
}
