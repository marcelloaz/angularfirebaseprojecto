import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { UserProfile } from '../model/user-profile';
import { UserPermission } from '../model/user-permission';
import { MilestoneStatus } from '../model/milestone-status';
import { Milestone } from '../model/milestone';
import { Categoria } from '../model/Categoria';
import { MenuApp } from '../model/menuApp';
import { Constants } from 'src/environments/environment.prod';
import { OrderRequest } from '../model/wirecard/request/OrderRequest';

@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient, private _authService: AuthService) { }

  getProjects(): Observable<Project[]> {
      var accessToken = this._authService.getAccessToken();
      var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      return this.httpClient.get<Project[]>(Constants.apiRoot + 'Projects', { headers: headers });
    }

    getCategorias(): Observable<MenuApp[]> {
        var accessToken = this._authService.getAccessToken();
        var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.httpClient.get<MenuApp[]>(Constants.apiRoot + 'Itens', { headers: headers });
    }

  getProject(projectId: number): Observable<Project> {
      return this.httpClient.get<Project>(Constants.apiRoot + 'Projects/' + projectId);
  }

  getProjectUsers(projectId: number): Observable<UserProfile[]> {
      return this.httpClient.get<UserProfile[]>(Constants.apiRoot + 'Projects/' + projectId + '/Users');
  }

  // addProject(project: Project): Observable<Project> {
  //     return this.httpClient.post<Project>(Constants.apiRoot + 'Projects', project);
  // }

//   addProject(orderRequest: OrderRequest) {
//     return this.httpClient.post<OrderRequest>('${Constants.apiRoot}Projects', orderRequest);
// }

  addProject(orderRequest: OrderRequest): Observable<OrderRequest> {
    return this.httpClient.post<OrderRequest>(Constants.apiRoot + 'Comprar', orderRequest);
  }

  deleteProject(project: Project): Observable<object> {
      return this.httpClient.delete(Constants.apiRoot + 'Projects/' + project.id);
  }

  addUserPermission(userPermission: UserPermission) {
      return this.httpClient.post(Constants.apiRoot + 'UserPermissions', userPermission);
  }

  removeUserPermission(userId: string, projectId: number) {
      return this.httpClient.delete(`${Constants.apiRoot}UserPermissions/?userId=${userId}&projectId=${projectId}`);
  }

  updateUserPermission(userPermission) {
      return this.httpClient.put(`${Constants.apiRoot}UserPermissions`, userPermission);
  }

  getMilestones(projectId: number): Observable<Milestone[]> {
      return this.httpClient.get<Milestone[]>(Constants.apiRoot + 'Milestone');
  }

  getMilestoneStatuses() {
      return this.httpClient.get<MilestoneStatus[]>(`${Constants.apiRoot}Projects/MilestoneStatuses`);
  }

  addMilestone(milestone: Milestone) {
      return this.httpClient.post(`${Constants.apiRoot}Projects/Milestones`, milestone);
  }

  deleteMilestone(id: number) {
      return this.httpClient.delete(`${Constants.apiRoot}Projects/Milestones/${id}`);
  }

  updateMilestone(milestone: Milestone) {
      return this.httpClient.put(`${Constants.apiRoot}Projects/Milestones/${milestone.id}`, milestone);
  }
}
