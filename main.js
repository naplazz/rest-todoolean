$(document).ready(function() {

  var url_base = 'http://157.230.17.132:3016/todos';
  display_list()



  $('#todoBtn').click(function() {
    var input_val = $('#newTodo').val();
    $.ajax({
      url: url_base,
      type: 'POST',
      data: {
        text: input_val
      },
      success: function() {
        $('.body').html('');
        display_list();


      },
      error: function() {
        alert('errore chiamata api')
      }
    }) //chiusura ajax

  }); //onclick add item closing

  $('.delete').click(function() {

    console.log('cliccato');
    // var item_to_delete = $('span').attr('data-id')
    // console.log(item_to_delete)
    // $.ajax({
    //   url: url_base,
    //   type: 'DELETE',
    //   success: function() {
    //     display_list();
    //   },
    //   error:function(){
    //     alert('errore chiamata api')
    //   }
    // }) //chiusura ajax
  });




  function display_list() {

    $.ajax({
      url: url_base,
      type: 'GET',
      success: function(data) {
        for (var i = 0; i < data.length; i++) {
          var source = document.getElementById("entry-template").innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            item: data[i].text,
            id: [i]

          };
          var html = template(context);
          $('.body').append(html)

          $('#newTodo').val('')
        }
      },
      error: function() {
        alert('errore chiamata api')
      }
    }) //chiusura ajax
  } // chiusura funzione display_list
}); // fine document ready
