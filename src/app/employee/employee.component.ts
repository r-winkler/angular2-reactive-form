import {Component, OnInit} from '@angular/core';
import {Employee} from './employee.model';
import {FormPoster} from './employee.service';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/* Custom Validator */
function primaryLanguageValidator(c: AbstractControl): {[key: string]:boolean} | null {
    if(c.value === 'default') {
        return { 'primaryLanguage': true}
    };
    return null;
};

@Component({
  selector: 'employee',
  styleUrls: ['./employee.component.css'],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
    employeeForm: FormGroup;   
    model : Employee;  
    firstNameMessage: string;
    languages = [];
    private validationMessages = {
        required: 'Firstname is required.',
        minlength: 'Firstname must be at least 3 characters.'
    };
    
    constructor(private formPoster: FormPoster, private fb: FormBuilder) {
        this.formPoster.getLanguages()
            .subscribe(
                data => this.languages = data.languages,
                err => console.log('get error: ', err)
            );   
    }
    
    ngOnInit(): void {
        
        /* this.employeeForm = new FormGroup({
            firstName: new FormControl('René'),
            lastName: new FormControl('Winkler'),
            isFullTime: new FormControl(true),
            paymentType: new FormControl('w2'),
            primaryLanguage: new FormControl('default')
        }); */
        
        
        this.employeeForm = this.fb.group({
            firstName: ['René', [Validators.required, Validators.minLength(3)]],
            lastName: ['Winkler', Validators.required],
            isFullTime: true,
            paymentType: 'w2',
            primaryLanguage: ['default', primaryLanguageValidator]         
        });
        
        const lastNameControl = this.employeeForm.get('lastName');
        lastNameControl.valueChanges.distinctUntilChanged().subscribe(value => this.lastNameToUpperCase(lastNameControl.value));
        
        const firstNameControl = this.employeeForm.get('firstName');
        firstNameControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(firstNameControl));
        
    }
    
    lastNameToUpperCase(value: string) {
        if(value.length > 0) 
            this.employeeForm.patchValue({lastName: value.charAt(0).toUpperCase() + value.slice(1)});
        else
            this.employeeForm.patchValue({lastName: value});
    }
        
    submitForm() {
        console.log('Saved: ' + JSON.stringify(this.employeeForm.value));
        console.log(this.employeeForm);
        
        this.formPoster.postEmployeeForm(this.model)
            .subscribe(
                data => console.log('success:', data),
                err => console.log('error:', err)
            ); 
    }
    
    setMessage(c: AbstractControl): void {
        this.firstNameMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.firstNameMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
        }
    }
    
}
