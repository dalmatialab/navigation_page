import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showButtons: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleShowButtons(): void {
    this.showButtons = !this.showButtons
    this.subject.next(this.showButtons)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
