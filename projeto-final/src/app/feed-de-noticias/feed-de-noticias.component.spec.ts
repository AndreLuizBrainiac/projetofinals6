import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDeNoticiasComponent } from './feed-de-noticias.component';

describe('FeedDeNoticiasComponent', () => {
  let component: FeedDeNoticiasComponent;
  let fixture: ComponentFixture<FeedDeNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedDeNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDeNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
