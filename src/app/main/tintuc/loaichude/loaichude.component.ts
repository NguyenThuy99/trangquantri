import { Component, OnInit,Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
        this._api.get('api/chude/get-by-id/' + id)
      ).takeUntil(this.unsubscribe).subscribe(
        res => {
          this.loaichude = res[0];
          setTimeout(() => {
            this.formData.controls['id'].setValue(this.loaichude.id);
            this.formData.controls['tenchude'].setValue(this.loaichude.tenchude);
            $(".modal-title").html("Xem chi tiết sản phẩm");
            $('#formModal').modal('toggle');
            console.log(this.loaichude)
          });
        })
    }
    delete(id: any) {
      Observable.combineLatest(
        this._api.get('api/chude/delete-loaichude/' + id)
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
  
      });
    }
  
    onSubmitCreate(value: any) {

      console.log(value);
      // this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        // let data_image = data == '' ? null : data;
        this._api.post('api/chude/create-chude', {
          tieude: value.tieude,
          idcd: +value.idcd,
          noidung: value.noidung,
        }).takeUntil(this.unsubscribe).subscribe((res) => {
          this.message = res;
          this.loaichudes.unshift(this.message);
          $("#formModal").modal('hide');
          alert('Thêm thành công!');
        });
      // });
  
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
        this._api.get('api/loaichude/get-by-id/' + id)
      ).subscribe(
        res => {
          this.loaichude = res[0];
          console.log(this.loaichude);
          // this.idcd = this.chude.idcd;
          setTimeout(() => {
            this.formData.controls['id'].setValue(this.loaichude.id);
            this.formData.controls['tenchude'].setValue(this.loaichude.tenchude);
            
            // this.formData.controls['noidung'].setValue(this.chude.noidung);
            $(".modal-title").html("Sửa sản phẩm");
            $('#formModal').modal('toggle');
            //  this.formData.reset();
          });
  
        }
      )
    }
}
