var interval;
var ganti = false;
var stateData;
var backupStateData;
var bypass = false;


$( document ).ready(function() {
    $("#aksi-cahaya-muncul ").hide();
    $("#aksi-cahaya-hilang ").hide();
});

$( "#start-button" ).click(function() {
    // Ketika klick tombol start lampu akan menyala dan cahaya gelap
    var stateData = $("#state-data").val();
    if (stateData == ""){
        alert("Harap isi form state !!");
        $("#state-data").focus();
    }else{
        appendHiddenStateData(stateData);
        removeStatusLampu();
        appendStatusLampu("Hidup", "Gelap", "#e9ed00", "#000000", 1);
        $("#aksi-cahaya-hilang ").show();
    }
});

$( "#aksi-cahaya-hilang" ).click(function() {
    removeStatusLampu();
    appendStatusLampu("Mati", "Terang", "#ffffff", "#f4e9be", 0);
    $("#aksi-cahaya-muncul ").show();
    $("#aksi-cahaya-hilang ").hide();
   
});

$( "#aksi-cahaya-muncul" ).click(function() {
    removeStatusLampu();
    appendStatusLampu("Hidup", "Gelap", "#e9ed00", "#000000", 0);
    $("#aksi-cahaya-hilang ").show();
    $("#aksi-cahaya-muncul ").hide();
});

function setCookies(statusLampu, warnaStatusLampu){
    Cookies.set('statusLampu', statusLampu);
    Cookies.set('warnaStatusLampu', warnaStatusLampu);
    Cookies.set('perceptCahaya', $( "#status-cahaya-info-child" ).data( "statuscahaya" ));
}

function appendHiddenStateData(data){
    $("#hiddenStateData ").remove();
    $("#state ").append("<input id='hiddenStateData' type='hidden' value="+data+">");
    stateData = data;
    backupStateData = data;

}

function removeStatusLampu(){
    $("#status-lampu-info-child ").remove();
    $("#status-cahaya-info-child ").remove();
}

function appendStatusLampu(statusLampu, statusCahaya, warnaStatusLampu, warnaStatusCahaya, inisialisasi){
    
    if (inisialisasi == 1){
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
    }
    $("#status-cahaya-info ").append("<span id='status-cahaya-info-child' data-statuscahaya="+statusCahaya+"> ( "+statusCahaya+" )</span>");
    $("#colum-status-cahaya ").attr("bgcolor", warnaStatusCahaya);

    if (inisialisasi != 1){
        if (!interval){
            interval = setInterval(function() {
                stateData--;
                console.log("Waktu = "+stateData)
                if (stateData == 0){
                    if (bypass == false){
                        var perceptCahaya = $( "#status-cahaya-info-child" ).data( "statuscahaya" );
                        agentDenganState(statusLampu, warnaStatusLampu, inisialisasi, perceptCahaya);
                    }else{
                        agentDenganState(Cookies.get('statusLampu'), Cookies.get('warnaStatusLampu'), inisialisasi, Cookies.get('perceptCahaya'));
                    }
                    clearInterval(interval); 
                    interval = null;
                    stateData = backupStateData;
                }
            }, 1000);
        }else{
            setCookies(statusLampu, warnaStatusLampu);
            console.log(backupStateData);

            bypass = true;
        }
    }
}
// Fungsi Agent dengan State
function agentDenganState(statusLampu, warnaStatusLampu, inisialisasi, perceptCahaya){

    if (perceptCahaya == "Terang"){
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
    }else if(perceptCahaya == "Gelap" && inisialisasi != 1){
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);

    }
    
    
    // if (perceptCahaya == "Terang"){
    //     console.log(timer);
    //     if (timer>=3){
    //         $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
    //         $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
    //     }
    // }else if(perceptCahaya == "Gelap" && inisialisasi != 1){
    //     if (timer>=3){
    //         if (timer>=3){
    //             $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
    //             $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
    //         }
    //     }
    // }
    // if (!timer){
    //     timer = setInterval(function () {
    //         stateData--;
    //         console.log("Waktu = "+stateData)
    //         if (stateData == 0) {
    //             $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
    //             $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
    //             clearInterval(timer);
    //             timer = null;
    //         }
    //     }, 1000);
    // }
    //     (defun make-reflex-vacuum-agent-with-state-program ()
    // (let ((last-A infinity) (last-B infinity))
    // #’(lambda (percept)
    // (let ((location (first percept)) (status (second percept)))
    // (incf last-A) (incf last-B)
    // (cond
    // ((eq status ’dirty)
    // (if (eq location ’A) (setq last-A 0) (setq last-B 0))
    // ’Suck)
    // ((eq location ’A) (if (> last-B 3) ’Right ’NoOp))
    // ((eq location ’B) (if (> last-A 3) ’Left ’NoOp)))))))
}

