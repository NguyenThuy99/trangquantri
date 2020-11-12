import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs-compat';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TinTucComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  term : any;
  formData: any;
  message: any;
  tieude: any;
  idloai: any;
  mota: any;
  hinhanh: any;
  ngaydang: any;
  noidung: any;

  tintucs: any;
  tintuc: any;
  loai: any
  isCreate: boolean;
  p: number = 1;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {
    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
      idloai: [''],
      mota: [''],
      hinhanh: [''],
      noidung: ['']
    });
    Observable.combineLatest(
      this._api.get('api/tintuc/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintucs = res[0];
        console.log(this.tintucs);
      }, err => { })
    Observable.combineLatest(
      this._api.get('api/loaitin/get-all-loai'),).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loai = res[0];
        console.log(this.loai);
      }, err => { })
  }


  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/tintuc/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintuc = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.tintuc.id);
          this.formData.controls['tieude'].setValue(this.tintuc.tieude);
          this.formData.controls['noidung'].setValue(this.tintuc.noidung);
          this.formData.controls['mota'].setValue(this.tintuc.mota);
          this.formData.controls['idloai'].setValue(this.tintuc.idloai);

          $(".modal-title").html("Xem chi tiết sản phẩm");
          $('#formModal').modal('toggle');
          console.log(this.tintuc)
        });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/tintuc/delete-tintuc/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintucs = this.tintucs.filter(val => val.id !== id);
        alert('Xóa thành công!');
      }
    )
  }
  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['tieude'].setValue(null);
      this.formData.controls['noidung'].setValue(null);
      this.formData.controls['mota'].setValue(null);
      this.formData.controls['idloai'].setValue(null);
      $(".modal-title").html("Thêm tin tức");
      $('#formModal').modal('toggle');
      this.isCreate = true;
    });
  }

  onSubmitCreate(value: any) {
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      let data_image = data == '' ? null : data;

      if(this.isCreate) {
        this._api.post('api/tintuc/create-tintuc', {
          tieude: value.tieude,
          idloai: value.idloai,
          mota: value.mota,
          hinhanh: data_image,
          noidung: value.noidung,
        }).takeUntil(this.unsubscribe).subscribe((res) => {
          this.message = res;
          this.tintucs.unshift(this.message);
          $("#formModal").modal('hide');
          alert('Thêm thành công!');
        });
      } else {
        this._api.post('api/tintuc/update-tintuc', {
          id: value.id,
          tieude: value.tieude,
          idloai: value.idloai,
          mota: value.mota,
          hinhanh: data_image,
          noidung: value.noidung,
        }).takeUntil(this.unsubscribe).subscribe((res) => {
          this.message = res;
          this.tintucs.unshift(this.message);
          $("#formModal").modal('hide');
          alert('Sửa thành công!');
        });
      }
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
      this._api.get('api/tintuc/get-by-id/' + id)
    ).subscribe(
      res => {
        this.tintuc = res[0];
        console.log(this.tintuc);
        this.idloai = this.tintuc.idloai;
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.tintuc.id);
          this.formData.controls['tieude'].setValue(this.tintuc.tieude);
          this.formData.controls['mota'].setValue(this.tintuc.mota);
          this.formData.controls['noidung'].setValue(this.tintuc.noidung);
          $(".modal-title").html("Sửa sản phẩm");
          $('#formModal').modal('toggle');
          
          this.isCreate = false;
          //  this.formData.reset();
        });

      }
    )
  }
}