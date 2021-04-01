import classNames from "classnames";
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

import "./Slider.scss";

interface SliderProps {
  /** Mobile first approach:
   *
   * Key will be the breaking point, and the value number of slides while screen is
   * equal or higher then the key
   *
   * example:
   * {
   *   768: 2,
   *   1280: 3
   * }
   */
  responsive: Record<number, number>;
}

type Operator = "prev" | "next";

export const Slider: React.FC<SliderProps> = ({ responsive, children }) => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const [moveSteper, setMoveSteper] = useState(0);
  const [activeSlides, setActiveSlides] = useState(1);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const slidesCount = React.Children.count(children);

  const resolveActiveSlides = useCallback(() => {
    const windowWidth = window.innerWidth;
    const breakPoints = Object.keys(responsive);
    if (Number(breakPoints[0]) > windowWidth) {
      setActiveSlides(1);

      return;
    }

    breakPoints.forEach(point => {
      if (windowWidth >= Number(point)) {
        setActiveSlides(responsive[Number(point)]);
      }
    });
  }, [responsive]);

  const init = useCallback(() => {
    resolveActiveSlides();

    const moveStep = sliderContainerRef.current
      ? sliderContainerRef.current.offsetWidth / activeSlides
      : 0;

    setMoveSteper(moveStep);

    setCurrentTranslate(0);
  }, [activeSlides, resolveActiveSlides]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const resize$ = fromEvent(window, "resize")
      .pipe(debounceTime(500))
      .subscribe(() => init());

    return () => resize$.unsubscribe();
  }, [init]);

  const isDisabledButton: Record<Operator, boolean> = {
    prev: currentTranslate >= 0,
    next: currentTranslate === -(slidesCount - activeSlides) * moveSteper,
  };

  const moveTrack = (operator: Operator) => {
    if (isDisabledButton[operator]) {
      return;
    }

    const newValue =
      operator === "next" ? currentTranslate - moveSteper : currentTranslate + moveSteper;

    setCurrentTranslate(newValue);
  };

  const itemStyle: CSSProperties = {
    flex: `0 0 ${moveSteper}px`,
  };

  const trackTranslate: CSSProperties = {
    transform: `translate(${currentTranslate}px, 0)`,
  };

  return (
    <div className="Slider">
      <button
        onClick={() => moveTrack("prev")}
        className={classNames(
          "Slider__button Slider__button--left",
          isDisabledButton.prev && "Slider__button--hidden"
        )}
      >
        <span className="Slider__icon Slider__icon--left" />
      </button>

      <div ref={sliderContainerRef} className="Slider__container">
        <div style={trackTranslate} className="Slider__track">
          <ul className="Slider__list">
            {React.Children.map(children, (child, index) => (
              <li style={itemStyle} key={index} className="Slider__item">
                {child}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => moveTrack("next")}
        className={classNames(
          "Slider__button Slider__button--right",
          isDisabledButton.next && "Slider__button--hidden"
        )}
      >
        <span className="Slider__icon Slider__icon--right" />
      </button>
    </div>
  );
};
