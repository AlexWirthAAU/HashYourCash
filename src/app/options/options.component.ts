import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public router: Router,) { }

  ngOnInit(): void {
  }

}
