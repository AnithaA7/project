import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqqComponent } from './faqq.component';

describe('FaqqComponent', () => {
  let component: FaqqComponent;
  let fixture: ComponentFixture<FaqqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqqComponent]
    });
    fixture = TestBed.createComponent(FaqqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
