import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/category/category';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
export interface PeriodicElement {
  id: number;
  productName: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  products: Product[] = [];
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['productName', 'price', 'category', 'Actions'];
  dataSource;
  constructor(
    private productService: ProductService,
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
    this.productService.getAll().subscribe((data: Product[]) => {
      this.products = data;
      //console.log(this.products);
      for (var cat of this.products) {
        let productItem = {
          id: cat.id,
          productName: cat.productName,
          price: cat.price,
          category: cat.category.name,
        };

        this.ELEMENT_DATA.push(productItem);
      }
      console.log(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;

    });
  }
  updateProduct(id: number) {
    this.router.navigate(['product', id, 'edit']);
  }

  detailsProduct(id: number) {
    this.router.navigate(['product', id, 'view']);
  }
  // deleteProduct(id) {
  //   this.productService.delete(id).subscribe((res) => {
  //     this.categories = this.categories.filter((item) => item.id !== id);
  //     console.log('Product deleted successfully!');
  //   });
  // }

  deleteProduct(id) {
    const dialogDel = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });

    dialogDel.afterClosed().subscribe((result) => {
      if (result) {
        {
          this.productService.delete(id).subscribe(
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