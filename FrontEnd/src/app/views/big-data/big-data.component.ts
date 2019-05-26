import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss']
})
export class BigDataComponent implements OnInit {
  TextAreaMessage: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  /*Client WebSocket*/
  ConnectWebSocket (message:string ,name:string){
    console.log('Inserted data is =>', message);

    // Create WebSocket connection.
    const socket = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');
    
    // Connection opened
    socket.onopen = () => {
      socket.send(message);
    };
    // Error occured
    socket.onerror = (error) => {
      console.log(`WebSocket error : ${error}`);
    }
    // Listen for messages
    socket.onmessage = (event) => {
      console.log('Received data from server is =>', event.data);
      this.TextAreaMessage.push({"Name": name, "Message": event.data});
    }
  }
}
