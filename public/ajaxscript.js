$(function () {
	//POST
	$('#addTask').on('submit', function (event) {
		event.preventDefault();
		var createInput = $('#taskName');

		$.ajax({
			url: '/addTask',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ name: createInput.val() }),
			success: function (data) {
				addTaskVisualChanges(data);
				createInput.val('');
			},
			error: function (e) {
				alert(e.responseText);
			},
		});
	});

	//DELETE
	$('ul').on('click', '.deleteButton', function (event) {
		event.preventDefault();
		var form = $(this).closest('form');
		var taskId = form.find('[name=itemId]').val();

		$.ajax({
			url: '/deleteTask/' + taskId,
			method: 'POST',
			contentType: 'application/json',
			success: function (data) {
				deleteTaskVisualChanges(data, form);
			},
		});
	});
});

//remove the deleted task without needing to refresh(only the visual components)
function deleteTaskVisualChanges(data, form) {
	if (data.length > 5) {
		const divHeight =
			parseInt($('.taskContainer').css('height').slice(0, -2)) - 40;
		$('.taskContainer').css('height', divHeight + 'px');
	}
	$('#' + data.id).remove();
	$(form).remove();
}

//show the added task without needing to refresh
function addTaskVisualChanges(data) {
	console.log();
	if (data.length > 6) {
		const divHeight =
			parseInt($('.taskContainer').css('height').slice(0, -2)) + 40;
		$('.taskContainer').css('height', divHeight + 'px');
	}
	$('#taskList').append(
		'<li style="margin-right: 0.58em" id=' +
			data.task._id +
			'>' +
			data.task.name +
			'</li>'
	);
	$('#' + data.task._id).after(
		'<form class="deleteForm"> <input type="hidden" name="itemId" value=' +
			data.task._id +
			'> <button class="deleteButton"><i class="fa fa-times" style="font-size: 1.25em; "></i> </button> </form>'
	);
}
