import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../../services/data.service';
import { Profile } from 'src/app/models/profile.model';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-contact-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit, OnDestroy {
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  profiles: Profile[] = [];
  isLoading = false;
  private profilesSub: Subscription;
  selectedProfiles: Profile;

  //listening to change of the table
  dtTrigger: Subject<any> = new Subject<any>();

  //when component is constructed trying to get data if is there something
  constructor(private dataService: DataService, private modalService: NgbModal) {
    this.profilesSub = this.dataService.profiles.subscribe(profiles => {
      //making request for all profiles users urls, to get the data that we needed.
      forkJoin(profiles).subscribe(profiles => {
        this.profiles = profiles;
        // after getting the complete array rerendering the table.
        this.rerender();
      })
    });
  }



  ngOnInit() {
    //initing table with paging options.
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.isLoading = true;
    //fetching Profiles to get updated data.
    this.dataService.fetchProfiles().subscribe(() => {
      this.isLoading = false;
    });
  }


  //opening the dialog window to show profile user info and his repositories.
  openProfile(profile: Profile) {
    const modalRef = this.modalService.open(
      ProfileViewComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
    modalRef.componentInstance.profile = profile;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    if (this.profilesSub) {
      this.profilesSub.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }
}
