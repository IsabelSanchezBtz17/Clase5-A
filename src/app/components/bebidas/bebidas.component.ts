import { Component, OnInit } from '@angular/core';
import { Bebida } from 'src/app/libs/entity/bebida.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {
  public bebidas: Bebida[]=[];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getObtener('margarita').subscribe({
      next: resp=> {
        console.log(resp)
        this.bebidas= resp
      }
    })
  
  
  
  }


}


