let x
let y
let animName
let animDuration
let eraseble
let setTimeoutsId = []

let laserWidth
let laserColor
let laserBlocked = false

const body = document.getElementsByTagName('body')[0]
const links = document.getElementsByClassName('links')
const circles = document.getElementsByClassName('circles')
const logo = document.getElementById('logoLink')
const parts = document.getElementsByClassName('particles')
const input = document.getElementsByTagName('input')

function changeAnimation(itself,name,duration,erase){
	deleteAll()
	state = itself.dataset.state

	window.removeEventListener('pointerdown', pressedDown)
	window.removeEventListener('pointerdown', move)
	window.removeEventListener('pointerup', pressedUp)
	window.removeEventListener('pointermove', move)
	window.removeEventListener('pointermove', moveAim)

	for(let i = 0; i < setTimeoutsId.length; i++){
		clearTimeout(setTimeoutsId[i])
	}

	if(state === 'inactive'){
		if(name === 'laser'){
			window.addEventListener('pointermove', moveAim)
			window.addEventListener('pointerdown', move)
			window.addEventListener('pointerdown', pressedDown)
			window.addEventListener('pointerup', pressedUp)
		}
		else{

		}
		animName = name
		animDuration = duration
		eraseble = erase

		for(item of circles){
			item.dataset.state = 'inactive'
		}
		itself.dataset.state = 'active'
	}
	else if(state === 'active'){
		itself.dataset.state = 'inactive'
	}
}

function move(e){
	if(!laserBlocked){
		x = e.clientX
		y = e.pageY
		createPart()
	}
}
function pressedDown(){
	if(!laserBlocked){
		body.classList.add('noSelect')
		window.addEventListener('pointermove', move)
	}
}
function pressedUp(){
	body.classList.remove('noSelect')
	window.removeEventListener('pointermove', move)
}
function createPart(){
	let el = document.createElement('div')
	el.setAttribute('class', `${animName} particles`)

	if(animName === 'laser'){
		el.style.backgroundColor = laserColor
		el.style.width = laserWidth + 'px'
		el.style.marginLeft = (x - (laserWidth/2)) + 'px'
		el.style.marginTop = (y - (laserWidth/2)) +'px'
	}
	else{
		el.style.marginLeft = (x - 3) + 'px'
		el.style.marginTop = y +'px'
	}

	body.appendChild(el)
	if(eraseble){
		setTimeoutsId.push(setTimeout(deletePart, animDuration))
	}
}
function deletePart(){
	if(parts.length > 0){
		parts[0].remove()
	}
}
function deleteAll(){
	for(let i = 0; i < parts.length;){
		parts[0].remove()
	}
}
function createAim(){
	let aim = document.createElement('div')
	aim.setAttribute('class', `laserAim particles`)
	aim.style.width = laserWidth + 'px'
	aim.style.backgroundColor = laserColor
	aim.style.marginLeft = (x - (laserWidth/2)) + 'px'
	aim.style.marginTop = (y - (laserWidth/2)) +'px'
	body.appendChild(aim)
	console.log(body)
}
function moveAim(){
	let aim = document.getElementsByClassName("laserAim")[0]
	console.log(aim)
	aim.style.marginLeft = (x - (laserWidth/2)) + 'px'
	aim.style.marginTop = (y - (laserWidth/2)) +'px'
}

//On Load 

window.addEventListener('load', () => {
	blockLaser(circles)
	blockLaser(links)
	blockLaser(logo)
	blockLaser(input)

	changeLaserProperties('width', input[0])
	changeLaserProperties('background-color', input[1])
})

function blockLaser(elements){
	for(let i = 0; i < elements.length; i++){
		elements[i].addEventListener('pointerover', dontShowAnimation)
		elements[i].addEventListener('pointerleave', nowShowAnimation)
	}
}
function dontShowAnimation(){
	laserBlocked = true
}
function nowShowAnimation(){
	laserBlocked = false
}

function changeLaserProperties(type,input){
	newValue = input.value

	if(type === 'width'){
		laserWidth = newValue
	}
	else if(type === 'background-color'){
		laserColor = newValue
	}
}
