import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  selected : number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selected = 0;

    this.form = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  onSelect() {
    this.form.controls['category'].setValue(this.categories[this.selected]);

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.productService.create(this.form.value).subscribe((res) => {
      console.log('Product created successfully!');
      this.router.navigateByUrl('product/index');
    });
  }
}
