import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('rectangle', { static: true, read: ElementRef }) rectangle: ElementRef;
  private gesture: Gesture;
  constructor(private gestureCtrl: GestureController) {}
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.gesture = this.gestureCtrl.create({
      gestureName: 'doubleTap',
      el: this.rectangle.nativeElement,
      threshold: 0,
      onStart: () => { this.onStart();},
      onMove: ev => this.onMoveHandler(ev),
      onEnd: ev => {this.onEnd()}
    }, true);
  
    this.gesture.enable();
  }

  private onEnd() {
    this.rectangle.nativeElement.style.transition = ".3s ease-out";
    this.rectangle.nativeElement.style.transform = `translate(0, 0)`;  }


  private onMoveHandler(ev) {
    console.log('ev = ');
    console.log(ev);
    this.rectangle.nativeElement.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
  }
  
  private onStart() {
    this.rectangle.nativeElement.style.transition = "none";
  }
  
}
