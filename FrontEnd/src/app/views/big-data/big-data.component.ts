import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss']
})
export class BigDataComponent implements OnInit {
  
  constructor() { }

  TextAreaMessage: any[] = [];
  socket : any;
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
  }

  /*Client WebSocket*/
  ConnectWebSocket (message:string ,name:string){
    console.log('Inserted data is =>', message);
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
      this.TextAreaMessage.push({"Name": name, "Message": event.data});
    }
  }
}
