import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../../clases/marcador.class';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;
  constructor(private snackBar: MatSnackBar) {
    const marcador = new Marcador(this.lat, this.lng);
    this.marcadores.push(marcador);
    this.traerMarcadores();
  }

  ngOnInit() {
  }
  agregarMarcador(event) {
    const coords: { lat: number, lng: number } = event.coords;
    const marcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(marcador);
    this.guardarStorage();
    this.snackBar.open('marcador creado', 'cerrar');
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  traerMarcadores() {
    this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
  }
  borrarMarcador(idx: number) {
    this.marcadores.splice(idx, 1);
    console.log(this.marcadores);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'cerrar');
  }

}
