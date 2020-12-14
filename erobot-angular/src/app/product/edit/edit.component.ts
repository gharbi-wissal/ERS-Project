import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  selected : number;
  id: number;
  product: Product;
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);
    });
    this.id = this.route.snapshot.params['productId'];
    this.productService.find(this.id).subscribe((data: Product)=>{
      this.product = data;
      this.form.controls['productName'].setValue(this.product.productName);
      this.form.controls['price'].setValue(this.product.price);
      this.form.controls['category'].setValue(this.product.category);
      console.log(this.product.category)
      this.selected= this.categories.findIndex(x => x.id === this.product.category.id);
      //this.form.controls['category'].setValue(this.selected);
      //this.selected=this.categories.lastIndexOf(this.product.category);
      console.log(this.selected)

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
    this.productService.update(this.id,this.form.value).subscribe((res) => {
      console.log('Product updated successfully!');
      this.router.navigateByUrl('product/index');
    });
  }

}
