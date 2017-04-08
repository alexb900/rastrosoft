   
    function toggle_left(){
        windowsize = $('#sidebarLeft').width();
        if (windowsize < 1) {
          $('#sidebarLeft').css("min-width","260px");
          $('#sidebarLeft').css("width","260px");
          $('.sidebar-toggle-left').css("visibility","hidden");
          $('.left-btn-toggle').css("width", "0px");
        }else{
          $('#sidebarLeft').css("min-width","0px");
          $('#sidebarLeft').css("width","0px");  
          $('.sidebar-toggle-left').css("visibility","visible"); 
          $('.left-btn-toggle').css("width", "50px");
        }
    }
    function toggle_right(){
        windowsize = $('#sidebarRight').width();
        if (windowsize < 1) {
          $('#sidebarRight').css("min-width","260px");
          $('#sidebarRight').css("width","260px");
          $('.sidebar-toggle-right').css("visibility","hidden");
          $('.right-btn-toggle').css("width", "0px");
        }else{
          $('#sidebarRight').css("min-width","0px");
          $('#sidebarRight').css("width","0px");  
          $('.sidebar-toggle-right').css("visibility","visible"); 
          $('.right-btn-toggle').css("width", "50px");
        }
    }
    function toggle_right_size(){
        windowsize = $('#sidebarRight').width();
        
        if (windowsize > 260) {
          $('#sidebarRight').css("min-width","260px");
          $('#sidebarRight').css("width","260px");
          $('#size-btn-toggle-right').removeClass('fa-angle-right').addClass('fa-angle-left');
          
          //$('#sidebar-right-container').removeClass('container');
          $('#sidebar-right-container').css("padding-top","");
          $('.sidebar-box').css("float","");
          $('.sidebar-box').css("margin-left","");
          $('.form-group').css("width","");
          $('.sidebar-fullscreen').css("display","none");
          $("#setRaDec").appendTo("#setRaDecNormal");
          $("#normalScreen").appendTo("#normalScreenContainer");
          
        }else{
          $('#size-btn-toggle-right').removeClass('fa-angle-left').addClass('fa-angle-right');
          $('#sidebarRight').css("min-width","720px");
          $('#sidebarRight').css("width","100%");
          
          
          //$('#sidebar-right-container').addClass('container');
          $('#sidebar-right-container').css("padding-top","50px");
          $('.sidebar-box').css("float","left");
          $('.sidebar-box').css("margin-left","50px");
          $('.form-group').css("width","800px");
          $('.sidebar-fullscreen').css("display","block");
          $("#setRaDec").appendTo("#setRaDecFullscreen");
          $("#normalScreen").appendTo("#fullscreenContainer");
        }
    }
$(document).ready(function() {

    $('.sidebar-toggle-left').on('click', function() {
        toggle_left();
    });
    $('.sidebar-toggle-right').on('click', function() {
        toggle_right();
    });   
    

});

// Sidebar toggle old
//
// -------------------
$(document).ready(function() {
    var overlay = $('.sidebar-overlay');
    
    $('.sidebar-toggle').on('click', function() {
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
//        $('#sidebar-open-button').toggleClass('hidden');
//        $('#sidebar-open-button').toggleClass('visible');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.on('click', function() {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });

});

// Sidebar constructor
//
// -------------------
$(document).ready(function() {
    var sidebar = $('#sidebar');
    var sidebarHeader = $('#sidebar .sidebar-header');
    var sidebarImg = sidebarHeader.css('background-image');
    var toggleButtons = $('.sidebar-toggle');

    // Hide toggle buttons on default position
    toggleButtons.css('display', 'none');
    $('body').css('display', 'table');

    
    // Sidebar position
    $('#sidebar-position').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open');
        if (value == 'sidebar-fixed-left' || value == 'sidebar-fixed-right') {
            $('.sidebar-overlay').addClass('active');
        }
        // Show toggle buttons
        if (value != '') {
            toggleButtons.css('display', 'initial');
            $('body').css('display', 'initial');
        } else {
            // Hide toggle buttons
            toggleButtons.css('display', 'none');
            $('body').css('display', 'table');
        }
    });

    // Sidebar theme
    $('#sidebar-theme').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-default sidebar-inverse sidebar-colored sidebar-colored-inverse').addClass(value);
    });

    // Header cover
    $('#sidebar-header').change(function() {
        var value = $(this).val();

        $('.sidebar-header').removeClass('header-cover').addClass(value);

        if (value == 'header-cover') {
            sidebarHeader.css('background-image', sidebarImg);
        } else {
            sidebarHeader.css('background-image', '');
        }
    });
