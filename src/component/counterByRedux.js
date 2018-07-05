
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let $addCounter = $('.counterBox .addCounter'),
    $counterPanel = $('.counterBox .counterPanel'),
    $hasAll = $('.allSel .val'),
    $maximum = $('.maximum .val'),
    $allCount = $('.allCount .val');

class Counter{

    constructor(store,{id,value},name){

		this.store = store;
		this.id = id;
        this.value = value;
        this.name = name;
        
        this.elt = $('<div class="counter"></div>');

        let decrementBtn = this.decrementBtn 
        = $('<button class="sub"></button>');

        let num = this.num 
        = $(`<span>${this.value}</span>`);

        let incrementBtn = this.incrementBtn 
        = $('<button class="add"></button>');
        
        let oddBtn = this.oddBtn 
        = $('<button class="addIfOdd"></button>');

        let asyncBtn = this.asyncBtn 
        = $('<button class="addAsync"></button>');

        this.elt.append(decrementBtn,num,incrementBtn,oddBtn,asyncBtn);

        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
        this.addIfOdd = this.addIfOdd.bind(this);
        this.asyncAdd = this.asyncAdd.bind(this);

        decrementBtn.click(this.decrement);
        incrementBtn.click(this.increment);
        oddBtn.click(this.addIfOdd);
        asyncBtn.click(this.asyncAdd);

    }

    decrement(){
        if(this.value===0)return;
        bindDecrement(this.id, this.name);
    }

    increment(){
        bindIncrement(this.id, this.name);
    }

    addIfOdd(){
        bindAddIfOdd(this.id, this.value, this.name);
    }

    asyncAdd(){
        bindAsyncAdd(this.id, this.name);    
    }

}

function counter(state,action){

	let {type, id, name} = action;

	switch(type){

		case 'ADD_COUNTER':
			return Object.assign({}, state, {
				[name]:[...state[name],{
					value:0,
					id:new Date().getTime()
				}]
			})
			break;

		case 'INCREMENT':

			return Object.assign({}, state, {
				[name]:state[name].map(elt=>{
					if(elt.id === id){
						elt.value++
					}
					return elt;
				})
			})

		case 'DECREMENT':
			return Object.assign({}, state, {
				[name]:state[name].map(elt=>{
					if(elt.id === id){
						elt.value--
					}
					return elt;
				})
			})

		default:
			return state;
	}
}

let initState = {
	A:[],
	B:[],
	C:[]
};

let store = createStore(counter,initState,applyMiddleware(thunk));

$($addCounter[0]).click(()=>{
	store.dispatch({type:"ADD_COUNTER",name:"A"});
})

$($addCounter[1]).click(()=>{
	store.dispatch({type:"ADD_COUNTER",name:"B"});
})

$($addCounter[2]).click(()=>{
	store.dispatch({type:"ADD_COUNTER",name:"C"});
})

store.subscribe(()=>{
	let state = store.getState();
	initPanel(state.A, 0, "A");
	initPanel(state.B, 1, "B");
	initPanel(state.C, 2, "C");
});

function initPanel(state,num,name){
	
	if(state.length === 0) return;
	$($counterPanel[num]).html('');

	state.forEach(data=>{
		$($counterPanel[num]).append(new Counter(store,data,name).elt);
	});

	$($hasAll[num]).html(state.every(elt=>elt.value!==0)+'');
	$($maximum[num]).html(state.slice().sort((a,b)=>b.value-a.value)[0].value);
	$($allCount[num]).html(state.reduce((accu,elt)=>accu+elt.value,0));
}

//action创建函数
function increment(id,name){
	return {"type":"INCREMENT", id, name}
}

function decrement(id,name){
	return {"type":"DECREMENT", id, name}
}

function addIfOdd(id,value,name){
	return function(dispatch){
		if(value%2!==0){
           bindIncrement(id, name);
        } 
	}
}

function asyncAdd(id,name){
	return function(){
		setTimeout(()=>{
	        bindIncrement(id,name);
	    },1000);
	}	
}

function bindIncrement(id,name){
	store.dispatch(increment(id,name));
}

function bindDecrement(id,name){
	store.dispatch(decrement(id,name));
}

function bindAddIfOdd(id,value,name){
	store.dispatch(addIfOdd(id,value,name));
}

function bindAsyncAdd(id,name){
	store.dispatch(asyncAdd(id,name));
}