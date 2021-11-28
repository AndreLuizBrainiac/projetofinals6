import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormEditComponent } from './data-form-edit.component';

describe('DataFormEditComponent', () => {
  let component: DataFormEditComponent;
  let fixture: ComponentFixture<DataFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFormEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
