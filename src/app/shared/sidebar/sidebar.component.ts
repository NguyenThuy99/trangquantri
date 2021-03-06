import { Component, OnInit,AfterViewInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menus = [
    {name :'Người dùng', url:'',icon:'user',childs:[{name:'Quản lý người dùng',url:'user/user'},{name:'Đăng xuất', url:''},{name:'Đăng nhập', url:'/login'}]},
    {name:'Quản trị',url:'',icon:'user',childs:[{name:'Quản lý loai tin',url:'/quanly/loaitin'},
    {name:'Quản lý tin tức',url:'/quanly/tintuc'},  
    {name:'Quản lý chủ đề',url:'/quanly/chude'},
    {name:'Quản lý loai chủ đề',url:'/quanly/loaichude'},
    {name:'Quản lý thực đơn',url:'/quanly/thucdon'},
    {name:'Quản lý thời khóa biểu',url:'/quanly/tkb'},
    {name:'Quản lý thời quảng cáo',url:'/quanly/quangcao'}
  ]}
  ];
    constructor() { } 

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    $('#sidebar-collapse').click(function () {
      setTimeout(() => {
        let event;
        if (typeof (Event) === 'function') {
          event = new Event('resize');
        } else {
          event = document.createEvent('Event');
          event.initEvent('resize', true, true);
        }
        window.dispatchEvent(event);
      }, 100);
      if (!$('#sidebar').hasClass('menu-min')) {
        $('.main-content').css('padding-left', '43px');
        $('.footer-inner').css('left', '43px');
      } else {
        $('.main-content').css('padding-left', '190px');
        $('.footer-inner').css('left', '190px');
      }
    });
    setTimeout(() => {
      let event;
      if (typeof (Event) === 'function') {
        event = new Event('resize');
      } else {
        event = document.createEvent('Event');
        event.initEvent('resize', true, true);
      }
      window.dispatchEvent(event);
    }, 100);
    setTimeout(() => {
      $('.main-content').css('padding-left', $('#sidebar').width() + 1);
      $('.footer-inner').css('left', $('#sidebar').width() + 1);
    }, 100);
  }
}
