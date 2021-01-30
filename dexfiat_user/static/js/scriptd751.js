/* Template: UserCenter v1.0.1 @DexFiat */
(function($){
	'use strict';
	var $win = $(window), $body_m = $('body'), $navbar = $('.navbar');
	
	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () { 
		wwCurrent = winwidth(); 
	});

	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			if ($win.width() > 991) {
				if($scroll > $navm.top ){
					if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
				} else {
					if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
				}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
		});
	}
	
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $("a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}
    
	// Select
	var $selectbox = $('.input-select, select');
	if ($selectbox.length > 0) {
        $selectbox.each(function() {
			var $this = $(this);
            $this.select2();
		});
	}
    
    
    // Function For Toggle Class On click
    function tglcls(tigger,action,connect,connect2){
        var $toglr = tigger, $tgld = action,$tgcon = connect,$tgcon2 = connect2;
        $toglr.on("click",function(){
            $tgld.toggleClass('active');
            $toglr.toggleClass('active');
            if($tgcon.hasClass('active')){
                $tgcon.removeClass('active');
            }
            if($tgcon2.hasClass('active')){
                $tgcon2.removeClass('active');
            }
            return false;
        });
    }
    var $toggle_action = $('.toggle-action'), 
        $topbar_action = $('.topbar-action'), 
        $toggle_nav = $('.toggle-nav'), 
        $sidebar = $('.user-sidebar'),
        $sidebar_overlay = $('.user-sidebar-overlay');
	if ($toggle_action.length > 0 ) {
		tglcls($toggle_action,$topbar_action,$sidebar,$toggle_nav);
	}
	if ($toggle_nav.length > 0 ) {
		tglcls($toggle_nav,$sidebar,$topbar_action,$toggle_action);
	}
    if ($sidebar_overlay.length > 0 ) {
		$sidebar_overlay.on("click",function(){
            $sidebar.removeClass('active');
            $toggle_nav.removeClass('active');
        });
	}
    if(wwCurrent < 991){
        $sidebar.delay(500).addClass('user-sidebar-mobile');
    }else{
        $sidebar.delay(500).removeClass('user-sidebar-mobile');
    }
    $win.on('resize', function () { 
        if(wwCurrent < 991){
            $sidebar.delay(500).addClass('user-sidebar-mobile');
        }else{
            $sidebar.delay(500).removeClass('user-sidebar-mobile');
        }
	});

    
    
    // Countdown Clock
    var $count_token_clock = $('.token-countdown-clock');
	if ($count_token_clock.length > 0 ) {
		$count_token_clock.each(function() {
			var $self = $(this), datetime = $self.attr("data-date");
			$self.countdown(datetime).on('update.countdown', function(event) {
				$(this).html(event.strftime('' + '<div class="col"><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Days</span></div>' + '<div class="col"><span class="countdown-time">%H</span><span class="countdown-text">Hours</span></div>' + '<div class="col"><span class="countdown-time countdown-time-last">%M</span><span class="countdown-text">Minutes</span></div>'));
			});
		});
	}
    
    // Transation Data Table
    var $tranx_table = $('.tranx-table');
    if($tranx_table.length > 0){
       var $tranx_table_fltr = $tranx_table.DataTable({
           "ordering": false,
           autoWidth: false,
           "dom":'<"row"<"col-10 text-left"f><"col-2 text-right"<"data-table-filter dropdown">>><"row"<"col-12"<"overflow-x-auto"t>>><"row"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
           "pageLength": 7, 
           "bPaginate" : $('.data-table tbody tr').length>7,
           "iDisplayLength": 7,
           "language": {
                "search": "",
                "searchPlaceholder": "Type in to Search",
                "info": "_START_ -_END_ of _TOTAL_",
                "infoEmpty": "No records",
                "infoFiltered": "( Total _MAX_  )",
                "paginate": {
                    "first":      "First",
                    "last":       "Last",
                    "next":       "Next",
                    "previous":   "Prev"
                },
            },
        });
        
        $(".data-table-filter").append('<a href="#" data-toggle="dropdown"><em class="ti ti-settings"></em></a><ul class="dropdown-menu dropdown-menu-right"><li><input class="data-filter data-filter-approved" type="radio" name="filter" id="all" checked value=""><label for="all">All</label></li><li><input class="data-filter data-filter-approved" type="radio" name="filter" id="approved" value="approved"><label for="approved">Approved</label></li><li><input class="data-filter data-filter-pending" type="radio" name="filter" value="pending" id="pending"><label for="pending">Pending</label></li><li><input class="data-filter data-filter-cancled" type="radio" name="filter" value="cancled" id="cancled"><label for="cancled">Cancled</label></li></ul>');
        
        var $tranx_filter = $('.data-filter');
        $tranx_filter.on('change', function(){
            var _thisval = $(this).val();
            $tranx_table_fltr.columns('.tranx-status').search( _thisval ? _thisval : '', true, false ).draw();
        });
        
    }
    
    // Activity Data Table
    var $activity_table = $('.activity-table');
    if($activity_table.length > 0){
        $activity_table.DataTable({
           ordering: false,
           autoWidth: false,
           dom:'<"row"<"col-12"<"overflow-x-auto"t>>><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right text-center"<"clear-table">>>',
           pageLength: 7, 
           bPaginate : $('.data-table tbody tr').length>7,
           iDisplayLength: 7,
           language: {
                info: "_START_ -_END_ of _TOTAL_",
                infoEmpty: "No records",
                infoFiltered: "( Total _MAX_  )",
                paginate: {
                    first:      "First",
                    last:       "Last",
                    next:       "Next",
                    previous:   "Prev"
                },
            },
        });
        $(".clear-table").append('<a href="#" class="btn btn-primary btn-xs clear-activity">Clear Activity</a>');
    }
    
    // Activity Data Table
    var $refferal_table = $('.refferal-table');
    if($refferal_table.length > 0){
        $refferal_table.DataTable({
           ordering: false,
           autoWidth: false,
           dom:'<"row"<"col-12"<"overflow-x-auto"t>>><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right text-center"i>>',
           pageLength: 5, 
           bPaginate : $('.data-table tbody tr').length>5,
           iDisplayLength: 5,
           language: {
                info: "_START_ -_END_ of _TOTAL_",
                infoEmpty: "No records",
                infoFiltered: "( Total _MAX_  )",
                paginate: {
                    first:      "First",
                    last:       "Last",
                    next:       "Next",
                    previous:   "Prev"
                },
            },
        });
    }
    
    // Payment Chack (token page) 
    var $payment_check = $('.payment-check'), $payment_btn = $('.payment-btn');
    if($payment_check.length > 0){
        $payment_check.on('change', function(){
            var _thisval = $(this).val(), _thisHash = '#'+_thisval;
            $payment_btn.attr('data-target', _thisHash)
        });
    }
    
    
    // Tooltip
    var $tooltip = $('[data-toggle="tooltip"]');
    if($tooltip.length > 0){
        $tooltip.tooltip();
    }
    
    // Date Picker
    var $date_picker = $('.date-picker');
    if($date_picker.length > 0){
        $date_picker.each(function(){
            $date_picker.datepicker({ 
                format: 'mm/dd/yyyy',
                autoclose: true, 
                todayHighlight: true,
                startView: "0", 
                minViewMode: "0",
            }).datepicker('update', new Date());
        });
    }
    
    // Toggle
    function toggleTab(triger,action,connect){
        triger.on('click',function(){
            action.addClass('active');
            if(connect.hasClass('active')){
                connect.removeClass('active');
            }
            return false;
        });
    }
    
    // Make pay
    var $make_pay = $('.make-pay'),
        $pay_done = $('.pay-done'), 
        $tranx_payment_details = $('.tranx-payment-details'), 
        $tranx_purchase_details = $('.tranx-purchase-details');
    if($make_pay.length > 0){
        toggleTab($make_pay,$tranx_payment_details,$tranx_purchase_details)
    }
    if($pay_done.length > 0){
        toggleTab($pay_done,$tranx_purchase_details,$tranx_payment_details)
    }
    
    // Ath Open
    var $ath_trigger = $('.ath-trigger'), $ath_content = $('.ath-content');
    if($ath_trigger.length > 0){
        $ath_trigger.on('click', function(){
            $ath_content.slideDown();
            return false;
        });
    }
    
    // Dropzone
	// var $upload_zone = $('.upload-zone');
	// if ($upload_zone.length > 0 ) {
    //     Dropzone.autoDiscover = false;
	// 	$upload_zone.each(function(){
	// 		var $self = $(this);
	// 		$self.addClass('dropzone').dropzone({ url: "/file/post" });
	// 	});
	// }
    
    /*-- @v1.0.1-s */
    // Copyto clipboard
    function feedback (el, state) {
        if (state==='success'){
            $(el).parent().find('.copy-feedback').text('Copied to Clipboard').fadeIn().delay(1000).fadeOut();
        } else {
            $(el).parent().find('.copy-feedback').text('Faild to Copy').fadeIn().delay(1000).fadeOut();
        }
    }
    var clipboard = new ClipboardJS('.copy-clipboard');
    clipboard.on('success', function(e) {
        feedback(e.trigger, 'success'); e.clearSelection();
    }).on('error', function(e) {
        feedback(e.trigger, 'fail');
    });
    
    // Copyto clipboard In Modal
    var clipboardModal = new ClipboardJS('.copy-clipboard-modal', {
        container: document.querySelector('.modal')
    });
    clipboardModal.on('success', function(e) {
        feedback(e.trigger, 'success'); e.clearSelection();
    }).on('error', function(e) {
        feedback(e.trigger, 'fail');
    });
    /*-- @v101-e */
    
    // Color Switcher ( only for demo )
//	var _rimg = '../ico/images/', _rmode = 'RTL Mode', _rurl = './rtl/index.html', icom = '../ico/', icou = '../ico-user/' ;
    
    var _img_r = '../ico/images', _link_r = '../ico/', _link_o ='../ico/landing/', _user_r = './';
	$body_m.append('<div class="demo-panel"><div class="demo-list"><a class="demo-themes" title="See All Demo" href="javascript:void(0)"> <img src="'+_img_r+'/demo/demo-icon.png"> </a><a class="demo-cart" target="_blank" href="http://bit.ly/2uPFhHX"> <i class="fa fa-shopping-cart"> </i> </a><a class="demo-wp" target="_blank" href="http://bit.ly/2JnGx8h"> <i class="fab fa-wordpress"> </i> <span>WP</span> </a></div><div class="demo-content"><div class="demo-content-bg"></div> <a class="demo-close" href="javascript:void(0)">×</a><div class="demo-content-wrap"><ul class="nav tab-nav tab-nav-btn tab-nav-btn-s2"><li><a class="active" data-toggle="tab" href="#demo-showcase">Demo Showcase</a></li><li><a data-toggle="tab" href="#demo-page-list">All Pages</a></li></ul><div class="tab-content"><div class="tab-pane fade show active" id="demo-showcase"><div class="container-fluid"><div class="row demo-item-list"><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_r+'index-azalea.html"> <img src="'+_img_r+'/demo/demo-azalea.jpg" alt=""> <span class="demo-badge demo-badge-hot">v1.6</span> </a></div><div class="demo-item-text"> <a href="'+_link_r+'index-azalea.html"><h5 class="title title-sm">Azalea Dark <small>Landing V17</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_r+'index-azalea-multi.html"> <img src="'+_img_r+'/demo/demo-azalea-multi.jpg" alt=""> <span class="demo-badge demo-badge-hot">v1.6</span> </a></div><div class="demo-item-text"> <a href="'+_link_r+'index-azalea-multi.html"><h5 class="title title-sm">Azalea Multi <small>Landing V16</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_r+'index-gentian-pro.html"> <img src="'+_img_r+'/demo/demo-gentian-pro.jpg" alt=""> <span class="demo-badge">v1.5</span> </a></div><div class="demo-item-text"> <a href="'+_link_r+'index-gentian-pro.html"><h5 class="title title-sm">Gentian Pro <small>Landing V15</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_user_r+'"> <img src="'+_img_r+'/demo/demo-user.jpg" alt=""> <span class="demo-badge">v1.3</span> </a></div><div class="demo-item-text"> <a href="'+_user_r+'"><h5 class="title title-sm">User Center <small>Free Dashboard</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_r+'index-gentian.html"> <img src="'+_img_r+'/demo/demo-gentian.jpg" alt=""> <span class="demo-badge">v1.5</span> </a></div><div class="demo-item-text"> <a href="'+_link_r+'index-gentian.html"><h5 class="title title-sm">Gentian Dark<small>Landing V14</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_r+'index-gentian-multi.html"> <img src="'+_img_r+'/demo/demo-gentian-multi.jpg" alt=""> <span class="demo-badge">v1.5</span> </a></div><div class="demo-item-text"> <a href="'+_link_r+'index-gentian-multi.html"><h5 class="title title-sm">Gentian Multi<small>Landing V13</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-zinnia-particle-animate.html"> <img src="'+_img_r+'/demo/demo-zinnia.jpg" alt=""> <span class="demo-badge">v1.4.1</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-zinnia-particle-animate.html"><h5 class="title title-sm">Zinnia Pro<small>Landing V12</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-salvia-particle-animate.html"> <img src="'+_img_r+'/demo/demo-salvia.jpg" alt=""> <span class="demo-badge">v1.4</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-salvia-particle-animate.html"><h5 class="title title-sm">Salvia Pro<small>Landing V11</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-lungwort-particle-animate.html"> <img src="'+_img_r+'/demo/demo-lungwort.jpg" alt=""> <span class="demo-badge">v1.3</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-lungwort-particle-animate.html"><h5 class="title title-sm">Lungwort Dark<small>Landing V10</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-jasmine-particle-animate.html"> <img src="'+_img_r+'/demo/demo-jasmine.jpg" alt=""> <span class="demo-badge">v1.3</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-jasmine-particle-animate.html"><h5 class="title title-sm">Jasmine Light<small>Landing V9</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-lobelia-particle-animate.html"> <img src="'+_img_r+'/demo/demo-lobelia.jpg" alt=""> <span class="demo-badge">v1.2.3</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-lobelia-particle-animate.html"><h5 class="title title-sm">Lobelia Dark<small>Landing V8</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-muscari-particle-animate.html"> <img src="'+_img_r+'/demo/demo-muscari.jpg" alt=""> <span class="demo-badge">v1.2.1</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-muscari-particle-animate.html"><h5 class="title title-sm">Muscari Pro<small>Landing V7</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-lavender-particle-animate.html"> <img src="'+_img_r+'/demo/demo-lavender.jpg" alt=""> <span class="demo-badge">v1.2</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-lavender-particle-animate.html"><h5 class="title title-sm">Lavender Pro<small>Landing V6</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-azure-light-pro-particle-animate.html"> <img src="'+_img_r+'/demo/demo-azure-pro.jpg" alt=""> <span class="demo-badge">v1.1</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-azure-light-pro-particle-animate.html"><h5 class="title title-sm">Azure Pro<small>Landing V5</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-azure-particle-animate.html"> <img src="'+_img_r+'/demo/demo-azure.jpg" alt=""> <span class="demo-badge">v1.1</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-azure-particle-animate.html"><h5 class="title title-sm">Azure Dark<small>Landing V4</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-dark-pro-particle-animate.html"> <img src="'+_img_r+'/demo/demo-dark-pro.jpg" alt=""> <span class="demo-badge">v1.1</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-dark-pro-particle-animate.html"><h5 class="title title-sm">Dark Pro<small>Landing V3</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-light-particle-animate.html"> <img src="'+_img_r+'/demo/demo-pro.jpg" alt=""> <span class="demo-badge">v1.0</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-light-particle-animate.html"><h5 class="title title-sm">Light<small>Landing V2</small></h5></a></div></div></div><div class="col-lg-3 col-md-4 col-6"><div class="demo-item"><div class="demo-item-image"><a href="'+_link_o+'index-dark-particle-animate.html"> <img src="'+_img_r+'/demo/demo-dark.jpg" alt=""> <span class="demo-badge">v1.0</span> </a></div><div class="demo-item-text"> <a href="'+_link_o+'index-dark-particle-animate.html"><h5 class="title title-sm">Dark <small>Landing V1</small></h5></a></div></div></div></div></div></div><div class="tab-pane fade" id="demo-page-list"><div class="container-fluid"><div class="demo-page-list-wrap"><h3 class="title title-md tc-alternet">Landing Pages</h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'index-azalea.html">Azalea Dark <span class="badge badge-xs badge-success">v1.6</span></a></li><li><a href="'+_link_r+'index-azalea-multi.html">Azalea Multi <span class="badge badge-xs badge-success">v1.6</span></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'index-gentian.html">Gentian Dark <span class="badge badge-xs badge-dark">v1.5</span></a></li><li><a href="'+_link_r+'index-gentian-pro.html">Gentian Pro <span class="badge badge-xs badge-dark">v1.5</span></a></li><li><a href="'+_link_r+'index-gentian-multi.html">Gentian Multi <span class="badge badge-xs badge-danger">HOT</span></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-zinnia-particle-animate.html">Zinnia Pro <small>v.1.4.1</small></a></li><li><a href="'+_link_o+'index-salvia-particle-animate.html">Salvia Pro <small>v.1.4</small></a></li><li><a href="'+_link_o+'index-jasmine-particle-animate.html">Jasmine Light <small>v1.3</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-lungwort-particle-animate.html">Lungwort Dark <small>v1.3</small></a></li><li><a href="'+_link_o+'index-lobelia-particle-animate.html">Lobelia Dark <small>v1.2.3</small></a></li><li><a href="'+_link_o+'index-muscari-particle-animate.html">Muscari Pro <small>v1.2.1</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-lavender-particle-animate.html">Lavender Pro <small>v1.2</small></a></li><li><a href="'+_link_o+'index-azure-light-pro-particle-animate.html">Azure Pro <small>v.1.1</small></a></li><li><a href="'+_link_o+'index-azure-particle-animate.html">Azure Dark <small>v.1.1</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-dark-pro-particle-animate.html">Dark Pro <small>v.1.1</small></a></li><li><a href="'+_link_o+'index-dark-particle-animate.html">Dark <small>v.1.0</small></a></li><li><a href="'+_link_o+'index-light-particle-animate.html">Light <small>v.1.0</small></a></li></ul></div></div><div class="gap-4x"></div><h3 class="title title-md d-flex align-items-center tc-alternet">Landing Pages<div class="badge badge-xs badge-info ml-3">Non Animate Version</div></h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'index-azalea-woa.html">Azalea Dark <small>v.1.6</small></a></li><li><a href="'+_link_r+'index-azalea-multi-woa.html">Azalea Multi <small>v.1.6</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'index-gentian-woa.html">Gentian Dark <small>v.1.5</small></a></li><li><a href="'+_link_r+'index-gentian-pro-woa.html">Gentian Pro <small>v.1.5</small></a></li><li><a href="'+_link_r+'index-gentian-multi-woa.html">Gentian Multi <small>v.1.5</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-zinnia-particle.html">Zinnia Pro <small>v.1.4.1</small></a></li><li><a href="'+_link_o+'index-salvia-particle.html">Salvia Pro <small>v.1.4</small></a></li><li><a href="'+_link_o+'index-jasmine-particle.html">Jasmine Light <small>v.1.3</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-lungwort-particle.html">Lungwort Dark <small>v.1.3</small></a></li><li><a href="'+_link_o+'index-lobelia-particle.html">Lobelia Dark <small>v.1.2.3</small></a></li><li><a href="'+_link_o+'index-muscari-particle.html">Muscari Pro <small>v1.2.1</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-lavender-particle.html">Lavender Pro <small>v1.2</small></a></li><li><a href="'+_link_o+'index-azure-light-pro-particle.html">Azure Pro <small>v.1.1</small></a></li><li><a href="'+_link_o+'index-azure-particle.html">Azure Dark <small>v.1.1</small></a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'index-dark-pro-particle.html">Dark Pro <small>v.1.1</small></a></li><li><a href="'+_link_o+'index-dark-particle.html">Dark <small>v.1.0</small></a></li><li><a href="'+_link_o+'index-light-particle.html">Light <small>v.1.0</small></a></li></ul></div></div><div class="hr"></div><h3 class="title title-md d-flex align-items-center tc-alternet">Other Pages<div class="badge badge-xs badge-info ml-3">v1.5</div></h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'page-about.html">About Us</a></li><li><a href="'+_link_r+'page-team.html">Our Teams</a></li><li><a href="'+_link_r+'page-wallets.html">Wallets</a></li><li><a href="'+_link_r+'page-features.html">Features</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'page-token-sale.html">Token Sale</a></li><li><a href="'+_link_r+'page-roadmap.html">Roadmap</a></li><li><a href="'+_link_r+'page-faq.html">FAQs</a></li><li><a href="'+_link_r+'page-contact.html">Contact</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'page-login.html">Login - V1</a></li><li><a href="'+_link_r+'page-login-v2.html">Login - V2</a></li><li><a href="'+_link_r+'page-register.html">Register - V1</a></li><li><a href="'+_link_r+'page-register-v2.html">Register - V2</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'page-reset.html">Reset - V1</a></li><li><a href="'+_link_r+'page-reset-v2.html">Reset - V2</a></li><li><a href="'+_link_r+'_blank.html">Blank Page</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'blog-3clmn.html">Blog 3 Column</a></li><li><a href="'+_link_r+'blog-sidebar-right.html">Blog Sidebar - Left</a></li><li><a href="'+_link_r+'blog-sidebar-left.html">Blog Sidebar - Right</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'blog-details.html">Blog Single - Sidebar</a></li><li><a href="'+_link_r+'blog-details-full.html">Blog Single - Full</a></li></ul></div></div><div class="hr"></div><h3 class="title title-md d-flex align-items-center tc-alternet">Elements Pages<div class="badge badge-xs badge-info ml-3">v1.5</div></h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-alert.html">Alerts</a></li><li><a href="'+_link_r+'element-button.html">Buttons</a></li><li><a href="'+_link_r+'element-content.html">Contents</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-table.html">Tables</a></li><li><a href="'+_link_r+'element-video.html">Videos</a></li><li><a href="'+_link_r+'element-typography.html">Typogrphy</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-progress-bar.html">Progress Bar</a></li><li><a href="'+_link_r+'element-form.html">Form Elements</a></li><li><a href="'+_link_r+'element-grid.html">Grids</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-color.html">Colors</a></li><li><a href="'+_link_r+'element-modal.html">Modals</a></li><li><a href="'+_link_r+'element-notification.html">Notification</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-chart.html">Charts</a></li><li><a href="'+_link_r+'element-countdown.html">Countdown</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'element-tab.html">Tabs</a></li><li><a href="'+_link_r+'element-accordion.html">Accordions</a></li></ul></div></div><div class="hr"></div><h3 class="title title-md d-flex align-items-center tc-alternet">Blocks Pages<div class="badge badge-xs badge-info ml-3">v1.5</div></h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-navbar.html">Navbar</a></li><li><a href="'+_link_r+'block-footer.html">Footer</a></li><li><a href="'+_link_r+'block-team.html">Team</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-page-header.html">Page Header</a></li><li><a href="'+_link_r+'block-banner.html">Banner<div class="badge badge-xs badge-danger">HOT</div></a></li><li><a href="'+_link_r+'block-faq.html">FAQs</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-subscribe.html">Subscribe</a></li><li><a href="'+_link_r+'block-partner.html">Partners</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-roadmap.html">Roadmaps</a></li><li><a href="'+_link_r+'block-token-info.html">Token Info</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-feature-card.html">Features Card</a></li><li><a href="'+_link_r+'block-feature-panel.html">Features Panel</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_r+'block-ath.html">Login / Register</a></li><li><a href="'+_link_r+'block-contact.html">Contact</a></li></ul></div></div><div class="hr"></div><h3 class="title title-md d-flex align-items-center tc-alternet">Other Pages<div class="badge badge-xs badge-danger ml-3">Before 1.4</div></h3><div class="row"><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'blog-archive-light.html">Blog List - Light</a></li><li><a href="'+_link_o+'blog-archive-dark.html">Blog List - Dark</a></li><li><a href="'+_link_o+'blog-archive-dark-pro.html">Blog List - Dark Pro</a></li><li><a href="'+_link_o+'blog-archive-azure.html">Blog List - Azure</a></li><li><a href="'+_link_o+'blog-archive-azure-light-pro.html">Blog List - Azure Pro</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'blog-single-light.html">Post/News - Light</a></li><li><a href="'+_link_o+'blog-single-dark.html">Post/News - Dark</a></li><li><a href="'+_link_o+'blog-single-dark-pro.html">Post/News - Dark Pro</a></li><li><a href="'+_link_o+'blog-single-azure.html">Post/News - Azure</a></li><li><a href="'+_link_o+'blog-single-azure-light-pro.html">Post/News - Azure Pro</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'login-light.html">Login - Light</a></li><li><a href="'+_link_o+'login-dark.html">Login - Dark</a></li><li><a href="'+_link_o+'signup-light.html">Signup - Light</a></li><li><a href="'+_link_o+'signup-dark.html">Signup - Dark</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'signup-azure.html">Login - Azure</a></li><li><a href="'+_link_o+'signup-lavender.html">Login - Lavender</a></li><li><a href="'+_link_o+'signup-lobelia.html">Login - Lobelia</a></li><li><a href="'+_link_o+'signup-muscari.html">Login - Muscari</a></li></ul></div><div class="col-6 col-sm-4 col-md-3 col-lg-2"><ul class="demo-page-list"><li><a href="'+_link_o+'404-azure.html">404 - Azure</a></li><li><a href="'+_link_o+'404-light.html">404 - Light</a></li><li><a href="'+_link_o+'404-dark.html">404 - Dark</a></li></ul></div></div></div></div></div></div></div></div>');
	
    var $dtc =$('.demo-themes,.demo-close'), $dec = $('.demo-content'), $dct = $('.demo-color-toggle'), $dc = $('.demo-color'), $cot = $('.color-trigger');
        // Open/Close Demo List
        if ($dec.length > 0 ) {
            $dtc.on("click", function() {
                $dec.toggleClass('demo-active').css('display', 'block');
                $body_m.toggleClass('shown-preview');
            });
        }
        
        // Toggle Color Switcher
        if ($dct.length > 0 ) {
            $dct.on("click", function() {
                $dc.slideToggle('slow');
            });
        }
        
	if ($cot.length > 0 ) {
		$cot.on("click",function() {
			var $self = $(this);
			var $color_value = $self.attr("title");
			$("#layoutstyle").attr("href", "assets/css/" + $color_value + ".css");
			return false;
		});
	}
    
	$body_m.append('<div class="promo-content"><a href="#" class="promo-close"><em class="ti ti-close"></em></a></div><a target="_blank" href="http://bit.ly/2UzfJv2" class="promo-trigger"><div class="promo-trigger-img"><img src="images/promo-small.png" alt="TokenLite"></div><div class="promo-trigger-text">Looking for Functional<br>ICO/STO Dashboard?</div></a>');
    // Promo Switcher ( only for demo )
	var $pr_tg = $('.promo-trigger'), $pr_cn = $('.promo-content'), $pr_cl = $('.promo-close');
	if ($pr_cl.length > 0 ) {
		$pr_cl.on("click",function() {
            var getCookie = Cookies.get('twz-offer'); 
            $pr_cn.removeClass('active');
            $pr_tg.addClass('active');
            if(getCookie == null){
                Cookies.set('twz-offer', 'true', { expires: 1 , path: ''});
            }
            return false;
		});
	}
    
    $win.on('load', function(){
        var getCookie = Cookies.get('twz-offer'); 
        if(getCookie == null){
            $pr_cn.addClass('active');
        }else{
            $pr_tg.addClass('active');
        }
    });
    
})(jQuery);