init_menu();

});

(function($) {
    var dropdown = $('.dropdown');

    // Add slidedown animation to dropdown
    dropdown.on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // Add slideup animation to dropdown
    dropdown.on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });
})(jQuery);



(function(removeClass) {

    jQuery.fn.removeClass = function( value ) {
		if ( value && typeof value.test === "function" ) {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];
				if ( elem.nodeType === 1 && elem.className ) {
					var classNames = elem.className.split( /\s+/ );

					for ( var n = classNames.length; n--; ) {
						if ( value.test(classNames[n]) ) {
							classNames.splice(n, 1);
						}
					}
					elem.className = jQuery.trim( classNames.join(" ") );
				}
			}
		} else {
			removeClass.call(this, value);
		}
		return this;
	};

})(jQuery.fn.removeClass);


function init_menu(){
    $('#sidebarLeft').addClass('open');
    $('#sidebarRight').addClass('open');
    $('body').css('display', 'initial');
    $('.sidebar-toggle').css('display', 'none');
}

function loading_effect_preview(bool){
     
    if (bool){
        $('.previewImage').addClass('loading-icon');
        $('#button-preview').prop( "disabled", true );
        $('.preview').css('display','none');
        $('.loading').fadeIn( "fast" );
       
    }else{
        $('.previewImage').removeClass('loading-icon');
        $('#button-preview').prop( "disabled", false );
        $('.loading').css('display','none');
        $('.preview').fadeIn( "fast" );        
    }
}
var imagePreviewSource;
$(document).ready(function() {
    imagePreviewSource = $('.previewImageSrc').attr('src');
});
function update_preview_image(){
    var imageSource = imagePreviewSource + '?' +  new Date().getTime();
    $(".previewImageSrc").attr("src", imageSource);
}
function showCapture(){    
    var absoluteFilePath = $("#filePath").val();
    var res = absoluteFilePath.split("webapp");
    var filePath = ("/rastrosoft"+res[1]);
    var imageSource = filePath + '.jpg';
//    if (( ( $(".previewImageSrc").attr("src") ) != (imageSource) )&(( $(".previewImageSrc").attr("src") ) != ("/rastrosoft/resources/images/loading.gif"))){
//        $(".previewImageSrc").attr("src", "");
//    }
    $.ajax({
        url:imageSource,
        type:'HEAD',
        error: function()
        {
            if ( ( $(".previewImageSrc").attr("src") ) != ("/rastrosoft/resources/images/loading.gif") ){
                $(".previewImageSrc").attr("src", "/rastrosoft/resources/images/loading.gif");
            }
                
        },
        success: function()
        {            
            $(".previewImageSrc").attr("src", imageSource);
        }
    });
}

function fade() {
     $( ".fadebox" ).toggle();
}

