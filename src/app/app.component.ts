import { Component } from '@angular/core';
import { WebsocketService } from './Websocket.service';
import { BroadCastService } from './broad-cast.service';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data:any;
  message!:Message;
  

  constructor(private websocketService: WebsocketService,private broadcast:BroadCastService) {}

  ngOnInit() {
    this.message={
      messageType:"casual",
      data:"This is my first broadcast"
    }

    this.broadcast.msgBroadCast.subscribe((data)=>{
      this.data=data;
      console.log("received message at app ",this.data);
      
    })
  }

  sendMessage(){
    this.websocketService.sendMessage(this.message);
  }

}
