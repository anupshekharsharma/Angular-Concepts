import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe(res=>{
      console.log(res)
      this.JumpTo(res);
    })
     
  }

  JumpTo(section){
    setTimeout(() => {
      document.getElementById(section).scrollIntoView({behavior: "smooth"});
    }, 1000);
  }


}
