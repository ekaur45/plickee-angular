import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCensorComponent } from './add-censor.component';

describe('AddCensorComponent', () => {
  let component: AddCensorComponent;
  let fixture: ComponentFixture<AddCensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
