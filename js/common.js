$(document).ready(function(){
	$('.wrap').css('height', $(window).height());
	$('.wrap').css('min-height', $('.wrap_content').height());
	/* resize */
	$(window).on('resize', function(){
		$('.wrap').css('height', $(window).height());
		$('.wrap').css('min-height', $('.wrap_content').height());
	});
	/* lnb */
	$('.wrap_lnb .menu a').click(function(){
		$(this).parents('li').addClass('on').siblings('li').removeClass('on');
	});

 /* layer popup center open */
	$('.btn_pop_open').click(function(event){
		$('.pop_inner').css({
			'top':(($(window).height()-$('.pop_inner').outerHeight())/2)+'px',
			'left':(($(window).width()-$('.pop_inner').outerWidth())/2)+'px'
		});
	  $('body').css('overflow','hidden');//body scroll hide
		$('.wrap_layer .btn_area .btn_default').attr('tabindex', '1');
		$('.wrap_layer .btn_area .btn_primary').attr('tabindex', '0').focus();
		$('.wrap_layer .btn_area .btn').keydown(function (key){
    	if(key.keyCode == 13){//enter 13
        $(this).trigger('click');
			} else if(key.keyCode == 32){//space bar 32
        $(this).trigger('click');
			} else if(key.keyCode == 37){//left arrow 37
        $(this).prev('.btn').focus();
			} else if(key.keyCode == 39){//right arrow 39
        $(this).next('.btn').focus();
			}
    });
  });

 /* layer popup close */
	$('.wrap_layer .btn_close').click(function(event){
		$('body').css('overflow','auto');//body scroll show
		$('.wrap_layer .btn_area .btn_default').removeAttr('tabindex');
		$('.wrap_layer .btn_area .btn_primary').removeAttr('tabindex');
	});

	/* selectbox */
	$('select:not(.ignore)').niceSelect({
		width:'max-content',
		minWidth:'100%'
	});

	/* calendar */
	flatpickr.localize(flatpickr.l10ns.ko); //korean
	$('.calendar').flatpickr({
		enableTime:false,
		monthSelectorType:'static',
		local:'ko',
	});
	$('.time').flatpickr({
		enableTime:true,
    noCalendar:true,
    dateFormat:'H:i',
	});
	$('.calendar_range').flatpickr({
		enableTime:true,
		monthSelectorType:'static',
		local:'ko',
		mode:'range',
		dateFormat:'Y-m-d H:i:S',
		enableSeconds:true
	});
	/* calendar icon */
	$('.wrap_calendar .ico').click(function(){
		$(this).siblings('.inp').trigger('click');
	});

	/* table sort button */
	$('.btn_sort').click(function(){
		$(this).toggleClass('on');
	});

	/* paging */
	$('.paging a').click(function(){
		$(this).addClass('current').siblings('a').removeClass('current');
	});

	/* accodian table */
	$('.tbl_accodian .toggle_btn').click(function(e){
		e.stopPropagation();
		$(this).toggleClass('array_down').siblings().removeClass('array_down').parents().next('.toggle_view').toggleClass('show').next('.toggle_view2').removeClass('show');
	});

	$('.tbl_accodian .toggle_btn2').click(function(e){
		e.stopPropagation();
		$(this).toggleClass('array_down').siblings().removeClass('array_down').parents().next('tr').removeClass('show').next('.toggle_view2').toggleClass('show');
	});

	/* 문자 치열 정의 추가 */
	$('.btn_add_area .btn_add').click(function(){
		$(this).parent().prev('.tbl_change').append('<tr><td><input type="text" class="inp" value=""></td><td><input type="text" class="inp" value=""></td><td><button type="button" class="btn_del">삭제</button></td></tr>');
	});

	/* 상세 내용 추가 */ 
	$('.tbl_add').on('click', '.btn_add', function(){
		$(this).parent().parent().after('<tr><th scope="row"></th><td><div class="select_area w_100"><select name="" id="" required><option value="">DTMF</option><option value="" selected>STT</option></select></div></td><td><div class="textarea"><textarea name="" id="" cols="100" rows="2"></textarea></div></td><td><button type="button" class="btn_del">삭제</button></td><td><button type="button" class="btn_add">추가</button></td></tr>');
		$('select:not(.ignore)').niceSelect({
			refresh:'true'
		});
	});

	var del = function(target) {
		$(document).on('click', target, function(){
			$(this).parent().parent('tr').remove();
		});
	}
	del('.tbl_type1 .btn_del');

	/* 배포생성화면 선택 항목 삭제 */
	$(document).on('click', '.box_choice .btn_tag_close', function(){
		$(this).parent('span').remove();
    
		var tag = $(this).parent('span').attr('class');
		var inp = $('.tbl_tag tbody .checkbox');
		$(inp).each(function(){
			if ($(this).hasClass(tag)){
				$(this).prop('checked', false);
				$('.check_all').prop('checked', false);
			}
		});
	});

	/* check 항목 추가 삭제 */
	var inpID = function(target){
		var i = 1;
		$(target).each(function(){
			$(this).addClass('item' + i);
			i++;
		});
		$(target).change(function(){
			var gName = $(this).parent().siblings('.g_name').text();
			var className = $(this).attr('class');
			if ($(this).is(':checked')){
				$('<span>' + gName + '<button class="btn_tag_close">닫기</button></span>').addClass(className).appendTo('.box_choice .items');
			} else if ($(this).prop('checked', false)){
				$('.box_choice .items span').each(function(){
					if ($(this).hasClass(className)){
						$(this).remove();
					}
				});
			}
		});
	}
	inpID('.tbl_tag tbody .checkbox');

	/* checkbox */
	$('.checkbox input').on('click', function(e){
		e.stopImmediatePropagation();
	});

	/* checkbox all */
	var checkAll = function(target, targetAll, gName){
		$(targetAll).click(function(){
			if ($(targetAll).is(':checked')){
				$(target).prop('checked', true);
				
				$('.box_choice .items span').remove();
				var text = $(gName).get();
				var i = 0;
				$(text).each(function(i){
					$('<span>' + text[i].innerText + '<button class="btn_tag_close">닫기</button></span>').addClass('checkbox item' + (i + 1)).appendTo('.box_choice .items');
					i++;
				});
			}	else {
				$(target).prop('checked', false);
				$('.box_choice .items span').remove();
			}
		});
		$(target).click(function(){
			var total = $(target).length;
			var checked = $(target + ':checked').length;
			if (total != checked) {
				$(targetAll).prop('checked', false);
			}	else {
				$(targetAll).prop('checked', true); 
			}
		});
	}
	checkAll('input[name="chk"]', '.check_all', '.g_name');
	
	/* layer popup move */
	var x_styleLeft, y_styleTop, x_accept, y_accept;
	$('.layer_move .pop_top').mousedown(function(event){
		x_styleLeft = event.clientX - $('.layer_move').offset().left;
		y_styleTop = event.clientY - $('.layer_move').offset().top;
		$(document).mousemove(function(event){
			x_accept = event.clientX - x_styleLeft;
			y_accept = event.clientY - y_styleTop;
			$('.layer_move').css('left',x_accept+'px');
			$('.layer_move').css('top',y_accept+'px');
		});
	});
	}).mouseup(function(){
	$(this).off('mousemove');
});
//layer popup
function view_layer(name){
	document.getElementById(name).style.display='block';
}
function close_layer(name){
	document.getElementById(name).style.display='none';
}