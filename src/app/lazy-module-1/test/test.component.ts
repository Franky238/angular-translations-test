import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private ts: TranslateService) {}

  ngOnInit() {
    this.ts.getTranslation('en').subscribe((a) => console.log(a));
  }
}
