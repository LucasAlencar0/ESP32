
$(document).ready(function(){
    var database = firebase.database();
    var Led1Status;
   
    // Referência à variável "Corrente" no Firebase
    var correnteRef = database.ref("Maquinas/EC:62:60:9D:12:18/CorrenteAtual");


    correnteRef.on("value", function(snapshot) {
        var corrente = snapshot.val();
        console.log(corrente);
        // Atualize o valor da div com o ID "gauge" com o valor da corrente
        document.getElementById("gauge").textContent = "Corrente: " + corrente + " A";
    });


    // Referência à variável "Led1Status" dentro do caminho "Maquinas > EC:62:60:9D:12:18"
    var maquinasRef = database.ref("Maquinas/EC:62:60:9D:12:18/Status");


    maquinasRef.on("value", function(snapshot) {
        Led1Status = snapshot.val();
        // Verificar o status do Led1 no Firebase
        if (Led1Status == "1") {
            document.getElementById("unact").style.display = "none";
            document.getElementById("act").style.display = "block";
        } else {
            document.getElementById("unact").style.display = "block";
            document.getElementById("act").style.display = "none";
        }
    });


    $(".toggle-btn").click(function() {
        var firebaseRef = firebase.database().ref().child("Maquinas/EC:62:60:9D:12:18/Status");


        // Postar para o Firebase
        if (Led1Status == "1") {
            firebaseRef.set("0");
            Led1Status = "0";
        } else {
            firebaseRef.set("1");
            Led1Status = "1";
        }
    });
});
