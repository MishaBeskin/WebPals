import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
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
  @ViewChild('viewProfile') viewProfile;
  private modalRef;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dataService: DataService, private modalService: NgbModal) {
    this.profilesSub = this.dataService.profiles.subscribe(profiles => {
      forkJoin(profiles).subscribe(profiles => {
        this.profiles = profiles;
        this.rerender();
      })
      console.dir(profiles);
    });
  }



  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.isLoading = true;
    this.dataService.fetchProfiles().subscribe(() => {
      this.isLoading = false;
    });
  }



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
