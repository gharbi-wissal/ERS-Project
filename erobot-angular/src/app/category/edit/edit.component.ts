import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  category: Category;
  form: FormGroup;
  
  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    this.id = this.route.snapshot.params['categoryId'];
    this.categoryService.find(this.id).subscribe((data: Category)=>{
      this.category = data;
      this.form.controls['name'].setValue(this.category.name);
    });
    

    
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.categoryService.update(this.id, this.form.value).subscribe(res => {
         console.log('Category updated successfully!');
         this.router.navigateByUrl('category/index');
    })
  }

}
