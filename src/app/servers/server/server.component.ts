import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  id: number;
  constructor(private serversService: ServersService, private routes: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.routes.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )
    // this.id = Number(this.routes.snapshot.params['id']);
    // console.log(this.id);
    // this.server = this.serversService.getServer(this.id);
    // this.routes.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(Number(params['id']));
    //   }
    // );
    // console.log(this.server);
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.routes, queryParamsHandling: "preserve" });
  }

}