var executeExposureProgressBar = true;
$(document).ready(function() {
    $( "input" ).focusin(function() {
        $( this ).next( ".help-label" ).show();
    });
    $( "input" ).focusout(function() {
        $( this ).next( ".help-label" ).hide();
    });
    $('#setRa').mask('00:00:00');
    
    $("#exposureTimeHidden").change(function(){
        if (($("#exposureTimeHidden").val() > 0)&(executeExposureProgressBar)){
            executeExposureProgressBar = false;
            resetExposureProgressBar();
        }            
    });    
});
$(document).ready(function() {    
    $("#park").click(function(){
        setPark(); 
        notify('Parking...', 'success');
    });
    $("#unpark").click(function(){
        setUnPark(); 
        notify('Unparking...', 'success');
    });
    $("#track").click(function(){
        setTrack(); 
        notify('Setting to Track successful! Now, please set the coordinates...', 'success');
    });
    $("#slew").click(function(){
        setSlew(); 
        notify('Setting to Slew successful! Now, please set the coordinates...', 'success');
    });
    $("#sync").click(function(){
        setSync(); 
        notify('Setting to Sync successful! Now, please set the coordinates...', 'success');
    });
    $("#setUploadDirectory").click(function(){
        setUploadDirectory();         
    });
    $("#setPrefix").click(function(){
        setPrefix();         
    });
    $("#setBinning").click(function(){
        setBinning();         
    });
    $("#frameType").change(function(){
        setFrameType();         
    });
    $("#setCcdTemperature").click(function(){
        setCcdTemperature();         
    });
    $("#setFrame").click(function(){
        setFrame();         
    });
    $("#setSize").click(function(){
        setSize();         
    });
    $("#setExposure").click(function(){
        $("#setExposure").prop("disabled", "disabled");
        setExposure();  
        if ($("#exposureTime").val()<"0.01"){
            notify('Exposure time must be greater than 0.01 seconds', 'danger');
        }
    });
    $("#setAbortExposure").click(function(){
        setAbortExposure();
    });
    $("#setFocusAbsolute").click(function(){
        setFocusAbsolute();
    });
    $("#focusIn").click(function(){
        focusIn();
    });
    $("#focusOut").click(function(){
        focusOut();
    });
    $("#abortMotion").click(function(){
        setAbortMotion();
    });
  
});
function resetExposureProgressBar() {
    loading_effect_preview(true);
    var max = $('#exposureTimeHidden').val();
    var min = 0;
    var refreshId = setInterval(function() {
        updateProgressExposure(min, max);
        var properID =  $('#exposureTimeHidden').val();
        if (properID == 0) {
          clearInterval(refreshId);
          //update_preview_image();
          showCapture();
          loading_effect_preview(false);
          //VER!!
          executeExposureProgressBar=true;
          $('#progressExposure').empty();
          $('#progressExposure').append('Done!').show('slow', function() {
                $('#progressExposure').empty();
                $('#progressExposure').css('width', '0%').attr('aria-valuenow', '0').attr('aria-valuemin', '0').attr('aria-valuemax', '0');  
          });
        }
    }, 500);
}

function decimalToDegrees(D){
    return [0|D, '\xB0 ', 0|(D<0?D=-D:D)%1*60, "' ", 0|(Math.round(((D<0?D=-D:D)*60%1*60)* 1 )/1 ), '" '].join('');
}
function decimalToHours(D){
    var n = new Date(0,0);
    n.setSeconds(Math.round( (+D * 60 * 60) * 1 )/1 );
    return(n.toTimeString().slice(0, 8));
}
function degreesToDecimal(d) {    

    var coord = d.split("\xB0");
    var degrees = parseFloat(coord[0]);
    var minutes = parseFloat(coord[1].split("'")[0]);
    var seconds = parseFloat(coord[1].split("'")[1].split('"')[0]);
    
    if (d.charAt(0)==='-'){
        degrees = (degrees *(-1));        
        return (((parseFloat(degrees) + (parseFloat(minutes)/60.0) + (parseFloat(seconds)/3600.0)))*(-1));
    }else{
        return ((parseFloat(degrees) + (parseFloat(minutes)/60.0) + (parseFloat(seconds)/3600.0)));
    }

}
function hoursToDecimal(H){
    var a = H.split(':'); 
    return ((parseFloat(a[0]) + (parseFloat(a[1])/60.0) + (parseFloat(a[2])/3600.0)));
}
function updateProgressExposure(min, max){
    var exposureValue, percent, progress;
    exposureValue = parseInt($('#exposureTimeHidden').val());    
    percent = exposureValue * 100 / parseInt(max);
    progress = Math.floor(100 - percent);
    $('#progressExposure').empty();
    $('#progressExposure').append(progress+'% - '+exposureValue+' sec');
    $('#progressExposure').css('width', progress+'%').attr('aria-valuenow', progress).attr('aria-valuemin', min).attr('aria-valuemax', max);  
}

function imgError(image) {
    image.onerror = "";
    image.src = "/rastrosoft/resources/images/loading.gif";
    return true;
}