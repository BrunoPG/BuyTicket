import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { BuyAssentoComponent } from './buy-assento.component';

@NgModule({
    imports: [IonicModule],
    declarations: [BuyAssentoComponent],
    exports:[BuyAssentoComponent]
})
export class BuyAssentoModule { }
