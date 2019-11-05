import { Component, OnChanges, Input, Output } from '@angular/core';
import { importType } from '@angular/compiler/src/output/output_ast';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {

    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();


    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }

    onClick(): void {
     const message: string = 'The rating ' + this.rating + ' was clicked!';
     this.ratingClicked.emit(message);
    }
}
