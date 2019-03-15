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

import { Class, Instance } from "immutable-class";
import { ImmutableUtils } from "../../utils/immutable-utils/immutable-utils";

export interface OverlordValue {
  host?: string;
}

export interface OverlordJS {
  host?: string;
}

var check: Class<OverlordValue, OverlordJS>;

export class Overlord implements Instance<OverlordValue, OverlordJS> {

  static isOverlord(candidate: any): candidate is Overlord {
    return candidate instanceof Overlord;
  }

  static fromJS(parameters: OverlordJS): Overlord {
    var value: OverlordValue = {
      host: parameters.host
    };

    return new Overlord(value);
  }

  public host: string;

  constructor(parameters: OverlordValue) {
    this.host = parameters.host || null;
  }

  public valueOf(): OverlordValue {
    return {
      host: this.host
    };
  }

  public toJS(): OverlordJS {
    var js: OverlordJS = {
        host: null
    };
    if (this.host) js.host = this.host;
    return js;
  }

  public toJSON(): OverlordJS {
    return this.toJS();
  }

  public toString(): string {
    return `[host: (${this.host})]`;
  }

  public equals(other: Overlord): boolean {
    return Overlord.isOverlord(other) &&
      this.host === other.host;
  }

  public getHost(host: string): string {
    return this.host;
  }

  change(propertyName: string, newValue: any): Overlord {
    return ImmutableUtils.change(this, propertyName, newValue);
  }

  public changeTitle(host: string): Overlord {
    return this.change("host", host);
  }
}

check = Overlord;
