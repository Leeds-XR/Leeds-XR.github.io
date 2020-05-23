/*
boidsVR.js
Oliver Cass (c) 2020
All Rights Reserved
*/
var target = null;

var scene;

var params = {
	numBoids: 500,
	
	maxSpeed: 0.3,
	maxForce: 0.004,
	
	sepFac: 15,
	aliFac: 1.5,
	cohFac: 0.3,
	tarFac: 1.3,
	bouFac: 1,
	
	areaRad: 40,
	
	sepRad: 2.3,
	aliRad: 3.5,
	cohRad: 4.2
}

function calculate(){
	params.sepRadSq = params.sepRad * params.sepRad;
	params.aliRadSq = params.aliRad * params.aliRad;
	params.cohRadSq = params.cohRad * params.cohRad;
	
	params.searchRad = Math.max(params.sepRad, params.aliRad, params.cohRad);
	params.searchRadSq = params.searchRad * params.searchRad;
	
	params.areaRadSq = params.areaRad * params.areaRad;
}

var boids = [];

AFRAME.registerComponent('boid', {
	init: function() {		
		this.vel = new THREE.Vector3(Math.random()*params.maxSpeed*2 - params.maxSpeed, Math.random()*params.maxSpeed*2 - params.maxSpeed, Math.random()*params.maxSpeed*2 - params.maxSpeed);
		this.acc = new THREE.Vector3();
		
		boids.push(this);
	},
	
	tick: function(time, timeDelta){
		var localBoids = getLocalBoids(this);
		
		var rule1 = seperation(this, localBoids);
		var rule2 = alignment(this, localBoids);
		var rule3 = cohesion(this, localBoids);
		var rule4 = new THREE.Vector3();
		if(target) rule4 = seek(this, new THREE.Vector3());
		var rule5 = boundary(this, this.el.object3D.position);
		
		rule1.multiplyScalar(params.sepFac);
		rule2.multiplyScalar(params.aliFac);
		rule3.multiplyScalar(params.cohFac);
		rule4.multiplyScalar(params.tarFac);
		rule5.multiplyScalar(params.bouFac);
		
		this.acc.add(rule1);
		this.acc.add(rule2);
		this.acc.add(rule3);
		this.acc.add(rule4);
		this.acc.add(rule5);
		
		this.vel.add(this.acc);
		this.vel.clampScalar(-params.maxSpeed, params.maxSpeed);
		this.acc.multiplyScalar(0);
		
		this.el.object3D.lookAt(this.el.object3D.position.x + this.vel.x, this.el.object3D.position.y + this.vel.y, this.el.object3D.position.z + this.vel.z);
		this.el.object3D.rotateX(Math.PI / 2);
		
		this.el.setAttribute('position', {
			x: this.el.object3D.position.x + this.vel.x,
			y: this.el.object3D.position.y + this.vel.y,
			z: this.el.object3D.position.z + this.vel.z
		});
	}
});

window.onload = function(){
	scene = document.getElementById('scene');
	calculate();
	
	var up = new THREE.Vector3(1, 0, 0);

	for(var i = 0; i < params.numBoids; i++){
		var newBoid = document.createElement('a-cone');
		newBoid.setAttribute('radius-bottom', '0.4');
		newBoid.setAttribute('radius-top', '0');
		newBoid.setAttribute('height', '0.9');
		newBoid.setAttribute('color', randomColour());
		newBoid.setAttribute('boid', '');
		newBoid.object3D.position.set(Math.random()*params.areaRad*2 - params.areaRad, 2 + Math.random()*params.areaRad, Math.random()*params.areaRad*2 - params.areaRad);
		newBoid.object3D.up = up;
		scene.appendChild(newBoid);
	}
}

function getLocalBoids(boid){
	var localBoids = [];
	for(var b of boids){
		if(b == boid) continue;
		if(boid.el.object3D.position.distanceToSquared(b.el.object3D.position) < params.searchRadSq) localBoids.push(b);
	}
	return localBoids;
}

function seperation(boid, boids){
  var steer = new THREE.Vector3();
  var count = 0;
  for(var b of boids){
    var dist = boid.el.object3D.position.distanceToSquared(b.el.object3D.position);
    if(dist < params.sepRadSq){
      var diff = new THREE.Vector3().subVectors(boid.el.object3D.position, b.el.object3D.position);
      diff.normalize();
      diff.divideScalar(dist);
      steer.add(diff);
      count++;
    }
  }
  if(count > 0) steer.divide(count);
  if(steer.length() > 0){
    steer.normalize();
    steer.multiplyScalar(params.maxSpeed);
    steer.sub(boid.vel);
    steer.clampScalar(-params.maxForce, params.maxForce);
    return steer;
  }
  return new THREE.Vector3();
}

function alignment(boid, boids){
  var steer = new THREE.Vector3();
  
  var count = 0;
  for(var b of boids){
    var dist = boid.el.object3D.position.distanceToSquared(b.el.object3D.position);
    if(dist < params.aliRadSq){
      steer.add(b.vel);
      count++;
    }
  }
  
  if(count > 0){
    steer.divideScalar(count);
    steer.normalize();
    steer.multiplyScalar(params.maxSpeed);
    steer.sub(boid.vel);
    steer.clampScalar(-params.maxForce, params.maxForce);
  }
  
  return steer;
}
function cohesion(boid, boids){
  var target = new THREE.Vector3();
  
  var count = 0;
  for(var b of boids){
    var dist = boid.el.object3D.position.distanceToSquared(b.el.object3D.position);
    if(dist < params.cohRadSq && dist > 5){ //BAD
      target.add(b.el.object3D.position);
      count++;
    }
  }
  
  if(count > 0){
    target.divideScalar(count);
    return seek(boid, target);
  }
  return target;
}
function seek(boid, target){
  var steer = new THREE.Vector3().subVectors(target, boid.el.object3D.position);
  steer.normalize();
  steer.multiplyScalar(params.maxSpeed);
  steer.sub(boid.vel);
  steer.clampScalar(-params.maxForce, params.maxForce);
  return steer;
  
}
function boundary(boid, loc){
  var steer = new THREE.Vector3();
  if(loc.y < 7) steer.y = 10 - loc.y;
  if(loc.lengthSq() > 2*params.areaRadSq) steer.sub(loc);
  steer.normalize();
  steer.multiplyScalar(params.maxSpeed);
  steer.clampScalar(-params.maxForce, params.maxForce);
  return steer;
}

const randomColour = function(){
  return 'rgb(' + (128 + Math.floor(Math.random()*127)) + ", " + (128 + Math.floor(Math.random()*127)) + ", " + (128 + Math.floor(Math.random()*127)) + ")";
}