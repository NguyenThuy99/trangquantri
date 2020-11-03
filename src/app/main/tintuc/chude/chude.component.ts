import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;

@Component({
  selector: 'app-chude',
  templateUrl: './chude.component.html',
  styleUrls: ['./chude.component.css']
})
export class ChudeComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  message: any;

  tieude: any;
  idcd: any;
  ngaydang: any;
  noidung: any;

  chudes: any;
  chude: any;
  loaichude: any

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
      idcd: [''],
      // ngaydang: [''],
      noidung: ['']

    });
    Observable.combineLatest(
      this._api.get('api/chude/get-all-chude'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.chudes = res[0];
        console.log(this.chudes);

      }, err => { })


    Observable.combineLatest(
      this._api.get('api/loaichude/get-all-loaichude'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loaichude = res[0];
        console.log(this.loaichude);

      }, err => { })
  }



  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/chude/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.chude = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.chude.id);
          this.formData.controls['tieude'].setValue(this.chude.tieude);
          this.formData.controls['noidung'].setValue(this.chude.noidung);
          this.formData.controls['idcd'].setValue(this.chude.idcd);

          $(".modal-title").html("Xem chi tiết chủ đề");
          $('#formModal').modal('toggle');
          console.log(this.chude)
        });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/chude/delete-chude/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.chudes = this.chudes.filter(val => val.id !== id);
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

  // updateTintuc(id: any, value: any) {

  //   Observable.combineLatest(
  //     this._api.put('api/tintuc/update-tintuc' + id, {
  //       tieude: value.tieude,
  //       idloai: value.idloai,
  //       mota: +value.mota,
  //       hinahanh: +value.hinhanh,
  //       ngaydang: +value.ngaydang,
  //       noidung: value.noidung,
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
      this.formData.controls['tieude'].setValue(null);
      this.formData.controls['noidung'].setValue(null);
      
      this.formData.controls['idcd'].setValue(null);

      $(".modal-title").html("Thêm sản phẩm");
      $('#formModal').modal('toggle');

    });


  }

  onSubmitCreate(value: any) {

    console.log(value);
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      // let data_image = data == '' ? null : data;
      this._api.post('api/chude/create-chude', {
        tieude: value.tieude,
        idcd: +value.idcd,
        noidung: value.noidung,
      }).takeUntil(this.unsubscribe).subscribe((res) => {
        this.message = res;
        this.chudes.unshift(this.message);
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
      this._api.get('api/chude/get-by-id/' + id)
    ).subscribe(
      res => {
        this.chude = res[0];
        console.log(this.chude);
        this.idcd = this.chude.idcd;
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.chude.id);
          this.formData.controls['tieude'].setValue(this.chude.tieude);
          
          this.formData.controls['noidung'].setValue(this.chude.noidung);
          $(".modal-title").html("Sửa sản phẩm");
          $('#formModal').modal('toggle');
          //  this.formData.reset();


        });

      }
    )
  }
}
