import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent implements OnInit {
  customers: Customer[] = [];
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['firstName', 'lastName','Actions'];
  dataSource;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog
  ) {}
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.reloadData();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  reloadData() {
    this.customerService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
      for (var cat of this.customers) {
        let customerItem = {
          id: cat.id,
          firstName: cat.firstName,
          lastName: cat.lastName,
        };

        this.ELEMENT_DATA.push(customerItem);
      }
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
    });
  }
  updateCustomer(id: number) {
    this.router.navigate(['customer', id, 'edit']);
  }

  detailsCustomer(id: number) {
    this.router.navigate(['customer', id, 'view']);
  }

  deleteCustomer(id) {
    const dialogDel = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });

    dialogDel.afterClosed().subscribe((result) => {
      if (result) {
        {
          this.customerService.delete(id).subscribe(
            (data) => {
              this.reloadData();
              this.refresh();
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
      }
    });
  }

  refresh(): void {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
