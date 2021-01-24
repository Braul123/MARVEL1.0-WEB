import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CharactersComponent } from './characters.component';
import { CharactersService } from 'src/app/providers/characters/characters.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';


const routes = [
    {
        path     : '',
        component: CharactersComponent
    }
];

@NgModule({
    declarations: [
        CharactersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        CommonModule,
        MatCardModule,
        MatListModule,
        LayoutModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSelectModule
    ],
    providers: [
        CharactersService
    ],
    
})
export class CharactersModule
{
}
