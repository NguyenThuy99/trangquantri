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

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
      idloai: [''],
      mota: [''],
      hinhanh: [''],
     // ngaydang: [''],
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
        this._api.get('api/loaitin/get-all-loai'),
  
      ).takeUntil(this.unsubscribe).subscribe(
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
          $("#save").hide();
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


  
//   update(id: any) {


//     Observable.combineLatest(
//     this._api.get('api/tintuc/get-by-id/'+id)
//   ).subscribe(
//     res => {
//       this.tintuc = res[0];
//       console.log(this.tintuc);
//       this.idloai= this.tintuc.idloai;
//       setTimeout(() => {
//         this.formData.controls['id'].setValue(this.tintuc.id);
//         this.formData.controls['idloai'].setValue(this.tintuc.idloai);
//         this.formData.controls['tieude'].setValue(this.tintuc.tieude);
//         this.formData.controls['hinhanh'].setValue(this.tintuc.hinhanh);
//         this.formData.controls['noidung'].setValue(this.tintuc.noidung);
//         this.formData.controls['mota'].setValue(this.tintuc.mota);
//         $(".modal-title").html("Sửa sản phẩm");
//         $('#formModal').modal('toggle');
//       //  this.formData.reset();


//       });

//     }
//   )
// }
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
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
     let data_image = data == '' ? null : data;
    this._api.post('api/tintuc/create-tintuc', {
      tieude: value.tieude,
      idloai: +value.idloai,
      mota: value.mota,
      hinhanh: data_image,
   
      noidung: value.noidung,
    }).takeUntil(this.unsubscribe).subscribe((res) => {
      this.message = res;
      this.tintucs.unshift(this.message);
      $("#formModal").modal('hide');   
      alert('Thêm thành công!'); 
    });
   });
  
   // location.reload();
  }
}