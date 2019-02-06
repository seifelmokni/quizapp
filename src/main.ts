import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let startingApp = true;

if (environment.production) {
  enableProdMode();
}

if  (!location.hostname.includes('www.')
&& (!location.hostname.includes('dev')
&& !location.hostname.includes('staging'))
&& environment.production) {
  startingApp = false;
 // window.location.hostname = 'www.' + location.hostname;
}
// if (location.protocol === 'http:') {
//   startingApp = false;
//   window.location.href = location.href.replace('http', 'https');
// }

console.log("before device ready-----------") ; 
let onDeviceReady = () => {
console.log("ondevice ready") ; 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err)); 
  window.FirebasePlugin.grantPermission();
  
} ;
document.addEventListener('deviceready' , onDeviceReady , false) ;



