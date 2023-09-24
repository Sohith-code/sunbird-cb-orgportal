import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { CommonModule } from '@angular/common'
import {
  AvatarPhotoModule,
  BreadcrumbsOrgModule,
  LeftMenuWithoutLogoModule,
  UIORGTableModule,
} from '@sunbird-cb/collection'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { HomeModule } from '../home/home.module'
import { RouterModule } from '@angular/router'
import {
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material'
import { MatCardModule } from '@angular/material/card'
import { BatchDetailsComponent } from './components/batch-details/batch-details.component'
import { BatchListComponent } from './components/batch-list/batch-list.component'
import { BlendedHomeComponent } from './components/blended-home/blended-home.component'
import { BlendedApprovalsRoutingModule } from './blended-approvals-routing.module'
import { UsersCardComponent } from './components/users-card/users-card.component'
import { ProfileViewComponent } from './components/profile-view/profile-view.component'
import { PipeEmailModule } from '../pipes/pipe-email/pipe-email.module'
import { PipeOrderByModule } from '../pipes/pipe-order-by/pipe-order-by.module'
import { ProfileCertificateDialogModule } from './components/profile-certificate-dialog/profile-certificate-dialog.module'
import { ViewReportDialogComponent } from './components/view-report-dialog/view-report-dialog.component'
import { MicroSurveyModule } from '@sunbird-cb/micro-surveys'
import { MatProgressSpinnerModule } from '@angular/material'

@NgModule({
  declarations: [BlendedHomeComponent, BatchListComponent, BatchDetailsComponent, UsersCardComponent, ProfileViewComponent,
    ViewReportDialogComponent],
  imports: [CommonModule, BlendedApprovalsRoutingModule, BreadcrumbsOrgModule, LeftMenuWithoutLogoModule, WidgetResolverModule,
    MatSidenavModule, MatButtonModule, MatIconModule, HomeModule, RouterModule, UIORGTableModule,
    MatCardModule, AvatarPhotoModule, MatListModule, PipeEmailModule, PipeOrderByModule,
    ProfileCertificateDialogModule, MicroSurveyModule, MatProgressSpinnerModule],
  exports: [],
  providers: [],
  entryComponents: [ViewReportDialogComponent]
})
export class BlendedApprovalsModule { }
