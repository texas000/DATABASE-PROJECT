numberOfitems = 0;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

      var ref = firebase.database().ref();
      ref.once('value')
        .then(function(snapshot) {
          var a = snapshot.numChildren(); // 1 ("name")
          numberOfitems=a;
      });

      for (i=0; i<21; i++) {
        const dbRefObject=firebase.database().ref().child(i);
        dbRefObject.on('value', snap=> {
        var pname=snap.child("Product_name").val();
        var price=snap.child("Final Cost").val();
        var stock=snap.child("Stock").val();

        const nameCapitalized = pname.charAt(0).toUpperCase() + pname.slice(1);
        var pure_price = price.slice(0,0)+price.slice(1);

        var board = document.createElement('tr');
        //board.className='card col-sm-4';
        board.innerHTML='<td class="mdl-data-table__cell--non-numeric">'+nameCapitalized+'</td><td>'+stock+'</td><td>'+price+'</td></tr><td><a href="javascript:void(0);" onclick="return shopping();"><i class="material-icons">add_circle</i></a></td>';
        //board.innerHTML='<div class="card-body"><h5 class="card-title">'+pname+'</h5><p class="card-text">'+price+'</p><a href="#" class="btn btn-primary">BUY</a></div>';
        //var node = document.createTextNode(pname);
        //board.appendChild(node);
        document.getElementById('board').appendChild(board);
        });
      }

        var cart=document.createElement('tr');
        cart.innerHTML='<td class="mdl-data-table__cell--non-numeric">'+pname+'</td><td>'+stock+'</td><td>'+price+'</td></tr>';
        document.getElementById('sitem').appendChild(cart);
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

$(document).ready(function(){
  $(".modal-body button").click(function(){
    $("tbody").removeClass("sitem");
  });
});


function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}

var items = 0;
function shopping(){
  items++;
  document.getElementById('inc').setAttribute("data-badge", items);
}

var startF=21;
$(window).scroll(function() {
          if($(window).scrollTop() + $(window).height() >= $(document).height()){
            while(startF<100) {
            const dbRefObject=firebase.database().ref().child(startF);
            dbRefObject.on('value', snap=> {
            var pname=snap.child("Product_name").val();
            var price=snap.child("Final Cost").val();
            var stock=snap.child("Stock").val();

            const nameCapitalized = pname.charAt(0).toUpperCase() + pname.slice(1)

            var board = document.createElement('tr');
            //board.className='card col-sm-4';
            board.innerHTML='<td class="mdl-data-table__cell--non-numeric">'+nameCapitalized+'</td><td>'+stock+'</td><td>'+price+'</td></tr><td><a href="javascript:void(0);" onclick="return shopping();"><i class="material-icons">add_circle</i></a></td>';
            //board.innerHTML='<div class="card-body"><h5 class="card-title">'+pname+'</h5><p class="card-text">'+price+'</p><a href="#" class="btn btn-primary">BUY</a></div>';
            //var node = document.createTextNode(pname);
            //board.appendChild(node);
            document.getElementById('board').appendChild(board);
            });
            startF++;
            }
          }
        });


