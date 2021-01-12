import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  
    const select = document.querySelectorAll("select");
    const input: any = document.querySelectorAll("input");
   
    const api_URL = "http://data.fixer.io/api/latest?access_key=f8869e0960e20a2f237c64722f3d841b";
    let html = "";

    async function currency() {
      const result = await fetch(api_URL);
      //console.log(result); 
      const data = await result.json();
      //console.log(data.rates);
      const arrKeys = Object.keys(data.rates)
      //console.log(arrKeys[2]);
      const rates = data.rates;
      //console.log(rates);


      arrKeys.map(item => {
        return html += `<option value=${item}>${item}</option>`;
      });
      //console.log(html);

      for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
      }
      //console.log(rates[select[0].value]) //rates

    


      input[0].addEventListener("keyup", () => {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
      })

      input[1].addEventListener("keyup", () => {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];;
      })


      select[0].addEventListener("change", () => {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
      })

      select[1].addEventListener("change", () => {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];;
      })

    };
    currency();


    
  }

}
