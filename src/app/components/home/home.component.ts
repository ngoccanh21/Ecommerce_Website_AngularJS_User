
import { AfterViewInit,Component, OnInit } from '@angular/core';
declare var initHomeLayout:any;
import { SanphamService } from 'src/app/service/sanpham.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";

  sanphams:any;
  tintucs:any;
  constructor(private api:SanphamService, private cartService: CartService) { }

  ngAfterViewInit(): void {
    initHomeLayout();
  }
  //this.api.getProduct()
  ngOnInit(): void {
    this.api.getAllSanPham()
    .subscribe(res=>{
      this.productList = res;
      this.sanphams = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.api.getAllTinTuc().subscribe(res=>{
      this.tintucs = res;
    })
  }

  getAllSanPham(){
    this.api.getAllSanPham().subscribe(res=>{
      this.sanphams=res;
      console.log(this.sanphams)
    })
  }

  //giỏ hàng cũ
  addtocart(item: any){
    this.cartService.addtoCart(item);
    alert("thêm thành công");
    console.log(this.addtocart);
  }

  //giỏ hàng storage cũ
  addcart(item:any){
    this.cartService.addtocartcart(item);
    alert("thêm sản phẩm thành công");
    console.log(item);
  }

  //giỏ hàng storage mới
  addToCart(item:any){
    this.cartService.addgiohang(item);
    alert('Thêm vào giỏ hàng thành công!'); 
  }
  

}
