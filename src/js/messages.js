$(document).ready(() => {
	scrollDown();
})

$('#btnMsgSend').click(() => {
	newMessage();
});

$(window).on('keydown', (e) => {
	if (e.which == 13) {
		newMessage();
		return false;
	}
}).on('load', () => {
	
})

function scrollDown () {
	$('#messageChatList').animate({
		scrollTop: $('#messageChatList').prop('scrollHeight')
	}, 'fast');
}
function newMessage () {
	const message = $('#messagesField').val();
	if ($.trim(message) == '') {
		return false;
	}
	const elem = $('<li class="chat-item sent"><img src="http://placeimg.com/400/400/people" alt=" "><p>' + message + '</p></li>');
	elem.appendTo($('#messageChatList'));
	$('#messagesField').val(null);
	$('#dialogs .dialog-item.active .dialog-item-msg').html('<span>You: </span>' + message);
	scrollDown();
};
