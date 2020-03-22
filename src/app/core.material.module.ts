import { NgModule } from '@angular/core';
import {
  MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatButtonModule, MatToolbarModule,
  MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatDividerModule, MatButtonToggleModule,
  MatSidenavModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule,
  MatCheckboxModule, MatChipsModule, MatStepperModule, MatDialogModule, MatExpansionModule,
  MatGridListModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule,
  MatRadioModule, MatRippleModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import 'hammerjs';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule
  ]
})
export class CoreMaterialModule { }
