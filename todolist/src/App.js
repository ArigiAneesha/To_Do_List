import { useState } from 'react';
import './app.css'
const App=()=>{
  const data=localStorage.getItem('lists')? JSON.parse(localStorage.getItem('lists')) : [];
    const [list,setlist]=useState(data)
    const [newtask,setnewtask]=useState("")
    const [search,setSearch]=useState('')
    
    const addtask=()=>{
      localStorage.setItem('lists',JSON.stringify([...list,newtask]))
      setlist([...list,newtask])
      setnewtask("")
      
    }
    const updatetask=(e,i)=>{
        const updatelistitem=[...list]
        updatelistitem.splice(i,1,e.target.value)
        setlist(updatelistitem)
        localStorage.setItem('lists',JSON.stringify(updatelistitem))
    }
    const deletetask=(i)=>{
      const dellist=[...list]
      dellist.splice(i,1)
      setlist(dellist)
      localStorage.setItem('lists',JSON.stringify(dellist))
    }
    const keyEnter=(e)=>{
      if(e.key === "Enter"){
        addtask()
      }
    }
    
    return (
      <div className='app'>
        <div className='search'>
          <input type="text" placeholder='serach task....🔎' onChange={(e)=>{setSearch(e.target.value)}}></input>
        </div>
        <div className='inputs'>
          <h1>To-Do List 📃</h1>
          <div className='input-container'>
            <input type="text" onChange={(e)=>{setnewtask(e.target.value)}} onKeyDown={keyEnter} value={newtask} className='input-task'></input>
            <button onClick={addtask} className='add-btn'>Add</button>
          </div>
        </div>
        <div className='Container'>
        {
          list.map((val,i)=>{
            if(val.toLowerCase().includes(search.toLowerCase())){
              return(
                <div className='list-items' key={i}>
                  <span>{i+1}.</span>
                  <input type='text' value={val} onChange={(e)=>{updatetask(e,i)}}></input>
                  <span className='cross-icon' onClick={()=>{deletetask(i)}}>❌</span>
                </div>
              );
            }
            
          })
        }
        </div>
        
      </div>
    )
}
export default App;