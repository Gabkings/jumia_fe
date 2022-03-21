import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  contacts: any;
  currentContact = null;
  currentIndex = -1;
  title = '';
  country="";

  page = 0;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private tutorialService: ContactService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  getRequestParams(country, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (country != "") {
      params[`country`] = country;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.country, this.page, this.pageSize);
      if(this.country != ""){
        this.tutorialService.getAll(params)
        .subscribe(
          response => {
            //const { content, totalElements } = response;
            this.contacts = response;
            this.count = response.length;
            console.log(response);
          },
          error => {
            console.log(error);
          });
    }else{
      this.tutorialService.getAll(params)
      .subscribe(
        response => {
          const { content, totalElements } = response;
          this.contacts = content;
          this.count = totalElements;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }

  onChange(newValue) {
    this.country = newValue;
    const params = this.getRequestParams(this.country, this.page, this.pageSize);
}

  handlePageChange(event): void {
    this.page = event;
    console.log(event)
    this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }
}
