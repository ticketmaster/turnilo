/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { ConcreteSeries } from "../../../common/models/series/concrete-series";
import { Series } from "../../../common/models/series/series";
import { Stage } from "../../../common/models/stage/stage";
import { Binary, Ternary, Unary } from "../../../common/utils/functional/functional";
import { Fn } from "../../../common/utils/general/general";
import { classNames } from "../../utils/dom/dom";
import { SeriesMenu } from "../series-menu/series-menu";
import { SvgIcon } from "../svg-icon/svg-icon";
import { WithRef } from "../with-ref/with-ref";
import { SERIES_CLASS_NAME } from "./series-tiles";

interface SeriesTileProps {
  item: ConcreteSeries;
  open: boolean;
  style?: React.CSSProperties;
  removeSeries: Unary<Series, void>;
  updateSeries: Binary<Series, Series, void>;
  openSeriesMenu: Unary<Series, void>;
  closeSeriesMenu: Fn;
  dragStart: Ternary<string, Series, React.DragEvent<HTMLElement>, void>;
  containerStage: Stage;
}

export const SeriesTile: React.SFC<SeriesTileProps> = props => {
  const { open, item, style, updateSeries, removeSeries, openSeriesMenu, closeSeriesMenu, dragStart, containerStage } = props;
  const { series, measure } = item;
  const title = item.title();

  const saveSeries = (newSeries: Series) => updateSeries(series, newSeries);
  const remove = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    removeSeries(series);
  };

  return <WithRef>
    {({ ref: openOn, setRef }) => <React.Fragment>
      <div
        className={classNames(SERIES_CLASS_NAME, "measure")}
        draggable={true}
        ref={setRef}
        onClick={() => openSeriesMenu(series)}
        onDragStart={e => dragStart(measure.title, series, e)}
        style={style}>
        <div className="reading">{title}</div>
        <div className="remove" onClick={remove}>
          <SvgIcon svg={require("../../icons/x.svg")} />
        </div>
      </div>
      {open && openOn && <SeriesMenu
        key={series.key()}
        openOn={openOn}
        containerStage={containerStage}
        onClose={closeSeriesMenu}
        initialSeries={series}
        measure={measure}
        saveSeries={saveSeries} />}
    </React.Fragment>}
  </WithRef>;
};
