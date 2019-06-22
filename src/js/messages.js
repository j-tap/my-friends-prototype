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
	message = $('#messagesField').val();
	if ($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('#messagesField').val(null);
	$('#dialogs .dialog-item.active .dialog-item-msg').html('<span>You: </span>' + message);
	scrollDown();
};
