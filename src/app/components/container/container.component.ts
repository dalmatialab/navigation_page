import { Component, OnInit} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FileService } from 'src/app/services/file.service';
import { UiService } from 'src/app/services/ui.service';
import { Service } from 'src/app/Service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public serviceList: Service[] = [] // Service that is passed to child components
  showButtons: boolean = false; // Boolean that defines which item component should be rendered (item/edit-item), changed by slide toggle 
  subscription!: Subscription; // Subscription for slide toggle
  downBtnSubscription!: Subscription; // Subscription for download button

  constructor(private fileService:FileService, private uiService:UiService ) { // Subscribe to the changes.
    this.subscription = this.uiService.onToggle().subscribe(val => this.showButtons = val)
  }

  ngOnInit(): void {
    this.serviceList = this.fileService.serviceList // Get the data from JSON file
  }

  redirect(url: string){
    window.open(url) // Open new tab, and redirect user to the URL
  }

  resizeFont(element: HTMLElement){
    this.uiService.fitText(element) // Font size will change on page load, tile edition or tile creation
  }

  drop(event: CdkDragDrop<number>): void {
    this.fileService.dropTile(event); // Trigger tile drop
  }

  addNewService(){
    this.fileService.addNewService() // Add new Service
  }

  deleteService(service:Service){
    this.fileService.deleteService(service) // Delete Service
  }

  editService(service:Service){ 
    this.fileService.editService(service) //Edit selected Service
  }
}
