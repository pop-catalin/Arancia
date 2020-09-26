$(function() {

    //POST
    $("#addTask").on('submit', function(event){
        event.preventDefault();
        var createInput = $('#taskName');

        $.ajax({
            url: '/addTask',
            method: 'POST',
            //data: JSON.stringify(data), 
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(data) {
                addTaskVisualChanges(data);
                createInput.val('');
            },
            error: function(e) {
                //throw new Error('errorzzz');
                //alert(e);
                alert(e.responseText);
                //console.log("ERROR: ", e);
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
                //console.log(data);
                deleteTaskVisualChanges(data, form);
            }
        })
    })

});

function deleteTaskVisualChanges(data, form) {
    //console.log(data.length);
    if(data.length > 6) {
        const divHeight = parseInt($('.taskContainer').css("height").slice(0, -2)) - 35;
        $('.taskContainer').css("height", divHeight + "px");
    }
    $('#' + data.id).remove();
    $(form).remove();
}

function addTaskVisualChanges(data) {
    console.log();
    if(data.length > 7) {
        const divHeight = parseInt($('.taskContainer').css("height").slice(0, -2)) + 35;
        $('.taskContainer').css("height", divHeight + "px");
    }
    $('#taskList').append("<li style=\"margin-right: 0.58em\" id="+ data.task._id +">" + data.task.name + "</li>");
    $('#' + data.task._id).after("<form class=\"deleteForm\"> <input type=\"hidden\" name=\"itemId\" value=" + data.task._id + "> <button class=\"deleteButton\"><i class=\"fa fa-times\" style=\"font-size: 1.25em; \"></i> </button> </form>");                
}