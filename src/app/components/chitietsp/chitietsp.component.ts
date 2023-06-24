import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/service/sanpham.service';
import { sanpham } from './sanpham.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-chitietsp',
  templateUrl: './chitietsp.component.html',
  styleUrls: ['./chitietsp.component.css']
})
export class ChitietspComponent implements OnInit {
  // id_sp=0;
  // sanpham:any;
  sp = new sanpham();
  id:any;
  // data:any={}

  //masp: any;
  sanpham: any;
  prd:any;  
  tenSP:any;
  maLoai:any;
  anh:any;
  giaBan:any;
  sale:any;
  soLuong:any;
  moTa:any;
  tinhTrang:any;
  //tenSP maLoai giaBan sale soLuong moTa tinhTrang

  constructor(private spService:SanphamService, private router:ActivatedRoute, private cartService:CartService) {
    //this.id = this.router.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    //this.router.params.subscribe(params=>this.getSPByID(params['id']));
    //this.getSP();
    // this.getRoute(this.router.snapshot.params['id']);
    //this.getRoute(this.id);
    this.chitietsanpham(this.id);
    this.loadProductDetails();
  }
  listsptt:any=[];
  loadProductDetails(){
    this.prd = localStorage.getItem('ProductDetail')
    if (this.prd) {
      this.id = JSON.parse(this.prd).id;
      // this.tensp = JSON.parse(this.prd).tensp;     
      // this.dongia = JSON.parse(this.prd).dongia;
      // this.soluong = JSON.parse(this.prd).soluong;
      // this.tinhtrang = JSON.parse(this.prd).tinhtrang;
      // this.mota = JSON.parse(this.prd).mota;
      this.maLoai= JSON.parse(this.prd).maLoai;
      // this.mancc = JSON.parse(this.prd).mancc;
      // this.khuyenmai = JSON.parse(this.prd).khuyenmai;
      // this.anh = JSON.parse(this.prd).anh;
    }
    this.spService.getAllSanPham().subscribe(res=>{
      let i=0;
      res.forEach((e:any) => {
        if(e.maLoai==this.maLoai && e.id!=this.id)
        {
          this.listsptt[i]=e;
          i++;
        }
      });
      console.log(this.listsptt);
  
    })
  }

  chitietsanpham(id: any){
    this.spService.getSanPhamById(id).subscribe((res) => {
      this.sanpham=res[0]
      //tenSP maLoai giaBan sale soLuong moTa tinhTrang anh id
      localStorage.setItem('ProductDetail',JSON.stringify(res[0]));  
      localStorage.setItem('id',JSON.stringify(res[0].id));
      localStorage.setItem('tenSP',JSON.stringify(res[0].tenSP));
      localStorage.setItem('maLoai',JSON.stringify(res[0].maLoai));
      localStorage.setItem('giaBan',JSON.stringify(res[0].giaBan));
      localStorage.setItem('sale',JSON.stringify(res[0].sale));
      localStorage.setItem('soLuong',JSON.stringify(res[0].soLuong));
      localStorage.setItem('moTa',JSON.stringify(res[0].moTa));
      localStorage.setItem('tinhTrang',JSON.stringify(res[0].tinhTrang));
      localStorage.setItem('anh',res[0].anh);
      // this.sanpham=localStorage.getItem('ProductDetail');
      // console.log(this.sanpham)
      this.id =localStorage.getItem('id') ;
      this.tenSP =localStorage.getItem('tenSP') ;
      this.maLoai =localStorage.getItem('maLoai') ;
      this.giaBan =localStorage.getItem('giaBan') ;
      this.sale =localStorage.getItem('sale') ;
      this.soLuong =localStorage.getItem('soLuong') ;
      this.moTa =localStorage.getItem('moTa') ;
      this.tinhTrang =localStorage.getItem('tinhTrang') ;
      this.anh =localStorage.getItem('anh') ;
      //this.mancc =localStorage.getItem('mancc') ;
      // console.log(this.masp)
    })

  }

  addToCart(item: any) {
    this.cartService.addgiohang(item);
    alert('Thêm vào giỏ hàng thành công!');
  }

  getRoute(id:any){
    this.spService.getonesp(id).subscribe((res:any)=>{
      this.sp = res[0];
      console.log(this.sp);
    });
  }

  // getSP(){
  //   this.api.getSanPhamById(this.id).subscribe(res=>{
  //     this.data=res;
  //   })
  // }

  // sp:sanpham | undefined;
  
  // getSPByID(id:number){
  //   this.api.getSanPhamById(id).subscribe((data:sanpham)=>this.sp=data);
  // }

}
