import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleInstructionsComponent } from './wordle-instructions.component';

describe('WordleInstructionsComponent', () => {
  let component: WordleInstructionsComponent;
  let fixture: ComponentFixture<WordleInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordleInstructionsComponent]
    });
    fixture = TestBed.createComponent(WordleInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
