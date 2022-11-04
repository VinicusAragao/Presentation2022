let x
let y
let animName
let animDuration
let eraseble
let setTimeoutsId = []

const body = document.getElementsByTagName('body')[0]
const links = document.getElementsByClassName('links')
const circles = document.getElementsByClassName('circles')
const logo = document.getElementById('logoLink')
const parts = document.getElementsByClassName('particles')
const input = document.getElementsByTagName('input')

const rules = document.styleSheets[1].cssRules

function changeAnimation(itself,name,duration,erase){
	deleteAll()
	state = itself.dataset.state
	window.removeEventListener('pointerdown', pressedDown)
	window.removeEventListener('pointerdown', move)
	window.removeEventListener('pointerup', pressedUp)
	window.removeEventListener('pointermove', move)
	for(let i = 0; i < setTimeoutsId.length; i++){
		clearTimeout(setTimeoutsId[i])
	}

	if(state === 'inactive'){
		if(name === 'laser'){
			window.addEventListener('pointerdown', move)
			window.addEventListener('pointerdown', pressedDown)
			window.addEventListener('pointerup', pressedUp)
		}
		else{
			window.addEventListener('pointermove', move)
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
	x = e.clientX
	y = e.pageY
	createPart()
}
function pressedDown(){
	body.classList.add('noSelect')
	window.addEventListener('pointermove', move)
}
function pressedUp(){
	body.classList.remove('noSelect')
	window.removeEventListener('pointermove', move)
}
function createPart(){
	let el = document.createElement('div')
	el.setAttribute('class', `${animName} particles`)
	el.style.marginLeft = (x - 3) + 'px'
	el.style.marginTop = y +'px'
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
function changeLaserProperties(type,input){
	newValue = input.value

	if(type === 'width'){
		newValue += 'px'
	}

	for(let i = 0; i < rules.length; i++) {
  		if(rules[i].selectorText === '.laser') {
    		laserRules = rules[i];
  		}
	}
	laserRules.style.setProperty(type, newValue)
	console.log(laserRules)
}
window.addEventListener('load', () => {
	changeLaserProperties('width', input[0])
	changeLaserProperties('background-color', input[1])
})