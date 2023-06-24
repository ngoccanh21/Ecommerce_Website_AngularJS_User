import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitiettintucComponent } from './chitiettintuc.component';

describe('ChitiettintucComponent', () => {
  let component: ChitiettintucComponent;
  let fixture: ComponentFixture<ChitiettintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitiettintucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitiettintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
