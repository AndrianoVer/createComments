let comments = [];
loadComments();

document.getElementById('comment-create').onclick = function () {
	event.preventDefault();
	let commentName = document.getElementById('comment-name');
	let commentBody = document.getElementById('comment-body');

	let comment = {
		name: commentName.value,
		body: commentBody.value,
		time: Math.floor(Date.now()/1000)
	}
	
	commentName.value = commentBody.value = '';

	comments.push(comment);

	saveComments();
	showComments();
}

function saveComments(){
	localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
	if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
	showComments();
}

let counter = 0;
function likeIncrease(){
	counter++;
	let myClick = document.getElementById('clickup');
	myClick.innerText = counter;	
}
function degrease() {
	counter++;
	let myClickDown = document.getElementById('clickdown');
	myClickDown.innerText = counter;
}

function showComments(){
	let commentField = document.getElementById('comment-field');
	let out = '';
	comments.forEach(function(item){
		out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
		out += `<p class="alert alert-success">${item.name}</p>`;
		out += `<p class="alert alert-warning text-truncate">${item.body}</p>`;
		out += `<i id="clickup" class="far fa-thumbs-up" onclick="likeIncrease()"></i>`;
		out += `<i id="clickdown" class="far fa-thumbs-down ml-3" onclick="degrease()"></i>`;
	})
	commentField.innerHTML = out;
};

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
	let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
	let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}