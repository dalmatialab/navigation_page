import { Injectable } from '@angular/core';
import { Service } from '../Service';
import { Title } from '../Title';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  serviceList: Service[] = []
  appTitle: Title = {titleName: ""}
  isDisabled: boolean = true;
  private subject = new Subject<any>();
  private _jsonURL = "/data.json"

  constructor(private dialog:MatDialog, private http:HttpClient) {
    this.getJSON().subscribe(data => {
      this.serviceList.splice(0,this.serviceList.length, ...data.services as Service[]) // Update tile data
      this.appTitle.titleName = data.title // Update application title
    })
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);  // In production mode it will fetch data.json from server. In development will read local data.json file.
  }

  addNewService(){

    var emptyService: Service = { //This empty service is used as default in the modal component.
      name: "",
      url: "",
      tileColor: {
        red: 0,
        green: 0,
        blue: 0
      },
      fontColor: "white",
      iconType: "link"
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus=true
    dialogConfig.data = emptyService
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data=>{
      if(data != undefined){ // To avoid Close button.
        this.serviceList.push(data)
        this.isDisabled = false // Show the download button.
        this.subject.next(this.isDisabled) // This executes change of the subject.
      }
    })
  }

  onChange(): Observable<any> {
    return this.subject.asObservable() // Return subject as Observable
  }

  dropTile(event: CdkDragDrop<number>){
    let beforeChange: Service [] = Object.assign([],this.serviceList) // Get the state before change.
    moveItemInArray( 
      this.serviceList,
      event.previousContainer.data,
      event.container.data
    );
    if (JSON.stringify(beforeChange) !== JSON.stringify(this.serviceList)){ // Enable download button if there are any changes!
      this.isDisabled = false
      this.subject.next(this.isDisabled) // This executes change of the subject.
    }
  }

  deleteService(service: Service){
    const index = this.serviceList.indexOf(service) // Get the index of the service that needs to be deleted.
    if (index > -1){
      this.serviceList.splice(index,1) // Remove first occurance of that service.
      this.isDisabled = false // Show the download button.
      this.subject.next(this.isDisabled) // This executes change of the subject.
    }
  }

  editService(service: Service){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; //Close modal if you click somewhere else.
    dialogConfig.autoFocus=true

    dialogConfig.data = service //Forward service parameter into modal.
    const dialogRef=this.dialog.open(DialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined){ //If the user clicked save button, change forwarded service.
        let beforeChange: Service [] = Object.assign([],this.serviceList)

        var formData: Service = data // Set type to data that was outputted from Modal.
        const indexOfService = this.serviceList.indexOf(service) // Get the index of the service that was edited.

        this.serviceList[indexOfService] = formData // Replace that service with the edited one.

        if (JSON.stringify(beforeChange) !== JSON.stringify(this.serviceList)){ // Look if there are any changes before editing, if there are, show the button.
          this.isDisabled = false;
          this.subject.next(this.isDisabled) // This executes change of the subject.
        }
      }
    });
  }

  createFile(data: Service []){
    var titleObj = { // Generate title object
      "title" : this.appTitle
    }
    var serviceObject = { // Generate service object
      "services" : data
    }

    var newObj = Object.assign(titleObj, serviceObject) // Combine title & service object into new one.

    var sJson = JSON.stringify(newObj)
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "data.json");
    element.style.display="none";
    document.body.appendChild(element)
    element.click() //Simulate click, so it can be downloaded.
    document.body.removeChild(element);  
  }


}
