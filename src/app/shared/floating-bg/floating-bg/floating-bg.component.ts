import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-floating-bg',
  templateUrl: './floating-bg.component.html',
  styleUrls: ['./floating-bg.component.css']
})
export class FloatingBgComponent implements OnInit {
  @Input() image: string;
  @Input() animated: boolean;
  styles: any;
  classes: string[] = ['floating-bg'];

  constructor(
    private deviceDetectorService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.styles = {};
    if (!this.deviceDetectorService.isDesktop()) {
      this.styles = {
        'background-image': `url('${this.image || 'assets/images/background.jpg' }')`
      };
      if (this.animated) {
        this.classes.push('animated');
      }
    }
  }
}
