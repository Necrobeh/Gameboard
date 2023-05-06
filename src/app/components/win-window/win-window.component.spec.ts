import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinWindowComponent } from './win-window.component';

describe('WinWindowComponent', () => {
  let component: WinWindowComponent;
  let fixture: ComponentFixture<WinWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
