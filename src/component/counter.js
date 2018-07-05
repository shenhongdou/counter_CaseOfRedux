import React,{Component} from 'react';

export default function Counter (props){
	
	let {
		actions:{
			increment,
			decrement,
			addIfOdd,
			asyncAdd
		},
		data:{id,value},
		name
	} = props;
	
	return(
		<div className="counter">
            <button 
            	className="sub"
            	onClick={()=>{
            		decrement(id,name,value);
            	}}
            ></button>
            <span>{value}</span>
            <button 
            	className="add"
            	onClick={()=>{
            		increment(id,name);
            	}}
            ></button>
            <button 
            	className="addIfOdd"
            	onClick={()=>{
            		addIfOdd(id,name,value);
            	}}
            ></button>
            <button 
            	className="addAsync"
            	onClick={()=>{
            		asyncAdd(id,name);
            	}}
            ></button>
        </div>  
	)
		
}