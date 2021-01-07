import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickers',
  templateUrl: './tickers.component.html',
  styleUrls: ['./tickers.component.css']
})
export class TickersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const api_URL_Euro = "https://api.exchangeratesapi.io/latest";
   

    //const BTC_URL= "https://bitcoinapi.de/widget/current-btc-price?size=2&type=dark"
    const usd = document.getElementById("usd");
    //const usd = document.getElementById("usd");
    const cad = document.getElementById("cad");
    const gbp = document.getElementById("gbp");
    var html ="";
    
    

    async function ticker () {

      const result = await fetch(api_URL_Euro);
     //console.log(result); 
      const data = await result.json();
      //console.log(data.rates);
      const arrKeys = Object.keys(data.rates)
      console.log(arrKeys[0]);
      const rates = data.rates;
      console.log(rates);
     
      
      console.log(rates.CAD)
      const rateUSD = rates.USD;
      usd?.setAttribute("value",rates.USD);
      cad?.setAttribute("value",rates.CAD);
      gbp?.setAttribute("value",rates.GBP);
      
      
      

      
    }
    ticker();
   
    
  }

}
