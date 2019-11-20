import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    _listFilter: string;
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
        this.listFilter = '';
    }

    ngOnInit(): void {
        console.log ('inside OnInit');

        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });

        this._listFilter = 'Ga';
        this.listFilter = 'Ga';
        this.performFilter(this._listFilter);
    }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
        // alert(this.filteredProducts);
    }

    onRatingClicked(message: string) {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase()
                .indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        console.log('you called toggleImage');
        this.showImage = !this.showImage;
    }
}
