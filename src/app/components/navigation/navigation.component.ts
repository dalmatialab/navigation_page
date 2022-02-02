import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UiService } from 'src/app/services/ui.service';
import { FileService } from 'src/app/services/file.service';
import { Subscription } from 'rxjs';
import { Title } from 'src/app/Title';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  serviceList = this.fileService.serviceList
  isChecked: boolean = false;
  title : Title = this.fileService.appTitle
  downBtnSubscription!: Subscription;
  isDisabled: boolean = true;
  @Output() slideToggled= new EventEmitter()

  constructor(private uiService: UiService, private fileService: FileService) {
    this.downBtnSubscription = this.fileService.onChange().subscribe(val => this.isDisabled = val) //Download button
  }

  ngOnInit(): void {
  }

  onToggle(event: MatSlideToggleChange){
    this.isChecked=event.checked
    this.uiService.toggleShowButtons()
  }

  downloadFile(){
    this.fileService.createFile(this.serviceList) // Download JSON array file.
  }

}
