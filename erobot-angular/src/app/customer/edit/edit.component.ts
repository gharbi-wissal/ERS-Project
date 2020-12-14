import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: number;
  customer: Customer;
  form: FormGroup;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });

    this.id = this.route.snapshot.params['customerId'];
    this.customerService.find(this.id).subscribe((data: Customer) => {
      this.customer = data;
      this.form.controls['firstName'].setValue(this.customer.firstName);
      this.form.controls['lastName'].setValue(this.customer.lastName);
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.customerService.update(this.id, this.form.value).subscribe((res) => {
      console.log('Customer updated successfully!');
      this.router.navigateByUrl('customer/index');
    });
  }
}
