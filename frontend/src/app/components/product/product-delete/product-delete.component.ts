import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(`${id}`).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    if(this.product) {
      if(this.product.name !== '' && this.product.price != null) {
        this.productService.delete(`${this.product.id}`).subscribe(() => {
          this.productService.showMessage('Produto excluido!')
          this.router.navigate(['/products'])
        })
      } else {
        this.productService.showMessage('Erro na exclusão', true)
        this.router.navigate(['/products'])
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
