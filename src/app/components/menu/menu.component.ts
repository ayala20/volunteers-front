import { Component } from '@angular/core';
import { getFromLocalStorage } from 'src/app/shared/storageUtils';
import { IVolunteer } from '../../models/volunteer.interface';

interface IMenu {
  name: string,
  rout: string
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
    if (user.dateOfBirth != null || user.dateOfBirth != undefined) {
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
    } else if (user.branch_id != null || user.branch_id != undefined) {
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
    }
  }
}
