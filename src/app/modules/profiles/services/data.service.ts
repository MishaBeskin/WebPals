import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { take, map, tap, delay, switchMap, concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/models/profile.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  private _profiles = new BehaviorSubject<Profile[]>([]);

  private _profileRepositories = new BehaviorSubject<Profile[]>([]);

  get profiles() {
    return this._profiles.asObservable();
  }

  get profilesRepositories() {
    return this._profileRepositories.asObservable();
  }

  constructor(private http: HttpClient) { }


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
