import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/service/sanpham.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-loaisanpham',
  templateUrl: './loaisanpham.component.html',
  styleUrls: ['./loaisanpham.component.css']
})
export class LoaisanphamComponent implements OnInit {

  constructor(private api:SanphamService,private route:ActivatedRoute) { }

  // data:any;
  // maLoai:any;
  // sanpham:any;
  // loaisp:any;

  // loaisphams:any;

  sanpham: any;
  loaiSp: any;
  id: any;

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params=>{
    //   this.loaisp=params.get('id');
    // });
    // //this.getListCategory(this.maLoai);
    // this.getAllLoaiSP();
    // this.getsanphambyloaisp(this.sanpham);

    this.getallsanpham();

    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });

    this.getallloaiSp();
  }

  getallsanpham() {
    this.api.getAllSanPham().subscribe(res => {
      this.sanpham = res;
      console.log(this.sanpham)
    })
  }
  getallloaiSp() {
    this.api.getallLoaiSanPham().subscribe(res => {
      this.loaiSp = res;
      console.log(this.loaiSp)
    })
  }

  laysanphamById(maloai: any) {
    this.api.getLoaiSanPhamById(maloai).subscribe((res) => {
      this.sanpham = res;
      console.log(this.sanpham)
    })
  }

  // getListCategory(id:any){
  //   this.api.getCategory(id).subscribe((res)=>{
  //     this.data=res;
  //   })
  // }

  // getAllLoaiSP(){
  //   this.api.getallLoaiSanPham().subscribe(res=>{
  //     this.loaisphams=res;
  //     //console.log(this.sanphams)
  //   })
  // }
  // getsanphambyloaisp(id: any) {
  //   this.api.getLoaiSanPhamById(id).subscribe((res) => {
  //     this.sanpham = res;
  //     console.log(this.sanpham)
  //   })
  // }

}
