import { Component } from '@angular/core';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { IVolunteer } from '../../../models/volunteer.interface';

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

  constructor() {
    let user = getFromLocalStorage('user');
    if ((user.roleUser != null || user.roleUser != undefined) && user.roleUser == 1) {
      this.listMenu = [
        {
          name: 'אני רוצה להתנדב היום',
          rout: '/request',
        },
        {
          name: 'פרטי התנדבות שלי',
          rout: '/volunteerDetails',
        },
        {
          name: 'היסטוריית משובים',
          rout: '/feedbackHistories',
        },
      ];
    } else if (user.roleUser == 2) {
      this.listMenu = [
        {
          name: 'בקשות התנדבות לאישור',
          rout: '/request',
        },
        {
          name: 'סטטוס התנדבויות בסניף',
          rout: '/request',
        },
        {
          name: 'התנדבבויות נוכחיות',
          rout: '/request',
        },
        {
          name: 'התנדבויות שסויימו',
          rout: '/request',
        },
        {
          name: 'משובי מתנדבים',
          rout: '/request',
        },
      ];
    } else if (user.roleUser == 3) {
      this.listMenu = [
        {
          name: 'עמותות חדשות לאישור',
          rout: '/newAssociationsForApproval',
        },
        {
          name: 'סטטוסים',
          rout: '/request',
        },
        {
          name: 'דוח עמותה מסוימת',
          rout: '/request',
        },
        {
          name: 'דוח מתנדב מסוים',
          rout: '/request',
        },
        {
          name: 'קריאת משובים',
          rout: '/request',
        },
        {
          name: 'הוספת סניף',
          rout: '/request',
        },
      ];
    }
  }
}
