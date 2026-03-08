import { useRef, useEffect, memo } from "react";
import useProductsStore from "../../store/useProductsStore";

function PriceRangeSlider() {
  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const rangeTrackRef = useRef(null);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);
  const {setFilters }=useProductsStore((state)=>state)

  const minGap = 10;
  const maxValue = 400;

  const updateRange = (e) => {
    let min = parseInt(minRangeRef.current.value);
    let max = parseInt(maxRangeRef.current.value);

    if (max - min < minGap) {
      if (e.target === minRangeRef.current) {
        minRangeRef.current.value = max - minGap;
      } else {
        maxRangeRef.current.value = min + minGap;
      }
    }

    minValueRef.current.textContent = minRangeRef.current.value;
    maxValueRef.current.textContent = maxRangeRef.current.value;

    let minPercent = (minRangeRef.current.value / maxValue) * 100;
    let maxPercent = (maxRangeRef.current.value / maxValue) * 100;

    rangeTrackRef.current.style.left = `${minPercent}%`;
    rangeTrackRef.current.style.right = `${100 - maxPercent}%`;
  };

  useEffect(() => {
    updateRange({ target: minRangeRef.current });
  }, []);

  return ( <>
  
    <div className="w-full flex flex-col justify-center items-center px-8 py-2.5 border border-gray-200 rounded-xl ">
      <div className="relative w-full mt-4 h-4 mx-3   ">
        {/* Min Range Input */}
        <input
          ref={minRangeRef}
          type="range"
          min="0"
          max="400"
          defaultValue="0"
          onInput={updateRange}
          className="price-slider-input"
          onMouseUp={() => setFilters({ minPrice : Number(minRangeRef.current.value) })}
        />

        {/* Max Range Input */}
        <input
          ref={maxRangeRef}
          type="range"
          min="0"
          max="400"
          defaultValue="400"
          onInput={updateRange}
          className="price-slider-input"
          onMouseUp={() => setFilters({ maxPrice : Number(maxRangeRef.current.value) })}
        />

        {/* Custom Track */}
        <div className="relative w-full h-2 bg-gray-200 rounded-md">
          <div
            ref={rangeTrackRef}
            className="absolute h-2 rounded-md bg-gradient-to-r from-blue-900 to-blue-400"
          />
        </div>
      </div>
    </div>

       <div className="p-2" >
        <h5 className="text-nowrap">
          Maximum Price :
          <span ref={maxValueRef} className="font-bold text-red-500">
            400
          </span>
          <span className="ml-1 text-gray-500">$</span>
        </h5>
        <h5 className="text-nowrap">
          Minimum Price :
          <span ref={minValueRef} className="font-bold text-blue-500">
            0
          </span>
          <span className="ml-1 text-gray-500">$</span>
        </h5>
      </div>
  </>
  );
}

export default memo(PriceRangeSlider);
