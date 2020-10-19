import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  formData: any;

  tieude: any;
  idloai: any;
  mota: any;
  hinhanh: any;
  ngaydang: any;
  noidung: any;

  tintucs: any;
  tintuc: any;
  loai: any
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
      idloai: [''],
      mota: [''],
      hinhanh: [''],
      ngaydang: [''],
      noidung: ['']

    });
    Observable.combineLatest(
      this._api.get('api/tintuc/get-all'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintucs = res[0];
        console.log(this.tintucs);

      }, err => { })
  }

  getProduct(id: any) {
    Observable.combineLatest(
      this._api.get('api/tintuc/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintuc = res;
        console.log(this.tintuc)
      }
    )
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/tintuc/delete-tintuc/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintucs = this.tintucs.filter(val => val.id !== id);

      }

    )
    alert('Xóa thành công!');
    location.reload();
  }

  update(id: any) {

    Observable.combineLatest(
      this._api.get('api/tintuc/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.tintuc = res[0];
        console.log(this.tintuc);
        setTimeout(() => {
          $("#updateModal").modal("toggle");
        });

      }
    )
  }

  updateTintuc(id: any, value: any) {

    Observable.combineLatest(
      this._api.put('api/tintuc/update-tintuc' + id, {
        tieude: value.tieude,
        idloai: value.idloai,
        mota: +value.mota,
        hinahanh: +value.hinhanh,
        ngaydang: +value.ngaydang,
        noidung: value.noidung,
      })
    ).takeUntil(this.unsubscribe).subscribe(
      res => {

      }
    )
  }


  //Show modal
  create() {
    $('#formModal').modal('toggle');
  }

  onSubmitCreate(value: any) {

    console.log(value);
    this._api.post('api/tintuc/create-tintuc', {
      tieude: value.tieude,
      idloai: value.idloai,
      mota: +value.mota,
      hinahanh: +value.hinhanh,
      ngaydang: +value.ngaydang,
      noidung: value.noidung,
    }).takeUntil(this.unsubscribe).subscribe((res) => {
      // this.message = res;      
    });
    alert('Thêm thành công!');
    location.reload();
  }
}