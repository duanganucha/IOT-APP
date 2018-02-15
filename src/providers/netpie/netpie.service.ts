
import { Http,Headers,Response } from '@angular/http';

import { Injectable } from '@angular/core';

import { Leds } from '../netpie/leds'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NetpieProvider {

  urlGet = "https://api.netpie.io/topic/Home1669/LampStatus?auth=dIMLEvdge1U9S6v:Q1liTUcJItJGESEJLNPD2IUTq";

  urlSet = "https://api.netpie.io/topic/Home1669/LampStatus?retain&auth=dIMLEvdge1U9S6v:Q1liTUcJItJGESEJLNPD2IUTq";


  constructor(public http: Http) {
    console.log('Hello NetpieProvider Provider');
  }

  getLED(): Observable<Leds> {
    return this.http.get(this.urlGet)
    .map((res:Response) => res.json())

  }


  setLED(status) {

  let headers = new Headers();
 
  var APPID = "Home1669"; //enter your appid
  var KEY = "gv3b3byGLJWITtI"; //enter your key
  var SECRET = "nQ6hHpvvOirSE5ngxebIMf77D"; //enter your secret
  var Topic = "/LampStatus";


  var url = 'https://api.netpie.io/topic/' + APPID + Topic + '?retain&auth=' + KEY + ':' + SECRET;
  
  return this.http.put(url,status, { headers :headers})
    .map(res => res.json());
}


}
