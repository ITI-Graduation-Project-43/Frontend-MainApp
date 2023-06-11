import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedSectionComponent } from './trusted-section.component';

describe('TrustedSectionComponent', () => {
  let component: TrustedSectionComponent;
  let fixture: ComponentFixture<TrustedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
