import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class BroadCastService{

    public messages = new BehaviorSubject<any>('');
    msgBroadCast:Observable<any> = this.messages.asObservable();

    setData(data:any){
        this.messages.next(data.body);
    }
}