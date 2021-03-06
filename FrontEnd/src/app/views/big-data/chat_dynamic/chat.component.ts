import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  
  constructor() { }

  TextAreaMessage: any[] = [];
  socket : any;
  name : string;
  self : boolean;
  chatstyle : any;
  @Input() isClose: Subject<boolean> = new Subject();

  ngOnInit() {
    // Create WebSocket connection.
    this.socket = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
    
    // Connection opened
    this.socket.onopen = () => {
      console.log('connect to websocket');
    };

    // Error occured
    this.socket.onerror = (error) => {
      console.log(`WebSocket error : ${error}`);
    }

    this.chatstyle= {
      height: '50%',
      overflow : 'scroll'
    }
  }

  /*Client WebSocket*/
  ConnectWebSocket (message:string ,name:string){
    console.log('Inserted data is =>', message);
    this.name = name;
    const sendingMessages = {
      name : name,
      message : message
    }
    // If this.socket is conneced, sending messages
    this.socket.send(JSON.stringify(sendingMessages));

    // Error occured
    this.socket.onerror = (error) => {
      console.log(`WebSocket error : ${error}`);
    }
    // Listen for messages
    this.socket.onmessage = (event) => {
      console.log('Received data from server is =>', event.data);
      let receivedMsg = JSON.parse(event.data);
      if(receivedMsg.name !== this.name){
        this.self = false;
      } else if(receivedMsg.name === this.name) {
        this.self = true;
      }
      this.TextAreaMessage.push({"Name": receivedMsg.name, "Message": receivedMsg.message});
    }
  }

  /* Close this component */
  close(){
    this.isClose.next(true);
  }
}