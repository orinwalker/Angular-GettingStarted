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

  }

  ngOnInit() {
    // the '+' below converts the id to a numeric value
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += ': ' + id;

    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
        this.listFilter = 'Ham';
        this.product = this.performFilter(this.listFilter)[0];
      },
      error: err => this.errorMessage = err
    });
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase()
        .indexOf(filterBy) !== -1);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
