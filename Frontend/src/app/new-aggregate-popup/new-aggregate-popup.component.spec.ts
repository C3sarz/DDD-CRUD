import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAggregatePopupComponent } from './new-aggregate-popup.component';

describe('NewAggregatePopupComponent', () => {
  let component: NewAggregatePopupComponent;
  let fixture: ComponentFixture<NewAggregatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAggregatePopupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewAggregatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
