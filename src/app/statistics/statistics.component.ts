import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'node_modules/chart.js'
import { ApiService } from '../services/api.service';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  piechart: Chart;
  barChartCat: Chart;
  barChartPay: Chart;

  showCatPie: boolean = true;
  showCatBar: boolean = true;
  showPayBar: boolean = true;

  catAmount: any[];
  catLabels: any[];
  catColors: any[];

  formData: any;

  constructor(public wallet: WalletService, public api: ApiService) {
    this.formData = new FormGroup({
      fromdate: new FormControl(''),
      todate: new FormControl('')
    })
  }

  ngOnInit(): void {
    let period = {
      fromdate: "",
      todate: ""
    }

    this.getAllPayments(period, 1);
  }

  filterOrderStatistics() {
    this.piechart.destroy();
    this.barChartCat.destroy();
    this.barChartPay.destroy();
    let fromDate = this.formatDate(this.formData.value.fromdate);
    let todate = this.formatDate(this.formData.value.todate);
    let period = {
      fromdate: fromDate,
      todate: todate,
    }

    this.getAllPayments(period, this.wallet.getWallet().id_w);
  }

  selectChart(type) {
    if (type === '1') {
      this.showCatPie = !this.showCatPie;
    } else if (type === '2') {
      this.showCatBar = !this.showCatBar;
    } else if (type === '3') {
      this.showPayBar = !this.showPayBar;
    }

  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (date.month),
      day = '' + date.day,
      year = date.year;


    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getAllPayments(period, walletID) {
    this.catAmount = [];
    this.catColors = [];
    this.catLabels = [];
    this.api.getPaymentsByDate(period, walletID).subscribe(payments => {
      for(let key in payments) {
        if(payments[key].amount !== 0) {
          this.catAmount.push(payments[key].amount);
          this.catColors.push(payments[key].color);
          this.catLabels.push(payments[key].name)
        }
      }
      this.fillGraphs();
    }, //success path
    error => {

    }) //error path)
  }

  fillGraphs() {
    this.piechart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: this.catLabels,
        datasets: [{
          label: "Ausgaben in €",
          backgroundColor: this.catColors,
          data: this.catAmount,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Aufteilung der Ausgaben',
          fontSize: 18,
        },
      }
    })

    this.barChartCat = new Chart("barChartCat", {
      type: 'bar',
      data: {
        labels: this.catLabels,
        datasets: [{
          label: "Ausgaben in €",
          backgroundColor: this.catColors,
          data: this.catAmount
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Aufteilung der Ausgaben',
          fontSize: 18,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    })

    this.barChartPay = new Chart("barChartPay", {
      type: 'bar',
      data: {
        labels: ["Auszahlungen", "Einzahlungen"],
        datasets: [{
          label: "Zahlungen",
          backgroundColor: ["#ad1818", "#046b12"],
          data: [800, 1300]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Einnahmen und Ausgaben',
          fontSize: 18,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    })
  }
}
