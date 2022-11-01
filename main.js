let x
let y
let onLinks = false
let animName
let animDuration

const body = document.getElementsByTagName('body')[0]
const links = document.getElementsByClassName('links')
const circles = document.getElementsByClassName('circles')

function changeAnimation(itself,name,duration){
	state = itself.dataset.state
	if(state === 'active'){
		window.removeEventListener('pointermove', move)
		itself.dataset.state = 'inactive'
	}
	else if(state === 'inactive'){
		window.addEventListener('pointermove', move)
		animName = name
		animDuration = duration
		for(item of circles){
			item.dataset.state = 'inactive'
		}
		itself.dataset.state = 'active'
	}
}

function move(e){
	if(!onLinks){
		x = e.clientX
		y = e.pageY
		createPart()
	}
}
function createPart(){
	let el = document.createElement('div')
	el.setAttribute('class', `${animName} particles`)
	el.style.marginLeft = (x - 3) + 'px'
	el.style.marginTop = y +'px'
	body.appendChild(el)
	setTimeout(deletePart, animDuration)
}
function deletePart(){
	parts = document.getElementsByClassName('particles')
	if(parts.length > 0){
		parts[0].remove()
	}
}

window.addEventListener('load', () => {
	blockAnimation(links)
	blockAnimation(circles)

	const selected = document.getElementsByClassName('selected')[0]
	selected.style.animation = 'none'
})

function blockAnimation(elements){
	for(element of elements){
		element.addEventListener('mouseover', linkIn =>{
			onLinks = true
		})
		element.addEventListener('mouseout', linkOut =>{
			onLinks = false
		})
	}
}