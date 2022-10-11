import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserData } from '../libs/entity/user_data.interface';



@Injectable({
  providedIn: 'root'
})
export class InfoService {
 public data$: BehaviorSubject <UserData> = new BehaviorSubject<UserData>({name:'', password:''});
 
 constructor() { 

  }
}
