export function increment(id,name){
	return {"type":"INCREMENT", id, name}
}

export function decrement(id,name,value){
	return function(dispatch){
		if(value === 0) return;
		dispatch({"type":"DECREMENT", id, name})
	}
}

export function addIfOdd(id,name,value){
	return function(dispatch){
		if(value%2!==0){
           dispatch(increment(id,name));
        } 
	}
}

export function asyncAdd(id,name){
	return function(dispatch){
		setTimeout(()=>{
	        dispatch(increment(id,name));
	    },1000);
	}	
}

export function addCounter(name){
	return {type:"ADD_COUNTER",name}
}