"use strict"

class Vector extends Array {
    // example methods
    add(other) {
      return this.map((e, i) => e + other[i]);
    }

    abs() {
        let sum = 0;
        this.map(e => sum += e**2);
        return Math.sqrt(sum);
    }

    subtract(other) {
        return this.map((e, i) => e - other[i]);
    }

    normal() {
        return this.map(e => e / v.abs());
    }

    multiply() {
        return this.map(e => e * v.abs());
    }
}



//Linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    getValue(){
        return this.value;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.size = 0;
        this.last = null;
    }

    isEmpty() {
        return this.size == 0;
    }

    getSize() {
        return this.size;
    }

    getLast() {
        let current = this.first;
        while(current.next != null) {
            current = current.next;
        }
        return current;
    }

    prepend(value) {
        const node = new Node(value);
        if(!this.isEmpty()) {
            node.next = this.first;
        } else {
            this.last = node;
        }
        this.first = node;
        this.size++
    }

    append(value) {
        const node = new Node(value);
        if(this.isEmpty()) {
            this.first = node;
        } else {
            this.last.next = node;
        }
        this.last = node;
        this.size++
    }
    remove(index) {
        let listSize = this.getSize();
        //index out of bounds
        if( 0 > index || index >= listSize){ 
            alert("List remove() index out of bounds, index at: " + index);
            return null;
        }
        //deletion handler
        this.size--;
        let del;
        if(index === 0){
            del = function (obj){
                let r = obj.first;
                obj.first = obj.first.next;
                return r;
            }
        } else if(index === listSize-1) {
            del = function (node){
                let r = node.next;
                node.next = null;
                return r;
            }
        } else {
            del = function (obj = null, node){
                let r = node.next;
                node.next = node.next.next;
                return r;
            }
        }
        
        let prev = this.first;

        if(index === 0){
            return del(this);
        }
        for(let i = 1; i < index; i++){
            prev = prev.next;
        }
        let deleted = del( prev);
        this.last = this.getLast();
        return deleted
    }
}

const li = new LinkedList ();
li.prepend(0);
li.prepend(1);
li.remove(1);


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = canvas.width;
canvas.width = 800;
canvas.height = 600;

class Particle {

    constructor(x = 0, y = 0, r = 10, xvel = 0, yvel = 0){
        this.pos = new Vector(x, y);
        this.r = r;
        this.vel = new Vector(xvel, yvel);

    }

    getX() {
        return this.pos[0];
    }

    getY() {
        return this.pos[1];
    }

    setX(x) {
        this.pos[0] = x;
    }

    setY(y) {
        this.pos[1] = y;
    }
}


const fps = 60;
let lastTimestamp = 0;
const particles = new LinkedList();

function generateParticles(){
    for(let i = 0; i < 9; i++) {
        particles.append(new Particle(i*10, 100, 10, 0, 0));
    }

}

function draw() {
    let x = particles.first;
    ctx.fillStyle = "white";
    while(x !== null){
        ctx.moveTo(x.getValue().getX(), 100);
        ctx.arc(x.getValue().getX()*10, 300, 20, 0 , Math.PI * 2, false);   
        x = x.next;
    }
    ctx.fill();

}

function physics() {
    let current = particles.first;
    while(current){
        let other = current.next;
        while(other){
            between = current.pos.subtract(other.pos);
            distance = between.abs();
            force = 9.81 * (1 / (distance**2));
            normal = distance.normal();
            current.vel.add(normal * force)
            other = other.next;
        }
        current = current.next;
    }
}

function getDeltaTime(currentTimestamp){
    let frametime = currentTimestamp-lastTimestamp;
    console.log(frametime);
    return frametime/1000;
}

// !!! multiply movement by deltatime 
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(fpslimiter);
    ctx.beginPath();
    let deltaTime = getDeltaTime(timestamp);
    lastTimestamp = timestamp;
    
    draw();
    
    ctx.closePath();

}

function fpslimiter(timestamp) {
    setTimeout(animate, 1000/fps, timestamp);

}
generateParticles();
requestAnimationFrame(fpslimiter);




