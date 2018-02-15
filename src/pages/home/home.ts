import { NetpieProvider } from './../../providers/netpie/netpie.service';
import { Component, OnInit } from '@angular/core';
import { Leds } from './../../providers/netpie/leds';

import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  imgLedOn = "../../assets/imgs/ledon.jpg"
  imgLedOff = "../../assets/imgs/ledOff.jpg"
  imagePath = "";


  leds: Observable<Leds>;
  result: any;
  status: string;
  payload: any;

  constructor(private netpieProvider: NetpieProvider) {
    this.getStatus();
  }

  ngOnInit() {
    // Observable.interval(2000).subscribe(res =>{
    //   console.log(this.payload)
    //   if(this.payload != this.status ){
    //     if(this.payload == "ON"){
    //       this.onLED();
    //     }
    //     if(this.payload == "OFF"){
    //       this.offLED();
    //     }
    //     this.status = this.payload;
    //     console.log("status : " + this.status)
    //     this.getStatus();

    //     console.log('action')

    //   }else{
    //     console.log('No action')
    //   }
    // })
  }
  getStatus() {
    this.leds = this.netpieProvider.getLED();
    console.log(this.leds)



    Observable.interval(2000).subscribe(res => {
      this.payload = this.netpieProvider.getLED();

      this.leds.forEach(element => {
        this.result = JSON.stringify(element)
        this.result = JSON.parse(this.result)[0];
        console.log(this.result.payload);

        if(this.result.payload != this.status){
          if(this.payload == "ON"){
                  this.onLED();
                  this.status = this.payload
                }
                if(this.payload == "OFF"){
                  this.offLED();
                  this.status = this.payload

                }
        }else{
        }
      })
     


    });

    this.imagePath = "../../assets/imgs/ledOff.jpg"
  }
  onLED() {
    var status = "ON"
    this.netpieProvider.setLED(status)
      .subscribe(result => {

        console.log(result)

        this.getStatus();
        this.imagePath = this.imgLedOn;
      })
  }

  offLED() {
    var status = "OFF"
    this.netpieProvider.setLED(status)
      .subscribe(result => {

        console.log(result)

        this.getStatus();

        this.imagePath = this.imgLedOff
      })
  }


}
