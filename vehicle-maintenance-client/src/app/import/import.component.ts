import { Component } from '@angular/core';
// import { ImportService } from './import.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
   
  constructor(private messageService: MessageService) {}
  maxFileSize:number = 100000;

  url = 'http://localhost:3001/vehicles/upload';

  onUpload(event: any) {
    for (const file of event.files) {
      console.log('File uploaded: ', file);
    }
  }

  onError(event: any) {
    console.log('File upload error: ', event);
  }
}
