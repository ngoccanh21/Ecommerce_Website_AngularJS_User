import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { khachhang } from './khachhang.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SanphamService } from 'src/app/service/sanpham.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public frmCustomer!: FormGroup;

  //giỏ hàng storage mới
  cartitems:any;
  total:any;
  phiship:number=30000;

  //giỏ hàng cũ
  public products : any = [];
  public grandTotal !: number;

  constructor(private cartService:CartService,private api:SanphamService,private frombuiler: FormBuilder,private router: Router) { }

  ngOnInit(): void {

    this.cartService.items.subscribe((res)=>{
      this.cartitems = res;
      this.total = 0;
      for(let x of this.cartitems){ 
        x.money = Number.parseInt(x.quantity) * Number.parseInt(x.giaBan);
        this.total += x.quantity * x.giaBan;
       
      }
    });
    console.log(this.cartitems)

    this.frmCustomer = new FormGroup({
      'tenKH': new FormControl(''),
      'diaChi': new FormControl(''),
      'sdt': new FormControl(''),
      // 'tk': new FormControl(''),
      // 'pass': new FormControl(''),
      // 'anh': new FormControl(''),
      // 'email': new FormControl(''),
  
    });

    // this.formValue = this.frombuiler.group({
    //   tenKH: [''],
    //   diaChi: [''],
    //   sdt: [''],
    //   tk: [''],
    //   pass: [''],
    //   anh: ['']
    // })

    //giỏ hàng cũ

    // this.cartService.getProducts()
    // .subscribe(res=>{
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    // })
  }

  onSubmit(val: any) {
    let obj: any = {}
    obj.kh = {
      "tenKH": val.tenKH,
      "diaChi": val.diaChi,
      "sdt": val.sdt,
      // "tk": val.tk,
      // "pass": val.pass,
      // "anh": val.anh,
      // "email": val.email,
    
    
     
    },
      obj.donhang = [
      ]
    this.cartitems.forEach((x: any) => {
      obj.donhang.push({
        // id_hdb: x.id_hdb,
        id_sp: x.id,
        tenSP: x.tenSP,
        giaBan: x.giaBan,
        soLuong: x.quantity,
        thanhTien: x.quantity*x.giaBan,
        anh: x.anh,
        size : x.size
        
       
      })
    })
    // console.log(obj);
    this.api.addorder(obj).subscribe(res => {
      console.log(res);
      localStorage.clear();
      location.reload();
      // this.router.navigate(["/dathangthanhcongnone"])
      alert('thanh toan thanh cong')
    });
    // this.frmCustomer.reset();
    // this.router.navigate(['/home'])
  }

  // addttKhachHang() {
  //   this.khachhangModelobj.TenKH = this.formValue.value.tenKH;
  //   this.khachhangModelobj.DiaChi = this.formValue.value.diaChi;
  //   this.khachhangModelobj.SDT = this.formValue.value.sdt;
  //   this.khachhangModelobj.TK = this.formValue.value.tk;
  //   this.khachhangModelobj.Pass = this.formValue.value.pass;
  //   this.khachhangModelobj.Anh = this.formValue.value.anh;
  //   this.api.addttKH(this.khachhangModelobj)
  //     .subscribe(res => {
  //       console.log(res);
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //       alert('Thêm tt người nhận hàng thành công');
  //       //this.formValue.reset();
  //       //this.getAllNhanVien();
  //     })
  // }

}
