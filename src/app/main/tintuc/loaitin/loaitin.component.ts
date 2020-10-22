import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-loaitin',
  templateUrl: './loaitin.component.html',
  styleUrls: ['./loaitin.component.css']
})
export class LoaitinComponent extends BaseComponent implements OnInit{

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  message: any;

  tenloai: any;
  mota: any;
  

  loaitins: any;
  loaitin: any
  

  // @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tenloai: ['', Validators.required],
     
      mota: ['']
   
    });
    Observable.combineLatest(
      this._api.get('api/loaitin/get-all-loai'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loaitins = res[0];
        console.log(this.loaitins);

      }, err => { })


      // Observable.combineLatest(
      //   this._api.get('api/loaitin/get-all-loai'),
  
      // ).takeUntil(this.unsubscribe).subscribe(
      //   res => {
      //     this.loai = res[0];
      //     console.log(this.loai);
  
      //   }, err => { })
  }

    

  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/loaitin/get-by-id-loaitin/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loaitin = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.loaitin.id);
          this.formData.controls['tenloai'].setValue(this.loaitin.tenloai);          
          this.formData.controls['mota'].setValue(this.loaitin.mota);
          $(".modal-title").html("Xem chi tiết sản phẩm");
          $('#formModal').modal('toggle');
        console.log(this.loaitin)
      });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/loaitin/delete-loaitintuc/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
       
        this.loaitins = this.loaitins.filter(val => val.id !== id);
        alert('Xóa thành công!');

      }

    )
  
 
  }

  // update(id: any) {

  //   Observable.combineLatest(
  //     this._api.get('api/tintuc/get-by-id/' + id)
  //   ).takeUntil(this.unsubscribe).subscribe(
  //     res => {
  //       this.tintuc = res[0];
  //       console.log(this.tintuc);
  //       setTimeout(() => {
  //         $("#updateModal").modal("toggle");
  //       });

  //     }
  //   )
  // }

  // updateLoaitin(id: any, value: any) {

  //   Observable.combineLatest(
  //     this._api.put('api/loaitin/update-loaitintuc' + id, {
  //       tenloai:value.tenloai,      
  //       mota: value.mota       
  //     })
  //   ).takeUntil(this.unsubscribe).subscribe(
  //     res => {
  //     }
  //   )
  // }


  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['tenloai'].setValue(null); 
      this.formData.controls['mota'].setValue(null);
      $(".modal-title").html("Thêm sản phẩm");
      $('#formModal').modal('toggle');
    
  });
   

  }

  onSubmitCreate(value: any) {

    console.log(value);
    // this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
    //  let data_image = data == '' ? null : data;
    this._api.post('api/loaitin/create-loaitintuc', {
      tenloai: value.tenloai,      
      mota: value.mota
    }).takeUntil(this.unsubscribe).subscribe((res) => {
      this.message = res;
      this.loaitins.unshift(this.message);
      $("#formModal").modal('hide');   
      alert('Thêm thành công!'); 
    });

  
   // location.reload();
  }
  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }



  update(id: any) {


    Observable.combineLatest(
    this._api.get('api/loaitin/get-by-id-loaitin/'+id)
  ).subscribe(
    res => {
      this.loaitin = res[0];
      console.log(this.loaitin);
      // this.idloai = this.tintuc.idloai;
      setTimeout(() => {
        this.formData.controls['id'].setValue(this.loaitin.id);
        this.formData.controls['tenloai'].setValue(this.loaitin.tenloai);
        this.formData.controls['mota'].setValue(this.loaitin.mota);
          
        $(".modal-title").html("Sửa sản phẩm");
        $('#formModal').modal('toggle');
      //  this.formData.reset();


      });

    }
  )
}
}
