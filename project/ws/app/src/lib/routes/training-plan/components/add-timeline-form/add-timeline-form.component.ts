import { Component, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { TrainingPlanDataSharingService } from '../../services/training-plan-data-share.service'
@Component({
  selector: 'ws-app-add-timeline-form',
  templateUrl: './add-timeline-form.component.html',
  styleUrls: ['./add-timeline-form.component.scss'],
  providers: [DatePipe],
})
export class AddTimelineFormComponent implements OnInit {
  minDate: Date = new Date();
  todayDate: any
  constructor(private trainingPlanDataSharingService: TrainingPlanDataSharingService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.trainingPlanDataSharingService.trainingPlanStepperData['endDate']) {
      this.todayDate = new Date(this.trainingPlanDataSharingService.trainingPlanStepperData['endDate'])
    } else {
      this.trainingPlanDataSharingService.trainingPlanStepperData['endDate'] = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd')
    }
  }

  changeTimeline(timeline: any) {
    this.trainingPlanDataSharingService.trainingPlanStepperData['endDate'] = this.datePipe.transform(timeline, 'yyyy-MM-dd')
  }

}
