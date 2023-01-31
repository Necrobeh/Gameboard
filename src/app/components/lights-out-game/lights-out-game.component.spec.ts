import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightsOutGameComponent } from './lights-out-game.component';

describe('LightsOutGameComponent', () => {
  let component: LightsOutGameComponent;
  let fixture: ComponentFixture<LightsOutGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightsOutGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightsOutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
