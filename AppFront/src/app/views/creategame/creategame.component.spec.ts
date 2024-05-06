import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategameComponent } from './creategame.component';

describe('CreategameComponent', () => {
  let component: CreategameComponent;
  let fixture: ComponentFixture<CreategameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreategameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreategameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
