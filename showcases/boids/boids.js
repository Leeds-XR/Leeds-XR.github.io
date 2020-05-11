/*
boids.js
Oliver Cass (c) 2020
All Rights Reserved
*/

var size = 50;


const NUM_BOIDS = 800;

const MAX_SPEED = 0.3;
const MAX_FORCE = 0.004;

//Square Radius Values
const SEARCH = 20;
const SEPERATION = 7;
const ALIGNMENT = 12;
const COHESION = 18;

var boids = [];

var target = false;

var scene;

window.onload = function(){
  scene = document.getElementById('scene');

  for(var i = 0; i < NUM_BOIDS; i++) boids.push(new Boid());
  requestAnimationFrame(update);
  //should use requestAnimationFrame but doesn't seem to work on mobile devices in vr mode
}

const Boid = function(){
  this.vel = new THREE.Vector3(Math.random()*MAX_SPEED*2 - MAX_SPEED, Math.random()*MAX_SPEED*2 - MAX_SPEED, Math.random()*MAX_SPEED*2 - MAX_SPEED);
  this.acc = new THREE.Vector3();
  
  this.ele = document.createElement('a-cone');
  this.ele.setAttribute('radius-bottom', '0.4');
  this.ele.setAttribute('radius-top', '0');
  this.ele.setAttribute('height', '0.9');
  this.ele.setAttribute('color', randomColour());
  
  this.obj = this.ele.object3D;

  this.obj.position.set(Math.random()*size*2 - size, 2 + Math.random()*size, Math.random()*size*2 - size);
  

  this.obj.up = new THREE.Vector3(1, 0, 0);
  
  scene.appendChild(this.ele);
  
  
  this.update = function(){
    var localBoids = this.getLocalBoids();
    
    
    var rule1 = seperation(this, localBoids);
    var rule2 = alignment(this, localBoids);
    var rule3 = cohesion(this, localBoids);
    var rule4 = new THREE.Vector3();
    if(target) rule4 = seek(this, new THREE.Vector3()); //player position
    var rule5 = boundary(this, this.obj.position);
    
    rule1.multiplyScalar(15);
    rule2.multiplyScalar(1.5);
    rule3.multiplyScalar(0.3);
    rule4.multiplyScalar(1.3);
    rule5.multiplyScalar(1);
    
    this.acc.add(rule1);
    this.acc.add(rule2);
    this.acc.add(rule3);
    this.acc.add(rule4);
    this.acc.add(rule5);
    
    this.vel.add(this.acc);
    this.vel.clampScalar(-MAX_SPEED, MAX_SPEED);
    this.acc.multiplyScalar(0);
    
    
    this.obj.lookAt(this.obj.position.x + this.vel.x, this.obj.position.y + this.vel.y, this.obj.position.z + this.vel.z);
    this.obj.rotateX(Math.PI / 2);
    
    this.obj.position.set(this.obj.position.x + this.vel.x, this.obj.position.y + this.vel.y, this.obj.position.z + this.vel.z);
  }
  
  this.getLocalBoids = function(){
    var localBoids = []
    for(var b of boids){
      if(b == this) continue;
      if(this.obj.position.distanceToSquared(b.obj.position) < SEARCH) localBoids.push(b);
    }
    return localBoids;
  }
}

function seperation(boid, lBoids){
  var steer = new THREE.Vector3();
  var count = 0;
  for(var b of lBoids){
    var dist = boid.obj.position.distanceToSquared(b.obj.position);
    if(dist < SEPERATION){
      var diff = new THREE.Vector3().subVectors(boid.obj.position, b.obj.position);
      diff.normalize();
      diff.divideScalar(dist);
      steer.add(diff);
      count++;
    }
  }
  if(count > 0) steer.divide(count);
  if(steer.length() > 0){
    steer.normalize();
    steer.multiplyScalar(MAX_SPEED);
    steer.sub(boid.vel);
    steer.clampScalar(-MAX_FORCE, MAX_FORCE);
    return steer;
  }
  return new THREE.Vector3();
}

function alignment(boid, lBoids){
  var steer = new THREE.Vector3();
  
  var count = 0;
  for(var b of lBoids){
    var dist = boid.obj.position.distanceToSquared(b.obj.position);
    if(dist < ALIGNMENT){
      steer.add(b.vel);
      count++;
    }
  }
  
  if(count > 0){
    steer.divideScalar(count);
    steer.normalize();
    steer.multiplyScalar(MAX_SPEED);
    steer.sub(boid.vel);
    steer.clampScalar(-MAX_FORCE, MAX_FORCE);
  }
  
  return steer;
}
function cohesion(boid, lBoids){
  var target = new THREE.Vector3();
  
  var count = 0;
  for(var b of lBoids){
    var dist = boid.obj.position.distanceToSquared(b.obj.position);
    if(dist < COHESION && dist > 5){
      target.add(b.obj.position);
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
  var steer = new THREE.Vector3().subVectors(target, boid.obj.position);
  steer.normalize();
  steer.multiplyScalar(MAX_SPEED);
  steer.sub(boid.vel);
  steer.clampScalar(-MAX_FORCE, MAX_FORCE);
  return steer;
  
}
function boundary(boid, loc){
  var steer = new THREE.Vector3();
  if(loc.y < 7) steer.y = 10 - loc.y;
  if(loc.lengthSq() > 2*size*size) steer.sub(loc);
  steer.normalize();
  steer.multiplyScalar(MAX_SPEED);
  steer.clampScalar(-MAX_FORCE, MAX_FORCE);
  return steer;
}

function update(){
  for(var b of boids) b.update();
  requestAnimationFrame(update);
}

const randomColour = function(){
  return 'rgb(' + (128 + Math.floor(Math.random()*127)) + ", " + (128 + Math.floor(Math.random()*127)) + ", " + (128 + Math.floor(Math.random()*127)) + ")";
}