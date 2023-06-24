import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sanpham } from '../components/chitietsp/sanpham.model';
import { tintuc } from '../components/chitiettintuc/tintuc.model';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  constructor(private http:HttpClient) { }
  getAllSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/SanPham')
  }
  getSanPhamById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/SanPham/'+id)
  }
  getonesp(id:number):Observable<sanpham>{
    return this.http.get<sanpham>('http://localhost:18058/api/SanPham/'+id).pipe()
  }

  getCategory(maLoai:any){
    return this.http.get('http://localhost:18058/api/LoaiSanPham/' +maLoai)
  }

  getAllLoaiSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/LoaiSanPham')
  }
  // find(id:number):Observable<Product>{
  //   return this.httpClient.get<Product>(`${apiUrl}/${id}`).pipe(
  //   )
  // }

  getProduct(){
    return this.http.get<any>("http://localhost:18058/api/SanPham")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //tin tức http://localhost:18058/api/TinTuc

  getAllTinTuc(): Observable<any> {
    return this.http.get('http://localhost:18058/api/TinTuc')
  }

  getTinTucById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/TinTuc'+id)
  }

  getonetintuc(id:number):Observable<tintuc>{
    return this.http.get<tintuc>('http://localhost:18058/api/TinTuc/'+id).pipe()
  }

  //sản phẩm by loại sp
  getallLoaiSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/LoaiSanPham')
  }
  getLoaiSanPhamById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/SanPham/api/sanphams/getsanphambyid/'+id)
  }
  //checkout cũ
  addttKH(id:any) {
    return this.http.post<any>('http://localhost:18058/api/KhachHang/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  addttHDB(id:any) {
    return this.http.post<any>('http://localhost:18058/api/HoaDonBan/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  //thanh toán
  addorder(obj:any) {
    return this.http.post<any>('http://localhost:18058/api/HoaDonBan/checkout/',obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
