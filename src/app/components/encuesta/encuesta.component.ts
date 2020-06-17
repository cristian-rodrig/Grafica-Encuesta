import { Component, OnInit } from '@angular/core';
import {  ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
    };
    public barChartType: ChartType = 'bar';
    public barChartLabels: string[] = ['Pregunta 1','Pregunta 2', 'Pregunta 4', 'Pregunta 4'];
    public barChartData: any[] = [{data: [ 65,59,80,81 ], label: 'Entrevistados'}];


  constructor(private http : HttpClient,
              public wsService : WebsocketService) { }

  ngOnInit(): void {
    
    this.http.get('http://localhost:5000/grafica')
      .subscribe((data : any) => {
      this.barChartData = data
    });
      
      this.escucharSocket();
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica')
    .subscribe( (data : any) => {
        
      console.log('socket', data);
      this.barChartData = data;
    });
  }
}
