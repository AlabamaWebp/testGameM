import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskSideComponent } from './ask-side.component';

describe('AskSideComponent', () => {
  let component: AskSideComponent;
  let fixture: ComponentFixture<AskSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
