import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedSectionComponent } from './top-rated-section.component';

describe('TopRatedSectionComponent', () => {
  let component: TopRatedSectionComponent;
  let fixture: ComponentFixture<TopRatedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
