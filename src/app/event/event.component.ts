import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
    name: fb.group({
        first: ['', Validators.minLength(2)],
        last: '',
      }),
      eventname:['',Validators.minLength(5)]
    });
   }

  ngOnInit() {
  }

}
