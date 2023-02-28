//Linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
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
    //TODO: fix
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
//TODO fix li.remove(1)
const li = new LinkedList ();
li.prepend(0);
li.prepend(1);
li.remove(1);
debugger;


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = canvas.width;
canvas.width = 1600;
canvas.height = 900;

class particle {

    constructor(x = 0, y = 0, r = 10, xvel = 0, yvel = 0){
        this.x = x;
        this.y = y;
        this.xvel = xvel;
        this.yvel = yvel;

    }
}



ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(100, 100, 100, 0 , Math.PI * 2, false);
ctx.fill();




