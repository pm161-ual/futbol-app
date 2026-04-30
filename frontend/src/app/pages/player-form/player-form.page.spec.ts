import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerFormPage } from './player-form.page';

describe('PlayerFormPage', () => {
  let component: PlayerFormPage;
  let fixture: ComponentFixture<PlayerFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
