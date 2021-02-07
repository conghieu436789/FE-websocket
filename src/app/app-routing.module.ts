import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './service/guards/auth.guard';
import {ProductComponent} from './components/product/product.component';
import {ListComponent} from './components/product/list/list.component';
import {EditComponent} from './components/product/edit/edit.component';
import {CreateComponent} from './components/product/create/create.component';
import {SocketComponent} from './components/socket/socket.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'list',
        component: ListComponent
      },
      {
        path:'update/:id',
        component: EditComponent
      },
      {
        path:'create',
        component: CreateComponent
      },
      {
        path: '',
        redirectTo: '/product/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'socket',
    component: SocketComponent,
    data: {
      title: 'socket'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
