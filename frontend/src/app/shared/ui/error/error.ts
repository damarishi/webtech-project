import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
    @Input() code: number = 404;
    @Input() message: string = 'Page not found';
}
