import {Component} from '@angular/core';
import {Employee} from './employee.model';
import {FormPoster} from './employee.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'employee',
  styleUrls: ['./employee.component.css'],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
    languages = [];
    model = new Employee('René', 'Winkler', true, 'w2', 'default');
    
    
    lastNameToUpperCase(value: string) {
        if(value.length > 0) 
            this.model.lastName = value.charAt(0).toUpperCase() + value.slice(1);
        else
            this.model.lastName = value;
    }
    
    hasPrimaryLanguageError = false;
    
    constructor(private formPoster: FormPoster) {
        this.formPoster.getLanguages()
            .subscribe(
                data => this.languages = data.languages,
                err => console.log('get error: ', err)
            );
    
    }
    
    submitForm(form: NgForm) {
        console.log(this.model);
        console.log(form.value);
        this.validatePrimaryLanguage(this.model.primaryLanguage);
        if (this.hasPrimaryLanguageError)
            return;
        this.formPoster.postEmployeeForm(this.model)
            .subscribe(
                data => console.log('success:', data),
                err => console.log('error:', err)
            );
    }
    
    validatePrimaryLanguage(value) {
        if (value === 'default') {
            this.hasPrimaryLanguageError = true;
        }
        else
            this.hasPrimaryLanguageError = false;
    }
}
