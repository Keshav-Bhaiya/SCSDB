import React from "react";

const Dropdown = ({title, options, func}) => {
  return(
    <div className="select w-full min-w-[120px] sm:min-w-[140px] md:min-w-[160px]">
        <select 
          defaultValue="0" 
          onChange={func}  
          name="format" 
          id="format"
          className="w-full text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-3 rounded bg-[#27272a] text-white border border-gray-600 focus:border-gray-400 focus:outline-none"
        >
          <option value="0" disabled>
            {title}
          </option>
          {options.map((o,i)=> 
            <option key={i} value={o}>
              {o.toUpperCase()}
            </option>
          )}
        </select>
    </div>
  )
}

export default Dropdown;