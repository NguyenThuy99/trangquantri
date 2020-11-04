import { ViewChild } from '@angular/core';
import { Component, OnInit,Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-loaichude',
  templateUrl: './loaichude.component.html',
  styleUrls: ['./loaichude.component.css']
})
export class LoaichudeComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  formData: any;
  message: any;
  tenchude: any;
  loaichudes: any;
  loaichude: any;
  isCreate: boolean;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {
    debugger;
    this.formData = this.fb.group({
      id: [''],
      tenchude: ['', Validators.required]
    });
    Observable.combineLatest(
      this._api.get('api/loaichude/get-all-loaichude'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loaichudes = res[0];
        console.log(this.loaichudes);

      }, err => { }) 
    }
    view(id: any) {
      Observable.combineLatest(
        this._api.get('api/loaichude/get-by-id-loaichude/' + id)
      ).takeUntil(this.unsubscribe).subscribe(
        res => {
          this.loaichude = res[0];
          setTimeout(() => {
            this.formData.controls['id'].setValue(this.loaichude.id);
            this.formData.controls['tenchude'].setValue(this.loaichude.tenchude);
            $(".modal-title").html("Xem chi tiết loại chủ đề");
            $('#formModal').modal('toggle');
            console.log(this.loaichude)
          });
        })
    }
    delete(id: any) {
      Observable.combineLatest(
        this._api.get('api/loaichude/delete-loaichude/' + id)
      ).takeUntil(this.unsubscribe).subscribe(
        res => {
          this.loaichudes = this.loaichudes.filter(val => val.id !== id);
          alert('Xóa thành công!');
        }
      )
    }

    create() {
      setTimeout(() => {
        this.formData.controls['id'].setValue(null);
        this.formData.controls['tenchude'].setValue(null);
        
        $(".modal-title").html("Thêm sản phẩm");
        $('#formModal').modal('toggle');
        this.isCreate = true;
      });
    }
  
    onSubmitCreate(value: any) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        if(this.isCreate) {
          this._api.post('api/loaichude/create-loaichude', {
            tenchude: value.tenchude,                
          }).takeUntil(this.unsubscribe).subscribe((res) => {
            this.message = res;
            this.loaichudes.unshift(this.message);
            $("#formModal").modal('hide');
            alert('Thêm thành công!');
          });
        } else {
          this._api.post('api/loaichude/update-loaichude', {
            id: value.id,
            tenchude: value.tenchude,  
          }).takeUntil(this.unsubscribe).subscribe((res) => {
            this.message = res;
            this.loaichudes.unshift(this.message);
            $("#formModal").modal('hide');
            alert('Sửa thành công!');
          });
        }
      });
    }
    catText(text: string, limit: number): string {
      if (text.length > limit) {
        return text.substr(0, limit) + "...";
      }
      return text;
    }
  
    update(id: any) {
      Observable.combineLatest(
        this._api.get('api/loaichude/get-by-id-loaichude/' + id)
      ).subscribe(
        res => {
          this.loaichude = res[0];
          console.log(this.loaichude);
         
          setTimeout(() => {
            this.formData.controls['id'].setValue(this.loaichude.id);
          this.formData.controls['tenchude'].setValue(this.loaichude.tenchude);         
            $(".modal-title").html("Sửa sản phẩm");
            $('#formModal').modal('toggle');
            
            this.isCreate = false;
            //  this.formData.reset();
          });
  
        }
      )
    }
}
