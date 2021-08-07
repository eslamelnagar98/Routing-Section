import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactive-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  paramsValue: string;
  allowEdit: boolean = false;
  changesSaved: boolean = false;
  id: Number = 0;

  constructor(private serversService: ServersService, private routes: ActivatedRoute,
    private router: Router) { }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) return true;

    return ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) ? confirm('Do You Want to Discard The Changes ? ') : true
  }

  ngOnInit() {
    //this.paramsValue=JSON.stringify(this.routes.snapshot.queryParams).split('"')[1];
    //console.log(JSON.stringify(this.routes.snapshot.queryParams).split('"')[1]);
    //console.log(this.routes.snapshot.queryParams[this.paramsValue]);
    this.routes.fragment.subscribe();
    this.routes.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.id = Number(this.routes.snapshot.params['id']);
    this.server = this.serversService.getServer(Number(this.id));
    this.routes.params.subscribe(
      (idParams: Params) => {
        this.server = this.serversService.getServer(Number(idParams['id']));
      }
    )
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id,
      { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.routes });
  }

}


