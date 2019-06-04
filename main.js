$(document).ready(function() {
  /// creo la variabile mostra url e mostra lista
  var url_base = 'http://157.230.17.132:3016/todos/';
  display_list()
  //  fine creo la variabile mostra url e mostra lista

  /// al click
  $('#todoBtn').click(function() {
    var input_val = $('#newTodo').val();
    var input_time = $('.time').val();
    if (!input_val) {
      alert('Inserisci qualcosa')
    } else {



    $.ajax({
      url: url_base,
      type: 'POST',
      data: {
        text: input_val,
        time: input_time
      },
      success: function() {

        $('.body').find("tr:gt(0)").remove();
        display_list();


      },
      error: function() {
        alert('errore chiamata api')
      }
    }) //chiusura ajax
      }
  }); //onclick add item closing

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
            id: data[i].id,
            time: data[i].time

          };
          var html = template(context);
          $('.body').append(html)
          $('#newTodo').val('')
        } //chiusura ciclo for
        $('.delete').click(function() {


          var item_to_delete = $(this).attr('data-id');
          $.ajax({
            url: url_base + item_to_delete,
            type: 'DELETE',
            success: function() {
              $('.body').find("tr:gt(0)").remove();
              display_list();
            },
            error: function() {
              alert('errore chiamata api')
            }
          }) //chiusura ajax
        }); //chiusura delete
        $('.edit').click(function() {


          var item_to_edit = $(this).attr('data-id');
          var new_edit = prompt("modifica campo");
          var new_time = prompt("modifica Orario");
          $.ajax({
            url: url_base + item_to_edit,
            type: 'PUT',
            data: {
              text: new_edit,
              time: new_time

            },
            success: function() {
              $('.body').find("tr:gt(0)").remove();
              display_list();
            },
            error: function() {
              alert('errore chiamata api')
            }
          }) //chiusura ajax
        });
      },
      error: function() {
        alert('errore chiamata api')
      }

    }) //chiusura ajax

  } // chiusura funzione display_list


  for (var t = 0; t < 24; t++) {
    $('.time').append('<option value="' + [t] + ':00">alle ore: ' + [t] + ':00</option>')
  }
}); // fine document ready
