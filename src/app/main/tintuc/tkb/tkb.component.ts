import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-tkb',
  templateUrl: './tkb.component.html',
  styleUrls: ['./tkb.component.css']
})
export class TkbComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  message: any;

  ten: any;
 
  hinhanh: any;
  

  tkbs: any;
  tkb: any;


  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      ten: ['', Validators.required],
     
      hinhanh: [''],
     
    });
    Observable.combineLatest(
      this._api.get('api/tkb/get-all'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tkbs = res[0];
        console.log(this.tkb);

      }, err => { })  
  }



  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/tkb/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tkb = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.tkb.id);
          this.formData.controls['ten'].setValue(this.tkb.ten);
          // this.formData.controls['hinhanh'].setValue(this.thucdon.hinhanh);
        

          $(".modal-title").html("Xem chi tiết thời khóa biểu");
          $('#formModal').modal('toggle');
          console.log(this.tkb)
        });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/tkb/delete-tkb/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tkbs = this.tkbs.filter(val => val.id !== id);
        alert('Xóa thành công!');
      }
    )
  }


  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['ten'].setValue(null);
      
      $(".modal-title").html("Thêm tkb");
      $('#formModal').modal('toggle');

    });


  }

  onSubmitCreate(value: any) {

    console.log(value);
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
     let data_image = data == '' ? null : data;
      this._api.post('api/tkb/create-tkb', {
        ten: value.ten,
        
        hinhanh: data_image,

      
      }).takeUntil(this.unsubscribe).subscribe((res) => {
        this.message = res;
        this.tkbs.unshift(this.message);
        $("#formModal").modal('hide');
        alert('Thêm thành công!');
      });
    });

    // location.reload();
  }
  catText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }



  update(id: any) {


    Observable.combineLatest(
      this._api.get('api/tkb/get-by-id/' + id)
    ).subscribe(
      res => {
        this.tkb = res[0];
        console.log(this.tkb);      
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.tkb.id);
          this.formData.controls['ten'].setValue(this.tkb.ten);
          
          $(".modal-title").html("Sửa tkb");
          $('#formModal').modal('toggle');
          //  this.formData.reset();


        });

      }
    )
  }

}
