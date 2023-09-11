import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { BroadCastService } from './broad-cast.service';
import { Message } from './message';



@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    stompClient: any;
    topic = "/topic/prime"

    constructor(private broadcast:BroadCastService) {
        this.connect();
    }

    connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS("http://localhost:8087/ws");
        this.stompClient = Stomp.over(ws);
        const _this = this;
        this.stompClient.connect({}, function (frame: any) {

            _this.stompClient.subscribe(_this.topic, function (data: any) {
                _this.onMessageReceived(data);
            });
        }, (error: any) =>{
            console.log("errorCallBack -> " + error)
        
            setTimeout(() => {
                console.log(this);
                this.connect();
            }, 1000);
        });
        
    }

    onMessageReceived(message: Message) {
        console.log("receiving message...");
        
        this.broadcast.setData(message);
        console.log("received message ->",message);
        
    }

    sendMessage(message: Message) {
        console.log("sending message...");
        
        this.stompClient.send('/app/send-message', {}, JSON.stringify(message));
    }



}
