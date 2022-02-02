import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Service } from 'src/app/Service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() myService!: Service
  @Input() showBtns!: boolean
  @Output() btnRedirect = new EventEmitter()
  @Output() btnEdit = new EventEmitter()
  @Output() btnDelete = new EventEmitter()
  @ViewChild("myTitle", { static: false }) myTitle!: ElementRef;

  constructor() {
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var sentElement = this.myTitle.nativeElement as HTMLElement
    this.fitText(sentElement) // Font size will change on Page Load, tile edition or when new tile is created.
  }

  fitText(resizeElement: HTMLElement) {
    var element = resizeElement // Label where title is stored
    var parent = element.parentElement as HTMLElement // Parent element which width is defined by flex.
    const maxFontSize = 24; // Maximum font size

    var width = parent.clientWidth -15 // Width of parent -15 px, so it doesn't go too much to the right.
    var contentWidth = element.offsetWidth // Width of label.

    let fontSize = parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'),10); //Get current font size

    if (contentWidth > width){ // If label width is bigger then parent width
      fontSize = Math.ceil(fontSize * width/contentWidth); // Round up new fontSize
      fontSize =  fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize - 1;
      element.style.fontSize = fontSize+'px';
    } 
  }

  onRedirect( url: string ){
    this.btnRedirect.emit(url);
  }

  onEdit( service:Service ){
    this.btnEdit.emit(service);
  }

  onDelete( service:Service ){
    this.btnDelete.emit(service)
  }

}
