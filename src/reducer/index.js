

export default function counter(state,action){

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