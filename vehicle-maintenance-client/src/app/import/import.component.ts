// src/app/import/import.component.ts
import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ImportService } from './import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  public files: NgxFileDropEntry[] = [];

  constructor(private importService: ImportService) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);

          this.importService.uploadFile(formData).subscribe(
            (response:any) => {
              console.log(response);
            },
            (error:any) => {
              console.error(error);
            }
          );
        });
      }
    }
  }
}
