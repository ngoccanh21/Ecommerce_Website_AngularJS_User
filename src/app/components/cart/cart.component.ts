import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { khachhang } from '../checkout/khachhang.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SanphamService } from 'src/app/service/sanpham.service';
import { hoadonban } from './hoadonban.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  showForm!: boolean;
  formValue!: FormGroup;
  khachhangModelobj: khachhang = new khachhang();
  hoadonbanModelobj: hoadonban = new hoadonban();

  //giỏ hàng storage mới
  cartitems: any;
  total: any;
  phiship: number = 30000;

  //giỏ hàng cũ
  public products: any = [];
  public grandTotal !: number;
  //public cartpluss : any;

  constructor(private cartService: CartService, private api: SanphamService, private frombuiler: FormBuilder,private frombuiler2: FormBuilder) { }

  ngOnInit(): void {

    this.cartService.items.subscribe((res) => {
      this.cartitems = res;
      this.total = 0;
      for (let x of this.cartitems) {
        x.money = Number.parseInt(x.quantity) * Number.parseInt(x.giaBan);
        this.total += x.quantity * x.giaBan;

      }
    });

    this.formValue = this.frombuiler.group({
      tenKH: [''],
      diaChi: [''],
      sdt: [''],
      tk: [''],
      pass: [''],
      anh: [''],
      //hoa don ban
      ngayBan: [''],
      tenSP: [''],
      soLuong: 0
    });
    // this.formValue = this.frombuiler2.group({
    //   ngayBan: [''],
    //   tenSP: [''],
    //   soLuong: 0
    // })

    // this.cartService.loadgiohang();


    //giỏ hàng storage cũ

    // this.cartService.loadCart();
    // this.products = this.cartService.getsanpham();
    // console.log(this.products);

    //giỏ hàng cũ

    // this.cartService.getProducts()
    // .subscribe(res=>{
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    // })
  }

  openForm() {
    //this.formValue.reset();
    this.showForm = true;
    //this.showUpdate = false;
  }


  addttKhachHang() {
    //khach hang
    this.khachhangModelobj.TenKH = this.formValue.value.tenKH;
    this.khachhangModelobj.DiaChi = this.formValue.value.diaChi;
    this.khachhangModelobj.SDT = this.formValue.value.sdt;
    this.khachhangModelobj.TK = this.formValue.value.tk;
    this.khachhangModelobj.Pass = this.formValue.value.pass;
    this.khachhangModelobj.Anh = this.formValue.value.anh;

    //hoa don ban
    //this.hoadonbanModelobj.NgayBan = this.formValue.value.ngayBan;
    this.cartitems.forEach((x: any) =>{
      // this.khachhangModelobj.TenKH = this.formValue.value.tenKH;
      // this.khachhangModelobj.DiaChi = this.formValue.value.diaChi;
      // this.khachhangModelobj.SDT = this.formValue.value.sdt;
      // this.khachhangModelobj.TK = this.formValue.value.tk;
      // this.khachhangModelobj.Pass = this.formValue.value.pass;
      // this.khachhangModelobj.Anh = this.formValue.value.anh;
      //
      this.hoadonbanModelobj.NgayBan = this.formValue.value.ngayBan;
      this.hoadonbanModelobj.TenSP = x.tenSP;
      this.formValue.value.tenSP = this.hoadonbanModelobj.TenSP;
      this.hoadonbanModelobj.SoLuong = x.quantity;
      this.formValue.value.soLuong = this.hoadonbanModelobj.SoLuong;
      this.api.addttHDB(this.hoadonbanModelobj).subscribe(res=>{
        console.log(res);
      })
      // this.api.addttKH(this.khachhangModelobj).subscribe(res=>{
      //   console.log(res);
      //   this.api.addttHDB(this.hoadonbanModelobj).subscribe(res=>{
      //     console.log(res);
      //     let ref = document.getElementById('cancel');
      //     ref?.click();
      //   })
      // })
    })
    this.api.addttKH(this.khachhangModelobj).subscribe(res=>{
      console.log(res);
      let ref = document.getElementById('cancel');
      ref?.click();
    })
    //this.hoadonbanModelobj.SoLuong = this.formValue.value.soLuong;
    
  }

  //giỏ hàng storage mới

  clearCart() {
    this.cartService.xoaCart();
    alert('Xóa giỏ hàng thành công');
    location.reload();
  }

  deleteItem(item: any) {
    this.cartService.deleteItem(item);

  }

  addQty(item: any, quantity: number) {
    item.quantity = quantity;
    item.money = Number.parseInt(item.quantity) * item.giaBan;
    this.cartService.addQty(item);
  }

  tangqty(item: any) {
    //this.cartService.tangsoluong(item);
    this.cartService.tangQty(item);
  }
  giamqty(item: any) {
    this.cartService.giamQty(item);
  }
  tangsize(item:any){
    this.cartService.tangSize(item);
  }
  giamsize(item:any){
    this.cartService.giamSize(item);
  }


  //giỏ hàng cũ
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  cartplus(item: any) {
    this.cartService.plusCart(item);
  }

  cartminus(item: any) {
    this.cartService.minusCart(item);
  }

}
