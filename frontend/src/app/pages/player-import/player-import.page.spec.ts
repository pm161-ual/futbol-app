import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerImportPage } from './player-import.page';

describe('PlayerImportPage', () => {
  let component: PlayerImportPage;
  let fixture: ComponentFixture<PlayerImportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerImportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
