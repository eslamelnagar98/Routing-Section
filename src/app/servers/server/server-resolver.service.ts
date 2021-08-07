import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { ServersService } from '../servers.service';

interface Server{
  id:number;
  name:string;
  status:string;
}

@Injectable({
  providedIn: 'root'
})

export class ServerResolverService implements Resolve<Server> {
  constructor(private serversService:ServersService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server>|Promise<Server> {
    return this.serversService.getServer(Number(route.params['id']));
  }
}
