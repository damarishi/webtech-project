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

  @Input() times: Promise<{times: OwnerOpeningTime[]}> | undefined;
  @Output() updateSuccess = new EventEmitter<string>();

  constructor(private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}


  timesForm: OwnerOpeningTime[] | undefined;
  requestPending = false;

  protected readonly weekdays =  Weekday;
  dayList:Weekday[] = [1,2,3,4,5,6,7]

  newForm:OwnerOpeningTime = this.empty();

  loadForm(res:OwnerOpeningTime[]) {
    this.timesForm = JSON.parse(JSON.stringify(res));
  }

  ngOnInit() {
    this.times!.then(result => {
      this.loadForm(result.times);
      this.cdr.detectChanges();
      console.log("Opening Times loaded");
    }).catch(_=> this.requestPending = true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if('times' in changes && this.times) {
      this.times.then(result => {
        this.loadForm(result.times);
        this.cdr.detectChanges();
        console.log("Opening Times loaded");
      })
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
  }

  addNew() {
    this.ownerService.postTime(this.newForm)
      .then(_ => {
        this.updateSuccess.emit("New Opening Time added");
        this.newForm = this.empty();
        this.updateSuccess.emit(`Opening Time Added`)
      })
  }
}
