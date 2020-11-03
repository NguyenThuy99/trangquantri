import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-thucdon',
  templateUrl: './thucdon.component.html',
  styleUrls: ['./thucdon.component.css']
})
export class ThucdonComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  message: any;

  tieude: any;
 
  hinhanh: any;
  

  thucdons: any;
  thucdon: any;


  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
     
      hinhanh: [''],
     
    });
    Observable.combineLatest(
      this._api.get('api/thucdon/get-all'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.thucdons = res[0];
        console.log(this.thucdon);

      }, err => { })  
  }



  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/thucdon/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.thucdon = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.thucdon.id);
          this.formData.controls['tieude'].setValue(this.thucdon.tieude);
          // this.formData.controls['hinhanh'].setValue(this.thucdon.hinhanh);
        

          $(".modal-title").html("Xem chi tiết thực đơn");
          $('#formModal').modal('toggle');
          console.log(this.thucdon)
        });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/thucdon/delete-thucdon/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.thucdons = this.thucdons.filter(val => val.id !== id);
        alert('Xóa thành công!');
      }
    )
  }

  



  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['tieude'].setValue(null);
      
      $(".modal-title").html("Thêm sản phẩm");
      $('#formModal').modal('toggle');

    });


  }

  onSubmitCreate(value: any) {

    console.log(value);
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;
      this._api.post('api/thucdon/create-thucdon', {
        tieude: value.tieude,
        
        hinhanh: data_image,

      
      }).takeUntil(this.unsubscribe).subscribe((res) => {
        this.message = res;
        this.thucdons.unshift(this.message);
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
      this._api.get('api/thucdon/get-by-id/' + id)
    ).subscribe(
      res => {
        this.thucdon = res[0];
        console.log(this.thucdon);      
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.thucdon.id);
          this.formData.controls['tieude'].setValue(this.thucdon.tieude);
          
          $(".modal-title").html("Sửa thực đơn");
          $('#formModal').modal('toggle');
          //  this.formData.reset();


        });

      }
    )
  }
}
