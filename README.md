## WEBPALS-Assignment.

welcome to WebPals assignment app.

Below you have a short instructions how to run this app.


### What need to install ###
* first of all clone the repository
* run npm install
* if you don't have datatables installed please follow the next steps to insure that the component that using data table runs and renders correctly.

### DATATABLES - installation Using Angular CLI
In this step, we have to add interactivity to our page

```
ng add angular-datatables
```
1. Install the following packages:
```
npm install jquery --save
npm install datatables.net --save
npm install datatables.net-dt --save
npm install angular-datatables --save
npm install @types/jquery --save-dev
npm install @types/datatables.net --save-dev
```
Add the dependencies in the scripts and styles attributes to angular.json:
```json
"projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/datatables.net-dt/css/jquery.dataTables.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.js",
              "node_modules/datatables.net/js/jquery.dataTables.js"
            ],
            ...
          }
}
```
3.Import the DataTablesModule at the appropriate level of your app.
```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DataTablesModule } from "angular-datatables";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DataTablesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Running and using the app
When you finish to install all what is listed above, you have to : 

* npm run start - the app will start on port :4200
* login credentials: username: admin@admin.com , password: admin.

### Using the app on github pages
you can also us this app with GitHub Pages,
just click on the link below: [WEBPALS-Assignment](https://mishabeskin.github.io/WebPals/)


