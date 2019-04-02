/*
Pulisce la schermata
*/
function clearCard() {
  var cardList =$(".card");
  cardList.remove();
}

/*
Carica le card e il loro contenuto
*/
function loadCard() {

  clearCard();

  $.ajax({

    url:"http://157.230.17.132:3023/todos/",
    method:"GET",
    data:{},
    success:function (inData) {
      var container = $(".cardContainer");

      var template = $("#template").html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < inData.length; i++) {
        var cardData = inData[i];
        var text = cardData.text;
        var id = cardData.id;

        var tempData={
          cardId : id,
          cardText: text,
        };
        var card = compiled(tempData);
        container.append(card);

      }
    },
    error:function(){}
  });

}

function deleteCard() {

  var me = $(this);
  var cardId = me.siblings(".cardId");

  var id = cardId.text();

  $.ajax({

    url:"http://157.230.17.132:3023/todos/"+id,
    method:"DELETE",
    data:{},
    success:function (inData){
      console.log(inData);
      loadCard();
      console.log("CANCELLATO ELEMENTO "+id);
    },
    error:function(){}
  });

}

function addCard() {
  var input = $("#gen-text");
  var textIn = input.val();
  console.log(textIn);

  var myData={
    text: textIn
  }
  if(textIn!= ""){

    $.ajax({

      url:"http://157.230.17.132:3023/todos/",
      method:"POST",
      data:myData,
      success:function (inData){

        loadCard();


      },
      error:function(){}
    });
    input.val("");
  }
}

function addCardByEnter(e){
  if(e.keyCode!=13){
    return
  }

  addCard();

}
function init() {

  var input = $("#gen-text");
  input.on("keyup", addCardByEnter);

  $(document).on("click",".cardDel",deleteCard);
  var btn = $("#gen-btn");

  btn.click(addCard);
  loadCard();
}


$(document).ready(init);
