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
  public serviceList: Service[] = []
  showButtons: boolean = false;
  isDisabled: boolean = true;
  subscription!: Subscription;
  downBtnSubscription!: Subscription;

  constructor(private fileService:FileService, private uiService:UiService ) { // Subscribe to the changes.
    this.subscription = this.uiService.onToggle().subscribe(val => this.showButtons = val) 
    this.downBtnSubscription = this.fileService.onChange().subscribe(val => this.isDisabled = val)
   }

  ngOnInit(): void {
    this.serviceList = this.fileService.serviceList // Get the data from JSON file.
  }

  drop(event: CdkDragDrop<number>): void {
    this.fileService.dropTile(event); // Trigger tile drop.
  }

  redirect(url: string){
    window.open(url) // Open new tab, and redirect user to the URL.
  }

  downloadFile(){
    this.fileService.createFile(this.serviceList) // Download JSON array file.
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
