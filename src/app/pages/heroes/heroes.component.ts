import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe(res =>{ 
      this.heroes = res;
      this.cargando = false;
    });
  }

  eliminarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `esta seguro de eliminar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(
      res => {
        if(res.value){
          this.heroes.splice(index,1);
          this.heroesService.borrarHeroe(heroe.id).subscribe();
        }
      }
    )
  }

}
