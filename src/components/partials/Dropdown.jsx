import React from "react";

const Dropdown = ({title,options,func})=>{
  return(
    <div className="select w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
        <select 
          defaultValue="0" 
          onChange={func}  
          name="format" 
          id="format"
          className="w-full text-xs sm:text-sm md:text-base px-2 py-2 sm:px-3 sm:py-2 rounded bg-[#27272a] text-white"
        >
          <option value="0" disabled>
            {title}
          </option>
          {options.map((o,i)=> <option key={i} value={o} >
            {o.toUpperCase()}
          </option>
        )}
        </select>
      </div>
  )
}
export default Dropdown;