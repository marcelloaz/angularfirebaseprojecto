import { NgModule } from '@angular/core';
import { ProjectService } from './project.service';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminRouteGuard } from './admin-route.guard';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AccountService,
        AuthService,
        AdminRouteGuard
    ],
})
export class CoreModule { }
