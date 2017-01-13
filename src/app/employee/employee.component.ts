import {Component, OnInit} from '@angular/core';
import {Employee} from './employee.model';
import {FormPoster} from './employee.service';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

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
        
    languages = [];
    
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
        
    }  
    
    lastNameToUpperCase(value: string) {
        if(value.length > 0) 
            this.model.lastName = value.charAt(0).toUpperCase() + value.slice(1);
        else
            this.model.lastName = value;
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
    
}
