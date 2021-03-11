import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  private profileRepositoriesSub: Subscription;
  dtOptions: DataTables.Settings = {};
  showAge;
  reposNum;
  @Input() profile;
  profileRepositories = [];
  isLoading = false;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dataService: DataService, public activeModal: NgbActiveModal) {
    this.profileRepositoriesSub = this.dataService.profilesRepositories.subscribe(profileRepositories => {
      this.profileRepositories = profileRepositories;
      console.dir(profileRepositories);
      this.reposNum = profileRepositories.length;
      this.dtTrigger.next();
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.isLoading = true;
    this.dataService.getProfileRepo(this.profile.repos_url).subscribe(() => {
      this.isLoading = false;

    });



    const convertAge = new Date(this.profile.created_at);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }





  ngOnDestroy() {
    if (this.profileRepositoriesSub) {
      this.profileRepositoriesSub.unsubscribe();
    }
  }



}
