import { Component,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path: "", component: AppComponent },
  { path:"todo",component:TodoComponent},

  { path:"login",component:LoginComponent,children:[{path:"todo",component:TodoComponent}]},
  { path:"signup",component:SignupComponent,children:[{path:"login",component:LoginComponent}]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
   
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
