import { useRef, useEffect, memo } from "react";

function PriceRangeSlider({ filterParams, updateURL }) {

  // reade max and min prices from url to keep ui updated when happen any refresh
  const urlMin = filterParams.get("minPrice") || "0";
  const urlMax = filterParams.get("maxPrice") || "400";

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const rangeTrackRef = useRef(null);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);

  const minGap = 10;
  const maxValue = 400;

  const updateRange = (e) => {
    let min = parseInt(minRangeRef.current.value);
    let max = parseInt(maxRangeRef.current.value);

    if (max - min < minGap) {
      if (e?.target === minRangeRef.current) {
        minRangeRef.current.value = max - minGap;
        min = max - minGap;
      } else {
        maxRangeRef.current.value = min + minGap;
        max = min + minGap;
      }
    }

    // تحديث الأرقام والخط الملون
    minValueRef.current.textContent = min;
    maxValueRef.current.textContent = max;

    let minPercent = (min / maxValue) * 100;
    let maxPercent = (max / maxValue) * 100;

    rangeTrackRef.current.style.left = `${minPercent}%`;
    rangeTrackRef.current.style.right = `${100 - maxPercent}%`;
  };

  // 2. تأكد إن الـ UI يتحدث أول ما الصفحة تفتح بناءً على قيم الـ URL
  useEffect(() => {
    updateRange();
  }, [urlMin, urlMax]); // لو اللينك اتغير من بره، الـ Slider يتحرك

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center px-8 py-2.5 border border-gray-200 rounded-xl ">
        <div className="relative w-full mt-4 h-4 mx-3">
          <input
            ref={minRangeRef}
            type="range"
            min="0"
            max="400"
            defaultValue={urlMin} // استخدم القيمة من الـ URL
            onInput={updateRange}
            onMouseUp={() => updateURL({ minPrice: minRangeRef.current.value })}
            className="price-slider-input"
          />

          <input
            ref={maxRangeRef}
            type="range"
            min="0"
            max="400"
            defaultValue={urlMax} // استخدم القيمة من الـ URL
            onInput={updateRange}
            // تصحيح الـ Key لـ maxPrice
            onMouseUp={() => updateURL({ maxPrice: maxRangeRef.current.value })} 
            className="price-slider-input"
          />

          <div className="relative w-full h-2 bg-gray-200 rounded-md">
            <div
              ref={rangeTrackRef}
              className="absolute h-2 rounded-md bg-gradient-to-r from-blue-900 to-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="p-2">
        <h5 className="text-nowrap">
          Maximum Price: <span ref={maxValueRef} className="font-bold text-red-500">{urlMax}</span>
          <span className="ml-1 text-gray-500">$</span>
        </h5>
        <h5 className="text-nowrap">
          Minimum Price: <span ref={minValueRef} className="font-bold text-blue-500">{urlMin}</span>
          <span className="ml-1 text-gray-500">$</span>
        </h5>
      </div>
    </>
  );
}

export default memo(PriceRangeSlider);