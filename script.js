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
        return this.map(e => e / this.abs());
    }

    multiply(v) {
        return this.map(e => e * v);
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
        particles.append(new Particle(i*100, 100, 10, 0, 0));
    }

}

function draw(p) {
    ctx.moveTo(p.getX(), p.getY());
    ctx.arc(p.getX(), p.getY(), p.r, 0 , Math.PI * 2, false);   
}

function physics() {
    let current = particles.first;
    while(current){
        const p1 = current.getValue();
        let other = current.next;
        while(other){
            const p2 = other.getValue();
            let between = p1.pos.subtract(p2.pos);
            let distance = between.abs();
            let force = 9.81 * (1 / (distance**2));
            let normal = between.normal();
            p1.vel = p1.vel.add(normal.multiply(-force));
            p2.vel = p2.vel.add(normal.multiply(force));
            other = other.next;
        }
        current = current.next;
    }
}

function moveParticles(deltaTime) {
    let current = particles.first;
    while(current) {
        let p = current.getValue();
        p.pos = p.pos.add(p.vel.multiply(deltaTime));
        draw(p);
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
    ctx.fillStyle = "white";
    let deltaTime = getDeltaTime(timestamp);
    lastTimestamp = timestamp;
    physics();
    moveParticles(deltaTime);
    ctx.fill();
    ctx.closePath();
    console.log(particles.first.getValue().pos);
}

function fpslimiter(timestamp) {
    setTimeout(animate, 1000/fps, timestamp);

}
generateParticles();
requestAnimationFrame(fpslimiter);




