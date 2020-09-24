$(function() {

    //POST
    $("form#addTask").on('submit', function(event){
        event.preventDefault();
        var createInput = $('#taskName');

        $.ajax({
            url: '/addTask',
            method: 'POST',
            //data: JSON.stringify(data), 
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(data) {
                // console.log('asdfsda');
                // console.log(data);
                // console.log('the task was');
                // console.log(data._id);
                $('#taskList').append("<li style=\"margin-right: 0.58em\" id="+ data._id +">" + data.name + "</li>");
                $('#' + data._id).after("<form class=\"deleteForm\"> <input type=\"hidden\" name=\"itemId\" value=" + data._id + "> <button class=\"deleteButton\"><i class=\"fa fa-times\" style=\"font-size: 1.25em; \"></i> </button> </form>")
                createInput.val('');
            },
            error: function(e) {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        });

    //DELETE
    $('ul').on('click', '.deleteButton', function(event) {
        event.preventDefault();
        var form = $(this).closest('form');
        var taskId = form.find("[name=itemId]").val();

        // var form = this;
        // console.log(this);

        $.ajax({
            url: '/deleteTask/' + taskId,
            method: 'POST',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $('#' + data).remove();
                $(form).remove();
                //$('#get-button').click();
            }
        })
    })

});