import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CharactersComponent } from '../components/characters/characters.component';
import { CharactersService } from 'src/app/providers/characters/characters.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CardCharactersComponent } from '../components/card-characters/card-characters.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComicsCharacterComponent } from './comics-character/comics-character.component';

const routes = [
    {
        path     : '',
        component: CharactersComponent
    },
    {
        path     : 'comics',
        component: ComicsCharacterComponent
    }
];

@NgModule({
    declarations: [
        CharactersComponent,
        CardCharactersComponent,
        ComicsCharacterComponent,
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
        MatSelectModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule
        
    ],
    providers: [
        CharactersService
    ],
    
})
export class CharactersModule
{
}
