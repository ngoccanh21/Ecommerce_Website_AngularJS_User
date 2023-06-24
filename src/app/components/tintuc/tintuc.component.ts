import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/service/sanpham.service';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {

  tintucs:any;

  constructor(private api:SanphamService) { }

  ngOnInit(): void {
    this.api.getAllTinTuc().subscribe(res=>{
      this.tintucs = res;
    })

  }

}
