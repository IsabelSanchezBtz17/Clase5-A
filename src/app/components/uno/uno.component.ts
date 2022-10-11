import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  constructor(private infoServices: InfoService) { }

  ngOnInit(): void {
  }

  onClick() {
   this.infoServices.data$.next({name:'Isabel',password:'12345'});
  }



}
