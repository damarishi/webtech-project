import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {OwnerOpeningTime} from '../../../types/owner-opening-time';
import {OwnerService} from '../../../services/owner-service';
import {Weekday} from '../../../types/weekday';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'opening-time-card-component',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './opening-time-card-component.html',
  styleUrl: './opening-time-card-component.css',
})
export class OpeningTimeCardComponent implements OnInit, OnChanges {

  @Input() times!:OwnerOpeningTime[];
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  timesForm: OwnerOpeningTime[] = [];

  protected readonly weekdays =  Weekday;
  dayList:Weekday[] = [1,2,3,4,5,6,7]

  newTimeForm:OwnerOpeningTime = this.empty();

  loadForm() {
    this.timesForm = JSON.parse(JSON.stringify(this.times));
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.loadForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if('times' in changes && this.times) {
      this.loadForm();
    }
  }

  empty() {
    return {
      opening_time_id: '',
      restaurant_id: '',
      weekday: Weekday.Monday,
      open_time: '00:00',
      close_time: '00:00'
    }
  }

  save(index: number) {
    this.ownerService.putTime(this.timesForm![index])
      .then( _ => this.updateSuccess.emit(`Opening Time ${index} Updated`))
  }

  delete(index: number) {
    this.ownerService.deleteTime(this.timesForm![index].opening_time_id)
      .then(_ => this.updateSuccess.emit(`Opening Time ${index} Deleted`))
      .catch(this.loadForm)
  }

  addNew() {
    this.ownerService.postTime(this.newTimeForm)
      .then(_ => {
        this.updateSuccess.emit("New Opening Time added");
        this.newTimeForm = this.empty();
        this.updateSuccess.emit(`Opening Time Added`)
      })
      .catch(this.loadForm);
  }
}
