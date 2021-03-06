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
  term : any;
  formData: any;
  message: any;

  tenloai: any;
  mota: any;
  

  loaitins: any;
  loaitin: any
  isCreate: boolean;
  p: number = 1;

 @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
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
          $(".modal-title").html("Xem chi tiết loại tin");
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

  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['tenloai'].setValue(null);
      this.formData.controls['mota'].setValue(null);
      $(".modal-title").html("Thêm loại tin");
      $('#formModal').modal('toggle');
      this.isCreate = true;
    });
  }

  
  onSubmitCreate(value: any) {
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;
      if(this.isCreate) {
        this._api.post('api/loaitin/create-loaitintuc', {
          tenloai: value.tenloai,        
          mota: value.mota,         
        }).takeUntil(this.unsubscribe).subscribe((res) => {
          this.message = res;
          this.loaitins.unshift(this.message);
          $("#formModal").modal('hide');
          alert('Thêm thành công!');
        });
      } else {
        this._api.post('api/loaitin/update-loaitintuc', {
          id: value.id,
          tenloai: value.tenloai,        
          mota: value.mota,  
        }).takeUntil(this.unsubscribe).subscribe((res) => {
          this.message = res;
          this.loaitins.unshift(this.message);
          $("#formModal").modal('hide');
          alert('Sửa thành công!');
        });
      }
    });
  }
  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }

  update(id: any) {
    Observable.combineLatest(
      this._api.get('api/loaitin/get-by-id-loaitin/' + id)
    ).subscribe(
      res => {
        this.loaitin = res[0];
        console.log(this.loaitin);      
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.loaitin.id);
        this.formData.controls['tenloai'].setValue(this.loaitin.tenloai);
        this.formData.controls['mota'].setValue(this.loaitin.mota);
          $(".modal-title").html("Sửa loại tin");
          $('#formModal').modal('toggle');         
          this.isCreate = false;
          //  this.formData.reset();
        });

      }
    )
  }
}
 
