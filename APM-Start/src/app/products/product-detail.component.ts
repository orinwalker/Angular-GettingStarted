import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  _listFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
    this.listFilter = '';
  }

  ngOnInit() {
    // the '+' below converts the id to a numeric value
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += ': ' + id;

    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

    const prodLen = this.products.length;
    alert(prodLen);


    this.listFilter = 'Garden Cart';
    // this.products = this.performFilter('Garden Cart');

    // alert('[' + this.products.length + ']');

    // this.pageTitle += this.products.length;
    // this.product = this.products[0];

    // this.product = {
    //   productId: id,
    //   productName: 'Garden Cart',
    //   productCode: 'GDN-0023',
    //   releaseDate: 'March 18, 2019',
    //   description: '15 gallon capacity rolling garden cart',
    //   price: 32.99,
    //   starRating: 4.2,
    //   imageUrl: 'assets/images/garden_cart.png'
    // };
  }

  get listFilter(): string {
    return this._listFilter;
}

set listFilter(value: string) {
    this._listFilter = value;

    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    // alert(this.filteredProducts.length);
  }

performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    // alert(filterBy);

    const myFilter = this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase()
        .indexOf(filterBy) !== -1);

    // alert(myFilter);
    return myFilter;
    // return this.products.filter((product: IProduct) =>
    //     product.productName.toLocaleLowerCase()
    //         .indexOf(filterBy) !== -1);
}

  // performFilter(id: string): IProduct[] {
  //   const myProducts = this.products.filter((product: IProduct) =>
  //     product.productName === id);
  //   alert('[' + myProducts.length + ']');
  //   return null;
  // }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
