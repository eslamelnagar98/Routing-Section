import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription

  constructor(private routes: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.user = {
      id: this.routes.snapshot.params['id'],
      name: this.routes.snapshot.params['name']
    }

    this.paramsSubscription = this.routes.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
        console.log(params['id']);
      }
    )
  }

}
