import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Service } from 'src/app/Service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() myService!: Service // Service that is passed from parent
  @Output() btnEdit = new EventEmitter() // EventEmitter when edit button is clicked
  @Output() btnDelete = new EventEmitter() // EventEmitter when delete button is clicked
  @Output() onAfterViewInit = new EventEmitter() // EventEmitter that triggers after lifecycle hook "ngAfterViewInit()"
  @ViewChild("myTitle", { static: false }) myTitle!: ElementRef; // Reference to label element, where tile name is stored

  constructor(private uiService: UiService) { }

  ngOnInit(): void {}
  ngAfterViewInit() {
    var sentElement = this.myTitle.nativeElement as HTMLElement
    this.onAfterViewInit.emit(sentElement)  // Emitt event that triggers font resize 
  }

  onEdit( service:Service ){
    this.btnEdit.emit(service); // Emitt event that user clicked on edit button
  }

  onDelete( service:Service ){
    this.btnDelete.emit(service) // Emitt event that user clicked on delete button
  }

}
