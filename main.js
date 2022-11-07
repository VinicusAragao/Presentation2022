let x
let y
let animName
let animDuration
let eraseble
let setTimeoutsId = []

let laserWidth
let laserColor
let laserBlocked = false
let laserPressed = false
let aimOn = false

const body = document.getElementsByTagName('body')[0]
const links = document.getElementsByClassName('links')
const circles = document.getElementsByClassName('circles')
const logo = document.getElementById('logoLink')
const parts = document.getElementsByClassName('particles')
const input = document.getElementsByTagName('input')
let aim

function changeAnimation(itself,name,duration,erase){
	deleteAll()
	state = itself.dataset.state

	window.removeEventListener('pointerdown', pressedDown)
	window.removeEventListener('pointerdown', getPosition)
	window.removeEventListener('pointerup', pressedUp)
	window.removeEventListener('pointermove', getPosition)
	window.removeEventListener('pointermove', moveAim)
	laserPressed = false
	aimOn = false
	aim?.remove()

	for(let i = 0; i < setTimeoutsId.length; i++){
		clearTimeout(setTimeoutsId[i])
	}
	if(state === 'inactive'){
		if(name === 'laser'){
			window.addEventListener('pointerdown', pressedDown)
			window.addEventListener('pointerdown', getPosition)
			window.addEventListener('pointerup', pressedUp)
		}
		window.addEventListener('pointermove', getPosition)
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

function getPosition(e){
	x = e.clientX
	y = e.pageY
	if(animName === 'laser'){
		if(!aimOn){createAim()}
		else{moveAim()}

		if(laserPressed){
			createPart()
		}	
	}
	else if(!laserBlocked){
		createPart()
	}
}

function pressedDown(){
	if(!laserBlocked){
		laserPressed = true
		body.classList.add('noSelect')
	}
}
function pressedUp(){
	laserPressed = false
	body.classList.remove('noSelect')
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
	const el = document.createElement('div')
	el.setAttribute('class', `laserAim`)
	el.style.width = laserWidth + 'px'
	el.style.backgroundColor = laserColor
	el.style.marginLeft = (x - (laserWidth/2)) + 'px'
	el.style.marginTop = (y - (laserWidth/2)) +'px'
	body.appendChild(el)

	aimOn = true
	aim = document.getElementsByClassName("laserAim")[0]
	window.addEventListener('pointermove', moveAim)
}
function moveAim(){
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
	if(aimOn){
		aim.remove()
		createAim()
	}
}
