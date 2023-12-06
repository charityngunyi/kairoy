import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KairoysComponent } from './kairoys.component';

describe('KairoysComponent', () => {
  let component: KairoysComponent;
  let fixture: ComponentFixture<KairoysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KairoysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KairoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
