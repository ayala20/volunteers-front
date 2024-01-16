import { Component } from '@angular/core';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { IVolunteer } from '../../../models/volunteer.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddingVolunteeringComponent } from '../../responsibleComponents/adding-volunteering/adding-volunteering.component';

interface IMenu {
  name: string,
  rout: string,
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  listMenu: Array<IMenu> = [];
  user: any = {}
  constructor(public dialog: MatDialog) {
    this.user = getFromLocalStorage('user');
    if ((this.user.roleUser != null || this.user.roleUser != undefined) && this.user.roleUser == 1) {
      this.listMenu = [
        {
          name: 'אני רוצה להתנדב היום',
          rout: '/request',
        },
        {
          name: 'פרטי התנדבויות שלי',
          rout: '/myFreeActivityDetails',
        },
        {
          name: 'היסטוריית משובים',
          rout: '/feedbackHistories',
        },
      ];
    } else if (this.user.roleUser == 2) {
      this.listMenu = [
        {
          name: 'בקשות התנדבות לאישור',
          rout: '/volunteersForApproval',
        },
        {
          name: 'סטטוס התנדבויות בעמותה',
          rout: '/freeActivitiesStatuses',
        },
        {
          name: 'התנדבויות נוכחיות',
          rout: '/freeActivitiesCurrent',
        },
        {
          name: 'התנדבויות שסויימו',
          rout: '/freeActivitiesCompleted',
        },
        {
          name: 'משובי מתנדבים',
          rout: '/volunteerFeedback',
        },
      ];
    } else if (this.user.roleUser == 3) {
      this.listMenu = [
        {
          name: 'עמותות חדשות לאישור',
          rout: '/newAssociationsForApproval',
        },
        {
          name: 'סטטוס עמותות',
          rout: '/statuses',
        },
        {
          name: 'סטטוס ההתנדבויות',
          rout: '/reportsOfAssociations',
        },
        {
          name: 'דוח מתנדב מסוים',
          rout: '/reportsOfVolunteers',
        },
        {
          name: 'קריאת משובים',
          rout: '/readingFeedback',
        },
      ];
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddingVolunteeringComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
