import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'player-card',
  styleUrl: 'player-card.css',
  shadow: true,
})
export class PlayerCard {

  @Prop() nombre!: string;
  @Prop() equipo!: string;
  @Prop() liga!: string;
  @Prop() posicion!: string;
  @Prop() edad!: number;
  @Prop() nacionalidad!: string;
  @Prop() imagen!: string;

  render() {
    return (
      <div class="card">
        <img src={this.imagen} alt={this.nombre} />
        <div class="info">
          <h2>{this.nombre}</h2>
          <p><strong>Equipo:</strong> {this.equipo}</p>
          <p><strong>Liga:</strong> {this.liga}</p>
          <p><strong>Posición:</strong> {this.posicion}</p>
          <p><strong>Edad:</strong> {this.edad}</p>
          <p><strong>Nacionalidad:</strong> {this.nacionalidad}</p>
        </div>
      </div>
    );
  }
}