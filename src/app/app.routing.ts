import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

// Importamos componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// DEFINIMOS LAS RUTAS

const appRoutes: Routes=[
    { path: '', component: DefaultComponent },
    { path: 'inicio', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'ajustes', component: UserEditComponent },
    { path: '**', component: ErrorComponent }
];
// EXPORTAMS CONFIGURACION
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);