import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MyDashboardHomeComponent } from './components/my-dashboard-home/my-dashboard-home.component'
import { TrainingPlanDashboardviewComponent } from './components/training-plan-dashboardview/training-plan-dashboardview/training-plan-dashboardview.component'
import { AiCbpDashboardviewComponent } from './components/ai-cbp-dashboardview/ai-cbp-dashboardview.component'

const routes: Routes = []

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MyDashboardHomeComponent,
        children: routes,
        data: { module: 'Dashboard' },
      },
      {
        path: 'temp',
        component: MyDashboardHomeComponent,
        children: routes,
        data: { module: 'Dashboard' },
      },
      {
        path: 'dashboard-view',
        component: TrainingPlanDashboardviewComponent,
        children: routes,
        data: { module: 'Dashboard' },
      },
      {
        path: 'ai-cbp-dashboard',
        component: AiCbpDashboardviewComponent,
        data: { module: 'Dashboard' },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MyDashboardRoutingModule { }
