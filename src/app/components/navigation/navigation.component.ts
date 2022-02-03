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
  isChecked: boolean = false; // Boolean that sets toggle default value
  title : Title = {titleName: ""} // Title of the application
  downBtnSubscription!: Subscription; // Subscription for download button
  isDisabled: boolean = true; // Boolean that defines whether button should be shown or not

  constructor(private uiService: UiService, private fileService: FileService) {
    this.downBtnSubscription = this.fileService.onChange().subscribe(val => this.isDisabled = val) //Download button
  }

  ngOnInit(): void {
    this.title = this.fileService.appTitle // Get title from file service
  }

  onToggle(event: MatSlideToggleChange){ // Trigger slide toggle
    this.isChecked=event.checked
    this.uiService.toggleShowButtons()
  }

  downloadFile(){
    this.fileService.createFile() // Download JSON array file 
  }

}
