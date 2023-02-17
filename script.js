//Linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size == 0;
    }

    getSize() {
        return this.size;
    }

    getLast() {
        let current = this.first
        while(current.next != null) {
            current = current.next;
        }
        return current;
    }

    prepend(value) {
        const node = new Node(value);
        if(!this.isEmpty()) {
            node.next = this.first;
            this.last = this.first
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
        this.last = node
        this.size++
    }

    remove(index) {
        //index out of bounds
        if(0 >= index >= this.getSize()){ 
            alert("List remove index out of bounds");
        }
        //deletion handler
        let del;
        if(index == this.getSize()-1){
            del = function (node){
                node.next = null
            }
        } else if(index == 0) {
            del = function (){
                this.first = this.first.next
            }
        } else {
            del = function (node){
                node.next = node.next.next
            }
        }
        
        search = 0
        point = this.first
        if(!index == 0){
            while(index > search < this.getSize()){
                //check if next node has a next node
                if(search+1 == index) {
                    del(point);
                }
                search++;
                point = point.next;
            }
        } else {
            del();
        }
    }
}



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




