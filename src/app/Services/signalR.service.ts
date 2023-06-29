import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

import { Discussion } from '../Models/discussion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public startConnection = (): Promise<void> => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7129/discussionHub`)
      .build();

    return this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferChartDataListener = (
    callback: (discussion: Discussion) => void
  ) => {
    this.hubConnection.on('ReceiveComment', (discussion) => {
      callback(discussion);
    });
  };
}
