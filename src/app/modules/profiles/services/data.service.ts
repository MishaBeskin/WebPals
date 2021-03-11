import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/models/profile.model';
import { environment } from 'src/environments/environment';
import { ProfileRepositories } from 'src/app/models/profileRepositories.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // crating profiles & profilesRepositories BehaviorSubject to listen for a changes of them.
  private _profiles = new BehaviorSubject<Profile[]>([]);

  private _profileRepositories = new BehaviorSubject<ProfileRepositories[]>([]);

  //getting profiles
  get profiles() {
    return this._profiles.asObservable();
  }

  //getting profiles repositories.
  get profilesRepositories() {
    return this._profileRepositories.asObservable();
  }

  constructor(private http: HttpClient) { }

  //getting the array of all profiles urls when getting them making forkjoin to get all the data.
  fetchProfiles() {
    return this.http
      .get<any[]>(
        environment.profilesUrl
      ).pipe(
        map(resProfileData => {

          const arr = [];
          resProfileData.forEach(profile => {
            arr.push(this.http.get(profile.url));
          });
          return arr;
        }),
        tap(profiles => {
          this._profiles.next(profiles);
          console.log(profiles);
        })
      );
  }

  //getting specific repos of the user.
  getProfileRepo(url: string) {
    return this.http
      .get<any[]>(
        url
      ).pipe(
        map(resProfileData => {
          const profiles = [];
          resProfileData.forEach(profile => {
            profiles.push(profile);
          });
          return profiles;
        }),
        tap(profiles => {
          this._profileRepositories.next(profiles);
        })
      );
  }

}
