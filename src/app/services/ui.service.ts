import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showEditTile: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  fitText(resizeElement: HTMLElement) {
    var element = resizeElement // Label where title is stored
    var parent = element.parentElement as HTMLElement // Parent element which width is defined by flex.
    const maxFontSize = 24; // Maximum font size

    var width = parent.clientWidth -15 // Width of parent -15 px, so it doesn't go too much to the right.
    var contentWidth = element.offsetWidth // Width of label.

    let fontSize = parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'),10); // Get current font size

    if (contentWidth > width){ // If label width is bigger then parent width
      fontSize = Math.ceil(fontSize * width/contentWidth); // Round up new fontSize
      fontSize =  fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize - 1;
      element.style.fontSize = fontSize+'px';
    } 
  }

  toggleShowButtons(): void {
    this.showEditTile = !this.showEditTile
    this.subject.next(this.showEditTile)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable(); // Return observable, so subscriptions can be created to track wheather toggle has been slided
  }
}
