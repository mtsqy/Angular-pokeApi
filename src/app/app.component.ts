import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Pokemon, PokemonId } from './shared/models';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'NostraWebDevAssignment';
  
  @ViewChild('searchbox') searchbox: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  currentPokemons: Pokemon[];
  selectedId: number;

  constructor(
    private shared: SharedService,
    private route: ActivatedRoute,
    private router: Router) {}

  showAllPokemons() {
    this.shared.getPoke().subscribe((pokemon: Pokemon[]) => {
      this.currentPokemons = pokemon;
      pokemon.map(each=> this.shared.getPokeById(each.id).subscribe((details: PokemonId)=>{each['details'] = details}))
    });
  }

  isSelected(pokemon) {
    return pokemon.id === this.selectedId;
  }

  ngOnInit() {
    this.showAllPokemons();
    this.route.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }
}
