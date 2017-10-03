import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {StudentsPage} from "../pages/students/students";
import {ClassesPage} from "../pages/classes/classes";
import {SelectClassPage} from "../pages/attendance/selectClass";
import firebase from 'firebase';
import {GradesPage} from '../pages/grades/grades';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    try{
      firebase.initializeApp({
        apiKey: "AIzaSyDejeeCDRpDwDi3gCqHUDqjeIF-8dbJKFo",
        authDomain: "hapkido-signin.firebaseapp.com"
      });
    } catch (err){
      console.log('Firebase is already initialize');
    }


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Students', component: StudentsPage, icon: 'people'},
      { title: 'Classes', component: ClassesPage, icon: 'calendar'},
       { title: 'Attendance', component: SelectClassPage, icon: 'alarm'},
      { title: 'Gradings', component: GradesPage, icon: 'trending-up'},
      /* { title: 'Techniques', component: Home, icon: 'videocam'},
       { title: 'Documents', component: Home, icon: 'paper'},
       { title: 'Translations', component: Home, icon: 'mic'},
       { title: 'Feedback', component: FeedbackPage, icon: 'chatbubbles'},
       { title: 'Graphs', component: Home, icon: 'podium'}*/
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
