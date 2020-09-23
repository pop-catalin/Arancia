$(function() {


//POST
$(document).ready(function(){
    $("form#addTask").on('submit', function(e){
        e.preventDefault();
        //var data = $('input[name=taskName]').val();
        var createInput = $('#taskName');

        console.log(createInput.val());
        $.ajax({
            url: '/addTask',
            method: 'POST',
            //data: JSON.stringify(data), 
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(data) {
                console.log('asdfsda');
                console.log(data);
                console.log('the task was');
                console.log(data._id);
                $('#taskList').append("<li style=\"margin-right: 0.5em\" id="+ data.name +">" + data.name + "</li>");
                $('#' + data.name).after("<form action=\"/deleteTask\" method=\"POST\"> <input type=\"hidden\" name=\"itemId\" value=" + data._id + "> <button type=\"submit\"><i class=\"fa fa-times\" style=\"font-size: 1.25em; \"></i> </button> </form>")
                createInput.val('');
            },
            error: function(e) {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        });
    });

});