import { Gesture, GestureController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit{
  @ViewChild('rectangle') rectangle: ElementRef;

  private backgrounds: string[] = ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)'];
  private currentColor: string = 'rgba(0, 0, 255, 0.5)';
  private lastOnStart: number = 0;
  private DOUBLE_CLICK_THRESHOLD: number = 500;
  constructor(private gestureCtrl: GestureController) {}
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('this.rectangle = ');
    console.log(this.rectangle);
    const gesture = this.gestureCtrl.create({
      gestureName: 'doubleTap',
      el: this.rectangle.nativeElement,
      threshold: 0,
      onStart: () => { this.onStart(); }
    });
  
    gesture.enable();
  }
  
  private onStart() {
    console.log('test = ');
    const now = Date.now();
  
    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.rectangle.nativeElement.style.setProperty('background', this.getRandomBackground());
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }
  
  private getRandomBackground() {
    const options = this.backgrounds.filter(bg => bg !== this.currentColor);
    this.currentColor = options[Math.floor(Math.random() * options.length)];
  
    return this.currentColor;
  }
}
