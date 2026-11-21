import { of } from 'rxjs'
import { AiCbpDashboardviewComponent, AI_CBP_EMBED_URL } from './ai-cbp-dashboardview.component'

describe('AiCbpDashboardviewComponent', () => {
  let component: AiCbpDashboardviewComponent
  let httpMock: any
  let mdoServiceMock: any

  const mockUserData = {
    userId: 'test-user-id',
    rootOrgId: 'test-org-id',
    roles: ['MDO_LEADER'],
    firstName: 'Test User',
  }

  beforeEach(() => {
    httpMock = { get: jest.fn().mockReturnValue(of({ result: { response: mockUserData } })) }
    mdoServiceMock = { getDashboardData: jest.fn().mockReturnValue(of({ signedUrl: 'https://looker/signed' })) }
    component = new AiCbpDashboardviewComponent(httpMock, mdoServiceMock)
    component.lookerIframe = { nativeElement: { src: '' } } as any
  })

  it('should request a signed URL for the AI CBP dashboard and load it in the iframe', async () => {
    await component.getUserProfileDetail()

    expect(component.showLookerProDashboard).toBe(true)
    expect(mdoServiceMock.getDashboardData).toHaveBeenCalledWith('apis/proxies/v8/looker/dashboard', {
      request: {
        embedUrl: AI_CBP_EMBED_URL,
        userAttributes: {
          userId: mockUserData.userId,
          roles: mockUserData.roles,
          orgId: mockUserData.rootOrgId,
          firstName: mockUserData.firstName,
        },
      },
    })
    expect(component.lookerIframe.nativeElement.src).toBe('https://looker/signed')
  })

  it('should fall back to userId when firstName is missing', async () => {
    httpMock.get.mockReturnValue(of({ result: { response: { ...mockUserData, firstName: undefined } } }))

    await component.getUserProfileDetail()

    const payload = mdoServiceMock.getDashboardData.mock.calls[0][1]
    expect(payload.request.userAttributes.firstName).toBe(mockUserData.userId)
  })

  it('should not show the dashboard when the profile is empty', async () => {
    httpMock.get.mockReturnValue(of({ result: {} }))

    await component.getUserProfileDetail()

    expect(component.showLookerProDashboard).toBe(false)
    expect(mdoServiceMock.getDashboardData).not.toHaveBeenCalled()
  })

  it('should leave the iframe blank when no signed URL is returned', async () => {
    mdoServiceMock.getDashboardData.mockReturnValue(of({}))

    await component.getUserProfileDetail()

    expect(component.lookerIframe.nativeElement.src).toBe('')
  })

  it('should call getUserProfileDetail on init', () => {
    const spy = jest.spyOn(component, 'getUserProfileDetail').mockResolvedValue(undefined)

    component.ngOnInit()

    expect(spy).toHaveBeenCalled()
  })
})
