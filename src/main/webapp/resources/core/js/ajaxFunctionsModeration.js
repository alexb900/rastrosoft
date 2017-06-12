function successAjax(data, tipo) {
    switch(tipo) {
        case 'getUsername':
            $('#username').empty();            
            $.each(data, function(key, value) {
                $('#username').append(value[0]);                
            });
            break;
        case 'checkLive':
            var isOn = false;  
            var public = "0";
            $.each(data, function(key, value) {
                isOn    =   value[0];
                public  =   value[1];
            });
            if (isOn == "true"){
                liveOn(true, public);
            }else{
                liveOn(false, public);
            }
            break;    
        case 'getModerationShifts':
            $("#shifts tBody").empty();
            $.each(data, function(key, value) {
                $.each(value, function(key2, c) {
                    var state = c[7], pending="", accepted="", rejected="", actual_class="";
                    switch(state){
                        case "0":
                            rejected = "selected";
                            actual_class = "bg-danger-m";
                            break;
                        case "1":
                            accepted = "selected";
                            actual_class = "bg-success-m";
                            break;
                        case "2":
                            pending = "selected";
                            actual_class = "bg-warning-m";
                            break;
                        default:
                            break;
                    }
                    $("#shifts tBody").append('<tr><th scope="row">'+c[0]+'</th>'
                        +'<td>'+c[1]+'</td>'
                        +'<td>'+c[2]+'</td>'
                        +'<td>'+c[3]+'</td>'
                        +'<td>'+c[4]+'</td>'
                        +'<td>'+c[6].slice(0, 10)+'</td>'
                        +'<td>'+c[6].slice(10, 16)+'</td>'
                        +'<td><select id="operation-shift-'+c[0]+'" onchange="operationShift(\''+c[0]+'\');" class=" '+actual_class+' form-control input-sm"><option value="pending" '+pending+' class="bg-warning">Pending</option><option value="accepted" '+accepted+' class="bg-success">Accepted</option><option value="rejected" '+rejected+' class="bg-danger">Rejected</option></select></td>'
                        +'</tr>');
                });
            });            
            break;    
        case 'setToPendingShift':
            getPendingShifts();
            break;
        case 'acceptShift':
            getAcceptedShifts();
            break;
        case 'rejectShift':
            getRejectedShifts();
            break;
        default:
            break;
    }
}
function operationShift(id){
    var selectId = "operation-shift-"+id;
    var operation = $("#"+selectId).val();
    var search = {};
    search["value"] = id;
    switch (operation){
        case "pending":
            sendAjax(search,'setToPendingShift','setToPendingShift'); 
            break;
        case "accepted":
            sendAjax(search,'acceptShift','acceptShift'); 
            break;
        case "rejected":
            sendAjax(search,'rejectShift','rejectShift'); 
            break;
        default:
            break;
    }
}
function getUsername() {
    var search = {};
    sendAjax(search,'getUsername','getUsername');  
}

function getAllModerationShifts() {
    var search = {};
    sendAjax(search,'getAllModerationShifts','getModerationShifts');  
}
function getPendingShifts() {
    var search = {};
    sendAjax(search,'getPendingShifts','getModerationShifts');  
}
function getAcceptedShifts() {
    var search = {};
    sendAjax(search,'getAcceptedShifts','getModerationShifts');  
}
function getRejectedShifts() {
    var search = {};
    sendAjax(search,'getRejectedShifts','getModerationShifts');  
}

function showShifts(){
    $("#shifts-menu").addClass("active");        
    $('.table-shifts').show();
    $('.intro').hide();
}
function showAllModerationShifts(){
    showShifts();
    getAllModerationShifts();
    updateTableShifts();
}
function showPendingShifts(){
    showShifts();
    getPendingShifts();
    updateTableShifts();
}
function showAcceptedShifts(){
    showShifts();
    getAcceptedShifts();
    updateTableShifts();
}
function showRejectedShifts(){
    showShifts();
    getRejectedShifts();
    updateTableShifts();
}