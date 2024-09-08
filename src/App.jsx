 import { useState,useCallback,useRef,useEffect} from 'react'
import './App.css'

function App() {
 
  const [length,setLength]=useState(8)
  const [numberallowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("")
   const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed)str+="123456789";
    if(charAllowed)str+="!@#$%^&*()~`?><[]{}"
    for(let i=1;i<=length;i++){
       let char=Math.floor(Math.random()*str.length+1)
       pass+=str.charAt(char)
    }
    setPassword(pass);
  },[length,numberallowed,charAllowed]);
  const PasswordCopyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,9);
    window.navigator.clipboard.writeText(password)
   },[password])
  
  useEffect(()=>{
    passwordGenerator()
  },[length,numberallowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md bg-red-400 rounded-3xl px-4 my-8 text-black-500 '>
      <h1 className='text-black  text-3xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
       <button onClick={PasswordCopyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className=' bg-green-500 rounded-3xl flex text-sm gap-x-2'>
        <div className='flex gap-x-1 items-center'>
          <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label >Length: {length}</label>
        </div>
        <div className='flex gap-x-1 items-center'>
          <input type="checkbox"  defaultChecked={numberallowed} id='numberInput' onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="numberInput">Numbers: </label>
        </div>
        <div className='flex gap-x-1 items-center'>
        <input type="checkbox"  defaultChecked={charAllowed} id='charInput' onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}/>
          <label htmlFor="charInput">Characters: </label>
        </div>
      </div>
         
    </div>
    </>
  )
}

export default App
