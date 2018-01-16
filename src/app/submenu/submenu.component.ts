import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmenuComponent implements OnInit {
  @Input()
  appName: string;

  @Output()
  menuChanged: EventEmitter<string>= new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.appName);
  }

  subMenuSelected(selectedMenu:string){
    this.menuChanged.emit(selectedMenu);
  }

}
