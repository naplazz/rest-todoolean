$(document).ready(function() {

  var url_base = 'http://157.230.17.132:3016/todos/';
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
            id: data[i].id

          };
          var html = template(context);
          $('.body').append(html)
          $('#newTodo').val('')
        }//chiusura ciclo for
        $('.delete').click(function() {


          var item_to_delete = $(this).attr('data-id');
          $.ajax({
            url: url_base + item_to_delete,
            type: 'DELETE',
            success: function() {
              $('.body').html('');
              display_list();
            },
            error:function(){
              alert('errore chiamata api')
            }
          }) //chiusura ajax
        }); //chiusura delete
        $('.edit').click(function() {


          var item_to_edit = $(this).attr('data-id');
          var new_edit = prompt("modifica campo");
          $.ajax({
            url: url_base + item_to_edit,
            type: 'PUT',
            data: {
              text: new_edit
            },
            success: function() {
              $('.body').html('');
              display_list();
            },
            error:function(){
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
}); // fine document ready
