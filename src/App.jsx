import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState('');

  //useref

  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*_+-{}[]`<>?/';

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipbord=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{
  passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-2'>Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
          onClick={copyPasswordToClipbord} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy
          </button>
        </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input type="range"
          min={6}
          max={20}
          value={length}
          className=''cursor-pointer
          onChange={(e)=>{setLength(e.target.value)}} />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className='flex-items-center gap-x-1'>
        <input type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>setNumberAllowed((prev)=>!prev)} />
                <label htmlFor="">Numbers</label>
        </div>
        <div className='flex-items-center gap-x-1'>
        <input type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>setCharAllowed((prev)=>!prev)} />
                <label htmlFor="">Characters</label>
        </div>
       </div>
      </div>
    </>
  );
}

export default App;
