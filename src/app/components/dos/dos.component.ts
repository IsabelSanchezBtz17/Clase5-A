import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public name: string = '';
  public password: string = '';
  public detector$!: Observable<any>;

  constructor(public infoService: InfoService) { 
    this.detector$ = this.infoService.data$.pipe(tap(  resp => {
      console.log('pipe', resp)
    } )
    )
  }

  ngOnInit(): void {
    /*this.infoService.data$.subscribe({next: (resp => {
      console.log(resp);
      this.name= resp.name;
      this.password= resp.password;
    }
    )}) */
  }

}
