/*
 * Copyright 2015-2016 Imply Data, Inc.
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

import { $ } from "plywood";
import { MANIFESTS } from "../../manifests/index";
import { DataCubeFixtures } from "../data-cube/data-cube.fixtures";
import { CollectionTile, CollectionTileContext, CollectionTileJS } from "./collection-tile";

export class CollectionTileFixtures {
  public static testOneJS(): CollectionTileJS {
    return {
      name: "test1",
      title: "Test One",
      description: "I like testing",
      group: "Tests",
      dataCube: "wiki",
      essence: {
        visualization: "totals",
        timezone: "Etc/UTC",
        filter: {
          op: "literal",
          value: true
        },
        pinnedDimensions: ["articleName"],
        pinnedSort: "count",
        singleMeasure: "count",
        selectedMeasures: ["count"],
        splits: []
      }
    };
  }

  public static testTwoJS(): CollectionTileJS {
    return {
      name: "test2",
      title: "Test Two",
      description: "I like testing",
      group: "Tests",
      dataCube: "wiki",
      essence: {
        visualization: "totals",
        timezone: "Etc/UTC",
        filter: $("time").overlap(new Date("2015-01-01Z"), new Date("2016-01-01Z")).toJS(),
        pinnedDimensions: [],
        singleMeasure: "count",
        selectedMeasures: ["count"],
        splits: []
      }
    };
  }

  static getContext(): CollectionTileContext {
    return {
      dataCubes: [DataCubeFixtures.wiki()],
      visualizations: MANIFESTS
    };
  }

  static testOne() {
    return CollectionTile.fromJS(CollectionTileFixtures.testOneJS(), CollectionTileFixtures.getContext());
  }

  static testTwo() {
    return CollectionTile.fromJS(CollectionTileFixtures.testTwoJS(), CollectionTileFixtures.getContext());
  }
}