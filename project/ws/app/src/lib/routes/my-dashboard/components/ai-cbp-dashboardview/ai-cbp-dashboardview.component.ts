import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
/* tslint:disable */
import _ from 'lodash'
/* tslint:enable */
import { CreateMDOService } from '../../../../head/work-allocation-table/create-mdo.services'

const endpoint = {
  profilePid: '/apis/proxies/v8/api/user/v2/read',
  lookerProDashboard: 'apis/proxies/v8/looker/dashboard',
}

export const AI_CBP_EMBED_URL = '/embed/dashboards/Clickhouse_prod_model::cbp_overview'

@Component({
  selector: 'ws-app-ai-cbp-dashboardview',
  templateUrl: './ai-cbp-dashboardview.component.html',
  styleUrls: ['../training-plan-dashboardview/training-plan-dashboardview/training-plan-dashboardview.component.scss'],
  standalone: false,
})
export class AiCbpDashboardviewComponent implements OnInit {
  @ViewChild('lookerIframe', { static: false }) lookerIframe!: ElementRef

  userData: any
  lookerDashboardDetail = ''
  showLookerProDashboard = false

  constructor(private http: HttpClient, private mdoService: CreateMDOService) { }

  ngOnInit() {
    this.getUserProfileDetail()
  }

  async getUserProfileDetail() {
    this.userData = await this.http
      .get<any>(endpoint.profilePid)
      .pipe(map((res: any) => _.get(res, 'result.response')))
      .toPromise()
    if (this.userData) {
      this.showLookerProDashboard = true
      this.showDashboard()
    }
  }

  showDashboard() {
    this.lookerDashboardDetail = ''
    const userId = this.userData.userId
    const requestPayload = {
      request: {
        embedUrl: AI_CBP_EMBED_URL,
        userAttributes: {
          userId,
          roles: this.userData.roles,
          orgId: this.userData.rootOrgId,
          firstName: this.userData.firstName || userId,
        },
      },
    }
    this.mdoService.getDashboardData(endpoint.lookerProDashboard, requestPayload).subscribe(data => {
      if (data && data.signedUrl) {
        this.lookerDashboardDetail = data.signedUrl
        this.reloadIframeWithNewUser()
      }
    })
  }

  reloadIframeWithNewUser() {
    if (this.lookerIframe) {
      const iframe: HTMLIFrameElement = this.lookerIframe.nativeElement
      iframe.src = this.lookerDashboardDetail
    }
  }
}
