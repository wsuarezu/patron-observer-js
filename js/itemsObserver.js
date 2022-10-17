class Subject{
    constructor(){
        this.observers = [];
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
       this.observers = this.observers.filter(obs => obs !== observer); 
    }

    notify(data){
        this.observers.forEach( e => {
            e.refresh(data);
        })
    }
}

class ItemsSubject extends Subject{

    constructor(){
        super();
        this.data = [];
    }

    add(item){
        this.data.push(item);
        this.notify(this.data);
    }
}

class HtmlElementObserver{

    constructor(element){
        this.element = element;
    }

    refresh(data){
        this.element.innerHTML = data.reduce((ac, e) => {
            return ac + `
            <p>${e}</p>
            `
        }, '')
    }
}

class Observer{
    constructor(fn){
        this.fn = fn;
    }

    refresh(data){
        this.fn(data);
    }
}

const items = new ItemsSubject();
const dvi1Observer = new HtmlElementObserver(div1);
const dvi2Observer = new HtmlElementObserver(div2);
const observer1 = new Observer((data) => {
    div3.innerHTML = data.length;
})

items.subscribe(dvi1Observer);
items.subscribe(dvi2Observer);
items.subscribe(observer1);


function add(){
    const name = txtNombre.value;
    items.add(name);
}