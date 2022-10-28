window.addEventListener('pointermove', move)
let x
let y
let onLinks = false

function move(e){
	if(!onLinks){
		x = e.clientX
		y = e.pageY
		createPart()
	}
}
function createPart(){
	const body = document.getElementsByTagName('body')[0]
	let el = document.createElement('div')
	el.setAttribute('class', 'particle')
	el.style.marginLeft = (x - 3) + 'px'
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
window.addEventListener('load', () =>{
	const links = document.getElementsByClassName('links')
	for(let i = 0; i < links.length; i++){
		links[i].addEventListener('mouseover', linkIn =>{
			onLinks = true
		})
		links[i].addEventListener('mouseout', linkOut =>{
			onLinks = false
		})	
	}
})