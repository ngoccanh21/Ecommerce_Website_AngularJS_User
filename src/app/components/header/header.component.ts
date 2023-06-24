
import { AfterViewInit,Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/service/sanpham.service';
declare var initHomeLayout:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,AfterViewInit{

  constructor(private api:SanphamService,private route:ActivatedRoute) { }

  data:any;
  maLoai:any;

  loaisphams:any;
  sanphams:any;

  ngAfterViewInit(): void {
    initHomeLayout();
  }

  ngOnInit(): void {
    this.api.getAllSanPham().subscribe(res=>{
      this.sanphams=res;
    });
    this.route.paramMap.subscribe(params=>{
      this.maLoai=params.get('id');
    });
    this.getListCategory(this.maLoai);
    this.getAllLoaiSP();
  }

  getListCategory(id:any){
    this.api.getCategory(id).subscribe((res)=>{
      this.data=res;
      console.log(this.data);
    })
  }

  getAllLoaiSP(){
    this.api.getAllLoaiSanPham().subscribe(res=>{
      this.loaisphams=res;
      //console.log(this.sanphams)
    })
  }

}
