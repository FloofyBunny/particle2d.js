"use strict"

class Vector extends Array {
    // example methods
    add(other) {
      return this.map((e, i) => e + other[i]);
    }

    abs() {
        let sum = 0;
        this.map(e => sum += Math.abs(e));
        return sum;
    }

    subtract(v) {
        if(v instanceof Vector){
            return this.map((e, i) => e - v[i])
        }
        return this.map((e, i) => e - v);
    }

    normal() {
        return this.map(e => e / this.abs());
    }

    multiply(v) {
        if(v instanceof Vector){
            return this.map((e, i) => e * v[i])
        }
        return this.map(e => e * v);
    }

    devide(v) {
        return this.map(e => e / v)
    }

    dotP(v) {
        let sum;
        this.map((e, i) => sum = e * v[i]);
        return sum;
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

    constructor(x = 0, y = 0, r = 10, xvel = 0, yvel = 0, name = ""){
        this.pos = new Vector(x, y);
        this.r = r;
        this.vel = new Vector(xvel, yvel);
        this.name = name;

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


const fpsTarget = 60;
let fps = fpsTarget;
let lastTimestamp = 0;
const particles = new LinkedList();
const gravitation = 100;

function generateParticles(){
    for(let i = 0; i < 9; i++) {
        if(i === 8){
            particles.append(new Particle(i*100, 100, 10, 0, 0, "last"))
        } else {
            particles.append(new Particle(i*100, 100, 10, 0, 0));
        }
        
    }

}

function draw(p) {
    ctx.moveTo(p.getX(), p.getY());
    ctx.arc(p.getX(), p.getY(), p.r, 0 , Math.PI * 2, false);
    ctx.fill();   
}

function physics() {
    let current = particles.first;
    while(current){
        const p1 = current.getValue();
        let other = current.next;
        while(other){
            if(current === particles.last){
                console.log("last")
            }
            const p2 = other.getValue();
            gravity(p1, p2);
            collision(p1, p2);
            other = other.next;
        }
        collision(particles.last.getValue(), null);
        
        
        
        if(current.next === particles.last){
            console.log("");
        }
        current = current.next;
    }
}

function checkCollision(p1, p2){
    let distance = p2.pos.subtract(p1.pos).abs();
    return distance**2 <= (p1.r + p2.r)**2;
}


//TODO: test
function closestPointOnLine(l1, l2, point) {
    lx1 = l1[0];
    ly1 = l1[2];
    lx2 = l2[0];
    ly2 = l2[2];
    x0 = point[0];
    y0 = point[1];

    //orthogonale gerade
    let A1 = ly2 - ly1;
    let B1 = lx1 - lx2;

    let C1 =  (ly2 - ly1) * lx1 + (lx1 - lx2) * ly1;
    let C2 = (-B1 * x0) + A1 * y0;
    let det = A1 * A1 - (-B1 * B1)
    let cx = 0;
    let cy = 0;

    if(det !== 0){
        cx = (A1 * C1 - B1 * C2) / det;
        cy = (A1 * C2 - -B1 * C1) / det
    } else {
        cx = x0;
        cy = y0;
    }
    return new Vector(cx, cy);
}

//TODO: variable mass
function collision(p1, p2) {
    let between;
    let normal;
    if(p2 !== null){
        between = p2.pos.subtract(p1.pos);
        normal = between.normal();

        if(between.subtract(p1.r + p2.r).abs()<= 0){
            let p = ((p1.vel.dotP(normal) - p2.vel.dotP(normal)) * 2) /(1+1);
            p1.vel = p1.vel.subtract(normal.multiply(p).multiply(1));
            p2.vel = p2.vel.add(normal.multiply(p).multiply(1));
        }
        /* TODO: Stationary to Moving colision
        if(checkCollision(p1, p2)){
            let midpoint = p1.pos.add(p2.pos).devide(2);
            p1.pos = midpoint.subtract(normal.multiply(p1.r))
        }
        */
    }
    //TODO: fix NaN (look at arythmetics)
    //wallcheck
    console.log(p1);
    if(p1.pos[0] + p1.r >= canvas.width ){
        p1.pos[0] = canvas.width - p1.r;
        p1.vel[0] = -Math.abs(p1.vel[0]);
    } else if(p1.pos[1] + p1.r >= canvas.height){
        p1.pos[1] = canvas.height - p1.r;
        p1.vel[1] = -Math.abs(p1.vel[1]);
    } else if(p1.pos[0] - p1.r <= 0) {
        p1.pos[0] = p1.r;
        p1.vel[0] = Math.abs(p1.vel[0]);
    } else if(p1.pos[1] - p1.r <= 0) {
        p1.pos[1] = p1.r;
        p1.vel[1] = Math.abs(p1.vel[1]);
    }
    

    

    


}

function gravity(p1, p2) {
            let between = p1.pos.subtract(p2.pos);
            let distance = between.abs();
            let force = gravitation * (1 / (distance**2));
            let normal = between.normal();
            if(p1.vel.abs() < 30){
                p1.vel = p1.vel.add(normal.multiply(-force));
                p2.vel = p2.vel.add(normal.multiply(force));
            } else {
                p1.vel = p1.vel.normal().multiply(100);
            }


}
//TODO: Make every Particle colorizable
function moveParticles(deltaTime) {
    let current = particles.first;
    while(current) {
        let p = current.getValue();
        p.pos = p.pos.add(p.vel.multiply(deltaTime));
        ctx.fillStyle = "white";
        if(current === particles.last){
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "red";
        }
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
    requestAnimationFrame(animate);
    ctx.beginPath();
    ctx.fillStyle = "white";
    let deltaTime = getDeltaTime(timestamp);
    lastTimestamp = timestamp;
    physics();
    moveParticles(deltaTime);
    //ctx.fill();
    ctx.closePath();
    console.log(particles.first.getValue().pos);
}


function click(info) {
    particles.append(new Particle(info.offsetX, info.offsetY, 10, 0, 0));
}

canvas.addEventListener("mousedown", click);

generateParticles();
requestAnimationFrame(animate);




