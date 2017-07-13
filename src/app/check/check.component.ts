import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl ,ValidatorFn, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

function emailMatcher(c: AbstractControl){
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    
    if (emailControl.pristine || confirmControl.pristine){
      return null;
    }
    if (emailControl.value === confirmControl.value)      {
        return null;
      }
    return { 'match': true};
}

function phoneMatcher(c: AbstractControl){
    let homephoneControl = c.get('homephone');
    let workphoneControl = c.get('workphone');
    let mobileControl = c.get('mobile');
    
    if (homephoneControl.pristine && workphoneControl.pristine && mobileControl.pristine){
      return null;
    }
    if (homephoneControl.value.length == 0 && workphoneControl.value.length == 0  && mobileControl.value.length == 0)      {
        return { 'match': true};
      }
    return null;
}

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  form : FormGroup;
  emailMessage: string;

  private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

  constructor(@Inject(FormBuilder) fb: FormBuilder) { 
    this.form  = fb.group({
       title : ['Mr', [Validators.required, Validators.minLength(2)]],
       firstName: ['', [Validators.required, Validators.minLength(3)]],
       lastName:['', Validators.maxLength(30)],
       emailGroup : fb.group({
         email:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
         confirmEmail:['', Validators.required]
       }, {validator : emailMatcher}),
       dateofbirth: ['', Validators.required],
       postcode: ['', Validators.required],
       phoneGroup : fb.group({
         homephone:[''],
         workphone:[''],
         mobile:['']
       }, {validator : phoneMatcher}),
       employmentStatus : ['Full-time'] 
    });

     const emailControl = this.form.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(100).subscribe(value =>
            this.setMessage(emailControl));

  }
          
   setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    }
}
