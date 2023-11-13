import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganProcurementOrganiserComponent } from './organ-procurement-organiser.component';

describe('OrganProcurementOrganiserComponent', () => {
  let component: OrganProcurementOrganiserComponent;
  let fixture: ComponentFixture<OrganProcurementOrganiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganProcurementOrganiserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganProcurementOrganiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
