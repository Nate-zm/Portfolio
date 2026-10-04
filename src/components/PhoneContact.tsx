import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';

export default function PhoneContact({phone,label,display}:{phone:string;label:string;display:string}) {
 const reduced=useReducedMotion();
 const sequence=useRef(0);
 const [ripples,setRipples]=useState<{id:number;x:number;y:number;size:number}[]>([]);
 useEffect(()=>{if(reduced)setRipples([])},[reduced]);
 function ripple(element:HTMLAnchorElement,point?:{x:number;y:number}) {
  if(reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const bounds=element.getBoundingClientRect();
  const x=point?point.x-bounds.left:bounds.width/2;
  const y=point?point.y-bounds.top:bounds.height/2;
  const size=2*Math.hypot(Math.max(x,bounds.width-x),Math.max(y,bounds.height-y));
  const id=++sequence.current;
  setRipples(current=>[...current.slice(-7),{id,x,y,size}]);
 }
 return <a className="phone-contact" href={`tel:${phone}`} onPointerDown={event=>{if(event.button===0)ripple(event.currentTarget,{x:event.clientX,y:event.clientY})}} onClick={event=>{if(event.detail===0)ripple(event.currentTarget)}}>
  {ripples.map(wave=><span aria-hidden="true" className="phone-ripple" key={wave.id} style={{left:wave.x-wave.size/2,top:wave.y-wave.size/2,width:wave.size,height:wave.size}} onAnimationEnd={()=>setRipples(current=>current.filter(item=>item.id!==wave.id))}/>)}
  <span className="phone-contact-icon"><Phone size={17}/></span>
  <span className="phone-contact-details"><span className="phone-contact-label">{label}</span><span className="phone-contact-number">{display}</span></span>
  <ArrowUpRight size={16}/>
 </a>;
}
