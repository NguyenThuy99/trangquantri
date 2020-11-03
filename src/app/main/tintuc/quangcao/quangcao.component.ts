import { Component, OnInit,Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/lib/base-component';
declare var $: any;
@Component({
  selector: 'app-quangcao',
  templateUrl: './quangcao.component.html',
  styleUrls: ['./quangcao.component.css']
})
export class QuangcaoComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  formData: any;
  message: any;

  tieude: any;
  idqc: any;
  video: any;
  

  quangcaos: any;
  quangcao: any;
  loaiqc:any;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  ngOnInit(): void {

    this.formData = this.fb.group({
      id: [''],
      tieude: ['', Validators.required],
      idqc: [''],
      video: ['']
    
    });
    Observable.combineLatest(
      this._api.get('api/quangcao/get-all-quangcao'),

    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.quangcaos = res[0];
        console.log(this.quangcaos);

      }, err => { })


    Observable.combineLatest(
      this._api.get('api/loaiquangcao/get-all-loaiquangcao'),
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.loaiqc = res[0];
        console.log(this.loaiqc);
      }, err => { })
  }



  view(id: any) {
    Observable.combineLatest(
      this._api.get('api/quangcao/get-by-id/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.quangcao = res[0];
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.quangcao.id);
          this.formData.controls['tieude'].setValue(this.quangcao.tieude);
          this.formData.controls['video'].setValue(this.quangcao.video);       
          this.formData.controls['idqc'].setValue(this.quangcao.idqc);

          $(".modal-title").html("Xem chi tiết sản phẩm");
          $('#formModal').modal('toggle');
          console.log(this.quangcao)
        });
      })
  }

  delete(id: any) {
    Observable.combineLatest(
      this._api.get('api/quangcao/delete-quangcao/' + id)
    ).takeUntil(this.unsubscribe).subscribe(
      res => {
        this.quangcaos = this.quangcaos.filter(val => val.id !== id);
        alert('Xóa thành công!');
      }
    )
  }

  //Show modal
  create() {
    setTimeout(() => {
      this.formData.controls['id'].setValue(null);
      this.formData.controls['tieude'].setValue(null);
      this.formData.controls['video'].setValue(null);    
      this.formData.controls['idqc'].setValue(null);
      $(".modal-title").html("Thêm sản phẩm");
      $('#formModal').modal('toggle');

    });
  }

  onSubmitCreate(value: any) {

    console.log(value);
    this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
      // let data_image = data == '' ? null : data;
      this._api.post('api/quangcao/create-quangcao', {
        tieude: value.tieude,
        idqc: +value.idqc,
        video: value.video,
        // hinhanh: data_image,

       
      }).takeUntil(this.unsubscribe).subscribe((res) => {
        this.message = res;
        this.quangcaos.unshift(this.message);
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
      this._api.get('api/tintuc/get-by-id/' + id)
    ).subscribe(
      res => {
        this.quangcao = res[0];
        console.log(this.quangcao);
        this.idqc = this.quangcao.idqc;
        setTimeout(() => {
          this.formData.controls['id'].setValue(this.quangcao.id);
          this.formData.controls['tieude'].setValue(this.quangcao.tieude);
          this.formData.controls['video'].setValue(this.quangcao.video);
        
          $(".modal-title").html("Sửa sản phẩm");
          $('#formModal').modal('toggle');
          //  this.formData.reset();


        });

      }
    )
  }
}
