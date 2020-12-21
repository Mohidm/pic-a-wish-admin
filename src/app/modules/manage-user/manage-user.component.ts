import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  busUsers: MatTableDataSource<any>
  displayedColumn: string[]=["name","email","roleType","created","isActivated","Action"]
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey=''
  check: boolean = false;

  business_users=[{'name':'Mohid','email':'mhd@gmail.com','roleType':'business','created':'12-11-2020','isActivated':false},
  {'name':'Manu','email':'manu@gmail.com','roleType':'business','created':'12-12-2020','isActivated':false},
  {'name':'George','email':'george@gmail.com','roleType':'business','created':'12-16-2020','isActivated':false},
  {'name':'Rajesh','email':'rajesh@gmail.com','roleType':'business','created':'12-19-2020','isActivated':false}]
  constructor(public cdr:ChangeDetectorRef) { }

  ngOnInit(): void {

    this.busUsers = new MatTableDataSource(this.business_users)
    this.cdr.detectChanges();
       this.busUsers.sort = this.sort
       this.busUsers.paginator = this.paginator;
  }

  onSearchClear(){
    this.searchKey=''
    this.applyFilter()
  }

  applyFilter(){
    this.busUsers.filter=this.searchKey.trim().toLowerCase()
  }



  checkStatus(index) {
    this.check = !this.check;
    this.business_users[index].isActivated = this.check;
   
  }

}
