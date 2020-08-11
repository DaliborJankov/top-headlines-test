import classNames from "classnames";
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { NewsThumbnail } from "../NewsThumbnail";

import "./Slider.scss";

interface SliderProps {
  articles: readonly TopHeadlinesArticle[];
  /** Mobile first approach:
   *
   * Key will be the breaking point, and the value number of slides while screen is
   * equal or higher then the key
   *
   * example:
   * {
   *   768: 2,
   *   1280: 3,
   * }
   */
  responsive: Record<number, number>;
}

type Operator = "minus" | "plus";

export const Slider: React.FC<SliderProps> = ({ articles, responsive }) => {
  const SliderContainerRef = useRef<HTMLDivElement | null>(null);
  const [moveSteper, setMoveSteper] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(1);
  const [currentTranslate, setCurrentTranslate] = useState<number>(0);

  const init = useCallback(() => {
    const windowWidth = window.innerWidth;
    const breakPoints = Object.keys(responsive);

    breakPoints.forEach(point => {
      if (windowWidth >= Number(point)) {
        setItemCount(responsive[Number(point)]);
        return;
      }
    });

    const moveStep = SliderContainerRef.current
      ? SliderContainerRef.current.offsetWidth / itemCount
      : 0;

    setMoveSteper(moveStep);
    setCurrentTranslate(0);
  }, [itemCount, responsive]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const resize$ = fromEvent(window, "resize")
      .pipe(debounceTime(500))
      .subscribe(() => init());

    return () => resize$.unsubscribe();
  }, [init]);

  const moveTrack = (operator: Operator) => {
    if (isDisabledButton[operator]()) {
      return;
    }

    const calculate: Record<Operator, (a: number, b: number) => number> = {
      minus: (a: number, b: number) => a - b,
      plus: (a: number, b: number) => a + b,
    } as const;

    const newValue = calculate[operator](currentTranslate, moveSteper);

    setCurrentTranslate(newValue);
  };

  const isDisabledButton: Record<Operator, () => boolean> = {
    minus: () => currentTranslate === -(articles.length - itemCount) * moveSteper,
    plus: () => currentTranslate >= 0,
  } as const;

  const itemStyle: CSSProperties = {
    flex: `0 0 ${moveSteper}px`,
  } as const;

  const trackTranslate: CSSProperties = {
    transform: `translate(${currentTranslate}px, 0)`,
  } as const;

  return (
    <div className="Slider">
      <button
        onClick={() => moveTrack("plus")}
        className={classNames(
          "Slider__button Slider__button--left",
          isDisabledButton["plus"]() && "Slider__button--hidden"
        )}
        disabled={isDisabledButton["plus"]()}
      >
        <span className="Slider__icon Slider__icon--left" />
      </button>
      <div ref={SliderContainerRef} className="Slider__container">
        <div style={trackTranslate} className="Slider__track">
          <ul className="Slider__list">
            {articles.map((article, index: number) => {
              return (
                <li style={itemStyle} key={index} className="Slider__item">
                  <NewsThumbnail {...{ article, index }} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        onClick={() => moveTrack("minus")}
        className={classNames(
          "Slider__button Slider__button--right",
          isDisabledButton["minus"]() && "Slider__button--hidden"
        )}
        disabled={isDisabledButton["minus"]()}
      >
        <span className="Slider__icon Slider__icon--right" />
      </button>
    </div>
  );
};
