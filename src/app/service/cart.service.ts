import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //giỏ hàng storage mới
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();

  //giỏ hàng cũ
  public cartItemList : any=[];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) {
    //giỏ hàng mới 
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
   }

   addgiohang(item:any) {
    item.quantity = 1;
    item.size = 40;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [item];
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
      let ok = true;
      for (let x of local_storage) {
        if (x.id == item.id) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
    
  }

  getItems() {
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart') as any) || [];
    }
  }

  deleteItem(id:any) {
    let local_storage = this.getItems().filter((x:any) => x.id != id);
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  // loadgiohang(){
  //   //this.itemsSubject = JSON.parse(localStorage.getItem("cart_item") as any) || [];
  //   JSON.parse(localStorage.getItem('cart') as any) || [];
  // }

  
  // tangsoluong(item:any){
  //   item.quantity = item.quantity + 1;
  //   this.loadgiohang();
  // }
  // giamsoluong(item:any){
  //   item.quantity = item.quantity - 1;
  //   this.loadgiohang();
  // }
  tangQty(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    for (let x of local_storage) {
      if (x.id == item.id) {
        x.quantity = item.quantity + 1;
        if(item.quantity>=item.soLuong){
          alert("quá số lượng");
          x.quantity=x.soLuong;
          //alert("quá số lượng");
        }
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }
  giamQty(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    for (let x of local_storage) {
      if (x.id == item.id) {
        x.quantity = item.quantity - 1;
        if(item.quantity<=1){
          alert("số lượng ko đc nhỏ hơn 0");
          x.quantity=1;
          //alert("số lượng ko đc nhỏ hơn 0");
          break;
        }
        //x.quantity = item.quantity - 1;
        
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }
  tangSize(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    for (let x of local_storage) {
      if (x.id == item.id) {
        x.size = item.size + 1;
        if(item.size>=43){
          x.size=item.size;
          alert("Size chân lớn quá không có size");
        }
        // x.size = item.size + 1;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }
  giamSize(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    for (let x of local_storage) {
      if (x.id == item.id) {
        x.size = item.size - 1;
        if(item.size<=36){
          x.size=item.size;
          alert("Size nhỏ quá không có size");
        }
        // x.size = item.size + 1;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  // addToCart2(sl,item){
 
  //   item.quantity = Number.parseInt(sl);
  //   let local_storage:any;
  //   if (localStorage.getItem('cart') == null) {
  //     local_storage = [item];
  //   } else {
  //     local_storage = JSON.parse(localStorage.getItem('cart'));
  //     let ok = true;
  //     for (let x of local_storage) {
  //       if (x.maSanPham == item.maSanPham) {
  //         x.quantity += Number.parseInt(sl);
  //         ok = false;
  //         break;
  //       }
  //     }
  //     if(ok){
  //       local_storage.push(item); 
  //     } 
  //   }
  //   localStorage.setItem('cart', JSON.stringify(local_storage));
  //   this.itemsSubject.next(local_storage);
  // }
  
  addQty(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    for (let x of local_storage) {
      if (x.id == item.id) {
        x.quantity = item.quantity;
        x.size= item.size;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart') as any) || [];
    return local_storage.length;
  }

  xoaCart() {
    localStorage.clear();
  //  localStorage.removeItem('cart');
  //  this.itemsSubject.next(null);
  }

  
  //giỏ hàng cũ
  //giỏ hàng cũ
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      //grandTotal += a.giaBan;
      grandTotal += a.giaBan * a.quantity;
    })
    return grandTotal;
  }
  
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  plusCart(product: any){
    product.quantity = product.quantity + 1;
    //this.productList.next(this.cartItemList);
    this.getTotalPrice();
    //console.log(product);
  }

  minusCart(product: any){
    product.quantity = product.quantity - 1;
    this.getTotalPrice();
  }

  //checkout
  getAllHDB(): Observable<any> {
    return this.http.get('http://localhost:18058/api/HoaDonBan')
  }

  addHDB(id:any) {
    return this.http.post<any>('http://localhost:18058/api/HoaDonBan/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllKH(): Observable<any> {
    return this.http.get('http://localhost:18058/api/KhachHang')
  }

  addKH(id:any) {
    return this.http.post<any>('http://localhost:18058/api/KhachHang/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  //cart local storage
  //cart local storage

  getsanpham(){
    this.cartItemList;
  }

  addtocartcart(addedItem:any) {
    this.cartItemList.push(addedItem);
    // console.log(addedItem);

    //-----check if there are items already added in cart
    /* let existingItems = [];
    if ( localStorage.getItem('cart_items')){//----- update by adding new items
      existingItems = JSON.parse(localStorage.getItem('cart_items'));
      existingItems = [addedItem, ...existingItems];
      console.log( 'Items exists');
    } */
    //-----if no items, add new items
    /* else{ 
      console.log( 'NO items exists');
      existingItems = [addedItem]
    } */

    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart_item', JSON.stringify(this.cartItemList)); 
  }

  loadCart(){
    this.cartItemList = JSON.parse(localStorage.getItem("cart_item") as any) || [];
  }

  proInCart(product:any){
    return this.cartItemList.findIndex((x:any) => x.id === product.id) > -1;
  }

  removeItem(product:any) {
    const index = this.cartItemList.findIndex((x:any) => x.id === product.id)

    if (index > -1) {
      this.cartItemList.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart() {
    // this.items = [];

    // localStorage.removeItem("cart_items")
    localStorage.clear();
  }
  
  
}
