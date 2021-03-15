import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Pokemon, PokemonId, Type } from '../shared/models';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  types: Type[];
  selectedId: number;
  filteredPokemons: Pokemon[];
  currentPokemons: Pokemon[];
  
  constructor(
    private shared: SharedService,
    private route: ActivatedRoute,
    private router: Router) {}

  onSelect(pokemon) {
    this.router.navigate(['/details', pokemon.id]);
  }

  filterT(props) {
    this.currentPokemons = null
    if(props==0) {
      return this.showAllPokemons();
    }
    this.shared.getPokemonsByType(props).subscribe((pokemon: Pokemon[]) => {
      pokemon.map(each=> this.shared.getPokeById(each.id).subscribe((details: PokemonId)=>{each['details'] = details}))
      this.currentPokemons = pokemon;
    });
  }

  showAllPokemons() {
    this.currentPokemons = null
    this.shared.getPoke().subscribe((pokemon: Pokemon[]) => {
      pokemon.map(each  => this.shared.getPokeById(each.id).subscribe((details: PokemonId)=>{each['details'] = details}));
      this.currentPokemons = pokemon;
    });
  }

  ngOnInit() {
    this.showAllPokemons(); 
    this.route.paramMap.subscribe((params: ParamMap)=> {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
    this.shared.getListofTypes().subscribe((type: Type[]) => {
      this.types = type;
    });
  }
}
