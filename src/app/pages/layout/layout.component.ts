import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  loggedUserData: any;
  router = inject(Router)

  constructor(){
    const localData = localStorage.getItem("leaveUser");
    if(localData){
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogout(){
    localStorage.removeItem("leaveUser")
    this.router.navigateByUrl("login")
  }
}
