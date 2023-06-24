import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/service/sanpham.service';
import { tintuc } from './tintuc.model';

@Component({
  selector: 'app-chitiettintuc',
  templateUrl: './chitiettintuc.component.html',
  styleUrls: ['./chitiettintuc.component.css']
})
export class ChitiettintucComponent implements OnInit {

  id:any;
  tt = new tintuc();

  constructor(private api:SanphamService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.getRoute(this.id)
  }
  getRoute(id:any){
    this.api.getonetintuc(id).subscribe((res:any)=>{
      this.tt = res[0];
      console.log(this.tt);
    });
  }

}
