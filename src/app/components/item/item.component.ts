import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Service } from 'src/app/Service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() myService!: Service // Service that is passed from parent 
  @Output() btnRedirect = new EventEmitter() // EventEmitter for tile click
  @Output() onAfterViewInit = new EventEmitter() // EventEmitter that triggers after lifecycle hook "ngAfterViewInit()"
  @ViewChild("myTitle", { static: false }) myTitle!: ElementRef; // Reference to label element, where tile name is stored

  constructor(private uiService:UiService) {
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() { 
    var sentElement = this.myTitle.nativeElement as HTMLElement
    this.onAfterViewInit.emit(sentElement) // Emitt event that triggers font resize 
  }

  onRedirect( url: string ){
    this.btnRedirect.emit(url); // Emitt event that user clicked on tile
  }

}
