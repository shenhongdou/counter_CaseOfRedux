import React,{Component} from 'react';
import Counter from './counter';

export default function CounterPanle (props){
 
	let {actions,data,name} = props;

	let hasAll = data.length ? data.every(elt=>elt.value!==0)+'' : "false";
	let maximum = data.length ? data.slice().sort((a,b)=>b.value-a.value)[0].value : "null";
	let allCount = data.length ? data.reduce((accu,elt)=>accu+elt.value,0) : 0;

	return(
		<div className="counterBox">
	        <div className="panel">
	            <button 
	            	className="addCounter"
	            	onClick={()=>{actions.addCounter(name)}}
	            ></button>
	            <div className="counterPanel"> 
					{data.map((elt)=>{
						return <Counter 
							key={elt.id}
							{...{
								data:elt,
								actions,
								name
							}} 
						/>
					})}
	            </div>
	        </div>
	        <div className="dashboard">
	            <div className="allSel line">
		            <span className="key">HasAll:</span> 
		            <span className="val">{hasAll}</span>
	        	</div>
	            <div className="maximum line">
	            	<span className="key">Maximum:</span> 
	            	<span className="val">{maximum}</span>
	            </div>
	            <div className="allCount line">
	            	<span className="key">AllCount:</span> 
	            	<span className="val">{allCount}</span>
	            </div>
	        </div>
	    </div>
	)
}
	
