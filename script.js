

$(document).ready(function(){
    var database = firebase.database();
    var Led1Status;
	 // Referência à variável "Corrente" no Firebase
	 var correnteRef = database.ref("Corrente");// Referência à corrente no Firebase

	 correnteRef.on("value", function(snapshot) {
        var corrente = snapshot.val();
		console.log(corrente);
        // Atualize o valor da div com o ID "gauge" com o valor da corrente
        document.getElementById("gauge").textContent = "Corrente: " + corrente + " A";
    });

    database.ref().on("value", function(snap){
        Led1Status = snap.val().Led1Status;
        if(Led1Status == "1"){    // Verificar do Firebase
            document.getElementById("unact").style.display = "none";
            document.getElementById("act").style.display = "block";
        } else {
            document.getElementById("unact").style.display = "block";
            document.getElementById("act").style.display = "none";
        }
    });

    $(".toggle-btn").click(function(){
        var firebaseRef = firebase.database().ref().child("Led1Status");

        if(Led1Status == "1"){    // Postar para o Firebase
            firebaseRef.set("0");
            Led1Status = "0";
        } else {
            firebaseRef.set("1");
            Led1Status = "1";
        }
    });
});


