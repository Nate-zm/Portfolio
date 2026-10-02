import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../data/content';

function Note({index}:{index:number}) {
 const note=content.references[index];
 return <><p className="eyebrow">A NOTE ON CONNECTION</p><blockquote>{note.quote}</blockquote><strong>{note.name}</strong><p className="small muted">{note.role}</p><a href={`mailto:${content.email}?subject=Request%20for%20references`} className="text-link">Request references</a></>;
}

export default function ConnectionNotes() {
 const [index,setIndex]=useState(0);
 const [direction,setDirection]=useState(1);
 const [turning,setTurning]=useState(false);
 const reduced=useReducedMotion();
 const turn=(step:number)=>{if(turning)return;setDirection(step);setTurning(true);setIndex(i=>(i+step+content.references.length)%content.references.length)};
 const variants={
  enter:(step:number)=>({rotateY:reduced?0:step*85,opacity:reduced?0:.3}),
  visible:{rotateY:0,opacity:1},
  exit:(step:number)=>({rotateY:reduced?0:-step*85,opacity:reduced?0:.3})
 };
 return <div className="glass reference-card">
  <span className="quote-symbol" aria-hidden="true">“</span>
  <div className="reference-flip-stage">
   {content.references.map((note,i)=><div className="reference-page reference-size-guide" aria-hidden="true" key={i}><p className="eyebrow">A NOTE ON CONNECTION</p><blockquote>{note.quote}</blockquote><strong>{note.name}</strong><p className="small muted">{note.role}</p><span className="text-link">Request references</span></div>)}
   <AnimatePresence mode="wait" custom={direction} initial={false}>
    <motion.div className="reference-page" key={index} custom={direction} variants={variants} initial="enter" animate="visible" exit="exit" transition={{duration:reduced?.12:.38,ease:[.25,.1,.25,1]}} onAnimationComplete={phase=>{if(phase==='visible')setTurning(false)}}><Note index={index}/></motion.div>
   </AnimatePresence>
  </div>
  <div className="carousel-controls"><button className="icon-button" aria-label="Previous reference" aria-disabled={turning} onClick={()=>turn(-1)}><ChevronLeft size={18}/></button><span className="small muted">{index+1} / {content.references.length}</span><button className="icon-button" aria-label="Next reference" aria-disabled={turning} onClick={()=>turn(1)}><ChevronRight size={18}/></button></div>
  <span className="sr-only" role="status" aria-live="polite">Note {index+1} of {content.references.length}: {content.references[index].quote}</span>
 </div>;
}
