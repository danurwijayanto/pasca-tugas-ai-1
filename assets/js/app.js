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
        removeStatusCahaya();
        appendStatusLampu("Hidup", "Gelap", "../assets/img/lampuon.png", "../assets/img/dark.jpeg", 1);
        $("#aksi-cahaya-hilang ").show();
    }
});

$( "#aksi-cahaya-hilang" ).click(function() {
    appendStatusLampu("Mati", "Terang", "../assets/img/lampuoff.png", "../assets/img/bright.jpg", 0);
    $("#aksi-cahaya-muncul ").show();
    $("#aksi-cahaya-hilang ").hide();
   
});

$( "#aksi-cahaya-muncul" ).click(function() {
    appendStatusLampu("Hidup", "Gelap", "../assets/img/lampuon.png", "../assets/img/dark.jpeg", 0);
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
}

function removeStatusCahaya(){
    $("#status-cahaya-info-child ").remove();
}

function appendStatusLampu(statusLampu, statusCahaya, warnaStatusLampu, warnaStatusCahaya, inisialisasi){

    if (inisialisasi == 1){
        $("#colum-status-lampu img").remove()
        $("#colum-status-cahaya img").remove()
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        $("#colum-status-lampu ").append("<img src="+warnaStatusLampu+" alt='Lampu Hidup'>");
    }

    // Ganti Status Cahaya
    $("#status-cahaya-info-child ").remove();
    $("#colum-status-cahaya img").remove()
    $("#status-cahaya-info ").append("<span id='status-cahaya-info-child' data-statuscahaya="+statusCahaya+"> ( "+statusCahaya+" )</span>");
    $("#colum-status-cahaya ").append("<img src="+warnaStatusCahaya+" alt='Lampu Hidup'>");
    // End ganti status cahaya

    agenDenganState(inisialisasi, statusLampu, warnaStatusLampu);
}

function agenDenganState(inisialisasi, statusLampu, warnaStatusLampu){
    if (inisialisasi != 1){
        if (!interval){
            interval = setInterval(function() {
                stateData--;
                console.log("Waktu = "+stateData)
                if (stateData == 0){
                    if (bypass == false){
                        var perceptCahaya = $( "#status-cahaya-info-child" ).data( "statuscahaya" );
                        gantiStatusLampu(statusLampu, warnaStatusLampu, inisialisasi, perceptCahaya);
                    }else{
                        gantiStatusLampu(Cookies.get('statusLampu'), Cookies.get('warnaStatusLampu'), inisialisasi, Cookies.get('perceptCahaya'));
                    }
                    clearInterval(interval); 
                    interval = null;
                    stateData = backupStateData;
                }
            }, 1000);
        }else{
            setCookies(statusLampu, warnaStatusLampu);
            bypass = true;
        }
    }
}

// Fungsi Agent dengan State
function gantiStatusLampu(statusLampu, warnaStatusLampu, inisialisasi, perceptCahaya){
    // Ganti Status Lampu
    $("#colum-status-lampu img").remove()
    $("#status-lampu-info-child").remove()
    if (perceptCahaya == "Terang"){
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        // $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
        $("#colum-status-lampu ").append("<img src="+warnaStatusLampu+" alt='Lampu Mati'>");
    }else if(perceptCahaya == "Gelap" && inisialisasi != 1){
        $("#status-lampu-info ").append("<span id='status-lampu-info-child' data-statuslampu="+statusLampu+">( "+statusLampu+" )</span>");
        // $("#colum-status-lampu ").attr("bgcolor", warnaStatusLampu);
        $("#colum-status-lampu ").append("<img src="+warnaStatusLampu+" alt='Lampu Hidup'>");

    }
    // End Ganti Status Lampu
    
    
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

