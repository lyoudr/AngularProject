import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './auth/auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    //canActivate : [LoginGuard],
    data: {
      title: 'Home'
    },
    children: [
      { path: '',
        //canActivateChild: [LoginGuard],
        children: [
          {
            path: 'calendar',
            loadChildren: './views/calendar/calendar.module#CalendarModule'
          },
          {
            path: 'storemanage',
            loadChildren: './views/storemanage/storemanage.module#StoremanageModule'
          },
          {
            path: 'accountlist',
            loadChildren: './views/accountlist/accountlist.module#AccountlistModule'
          },
          {
            path: 'discuss',
            loadChildren: './views/discuss/discuss.module#DiscussModule'
          },
          {
            path: 'restaurant',
            loadChildren: './views/restaurant/restaurant.module#RestaurantModule'
          },
          {
            path: 'bigdata',
            loadChildren: './views/big-data/big-data.module#BigDataModule'
          },
          {
            path: 'base',
            loadChildren: './views/base/base.module#BaseModule'
          },
          {
            path: 'buttons',
            loadChildren: './views/buttons/buttons.module#ButtonsModule'
          },
          {
            path: 'charts',
            loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
          },
          {
            path: 'dashboard',
            loadChildren: './views/dashboard/dashboard.module#DashboardModule'
          },
          {
            path: 'icons',
            loadChildren: './views/icons/icons.module#IconsModule'
          },
          {
            path: 'theme',
            loadChildren: './views/theme/theme.module#ThemeModule'
          },
          {
            path: 'widgets',
            loadChildren: './views/widgets/widgets.module#WidgetsModule'
          }
        ]
      }
    ]
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
