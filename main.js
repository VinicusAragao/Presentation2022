window.addEventListener('pointermove', move)
let x
let y

function move(e){
	x = e.clientX
	y = e.pageY
	createPart()
}
function createPart(){
	const body = document.getElementsByTagName('body')[0]
	let el = document.createElement('div')
	el.setAttribute('class', 'particle')
	el.style.marginLeft = x + 'px'
	el.style.marginTop = y + 'px'
	body.appendChild(el)
	setTimeout(deletePart, 300)
}
function deletePart(){
	parts = document.getElementsByClassName('particle')
	if(parts.length > 0){
		parts[0].remove()
	}
}
