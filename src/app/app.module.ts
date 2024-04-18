import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component'; // Importa el componente MapComponent aquí
//import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent // Declara el componente MapComponent aquí
  ],
  imports: [
    BrowserModule,
    //RouterModule,
    // Agrega otros módulos necesarios aquí (por ejemplo, FormsModule, HttpClientModule, etc.)
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente de inicio de la aplicación
})
export class AppModule { }
