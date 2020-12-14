import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
export interface PeriodicElement {
  id: number;
  name: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  categories: Category[] = [];
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'Actions'];
  dataSource;
  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      //console.log(this.categories);
      for (var cat of this.categories) {
        let categoryItem = {
          id: cat.id,
          name: cat.name,
        };

        this.ELEMENT_DATA.push(categoryItem);
      }
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
    });
  }
  updateCategory(id: number) {
    this.router.navigate(['category', id, 'edit']);
  }

  detailsCategory(id: number) {
    this.router.navigate(['category', id, 'view']);
  }
  // deleteCategory(id) {
  //   this.categoryService.delete(id).subscribe((res) => {
  //     this.categories = this.categories.filter((item) => item.id !== id);
  //     console.log('Category deleted successfully!');
  //   });
  // }

  deleteCategory(id) {
    const dialogDel = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });

    dialogDel.afterClosed().subscribe((result) => {
      if (result) {
        {
          
          this.categoryService.delete(id).subscribe(
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
    this.router.navigateByUrl("", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
