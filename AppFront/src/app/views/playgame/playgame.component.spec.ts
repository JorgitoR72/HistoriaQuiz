import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygameComponent } from './playgame.component';

describe('PlaygameComponent', () => {
  let component: PlaygameComponent;
  let fixture: ComponentFixture<PlaygameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaygameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
