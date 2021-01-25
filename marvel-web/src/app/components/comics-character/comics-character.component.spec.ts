import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsCharacterComponent } from './comics-character.component';

describe('ComicsCharacterComponent', () => {
  let component: ComicsCharacterComponent;
  let fixture: ComponentFixture<ComicsCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
