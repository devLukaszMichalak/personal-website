import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGitComponent } from './my-git.component';

describe('MyGitComponent', () => {
  let component: MyGitComponent;
  let fixture: ComponentFixture<MyGitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
