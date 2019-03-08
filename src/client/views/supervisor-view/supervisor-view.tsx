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

import * as React from "react";
import { Customization } from "../../../common/models/customization/customization";
import { DataCube } from "../../../common/models/data-cube/data-cube";
import { User } from "../../../common/models/user/user";
import { Fn } from "../../../common/utils/general/general";
import { ClearableInput } from "../../components/clearable-input/clearable-input";
import { SvgIcon } from "../../components/svg-icon/svg-icon";
import { STRINGS } from "../../config/constants";
import filterDataCubes from "../../utils/data-cubes-filter/data-cubes-filter";
import { SupervisorHeaderBar } from "./supervisor-header-bar/supervisor-header-bar";
import "./supervisor-view.scss";

export interface SupervisorViewProps {
  dataCubes?: DataCube[];
  user?: User;
  onNavClick?: Fn;
  onOpenAbout: Fn;
  customization?: Customization;
}

export interface SupervisorViewState {
  supervisors: any;
  error?: string;
}

function goToSettings() {
  window.location.hash = "#settings";
}

export class SupervisorView extends React.Component<SupervisorViewProps, SupervisorViewState> {

  componentDidMount() {
    this.fetchSupervisors()
      .then(({ supervisors }) => {
        this.setState({ supervisors });
      })
      .catch(() => {
        this.setState({ error: "Couldn't fetch supervisors" });
      });
  }

  fetchSupervisors() {
    return fetch("/supervisor")
      .then(response => response.json());
  }

  renderSettingsIcon() {
    const { user } = this.props;
    if (!user || !user.allow["settings"]) return null;

    return <div className="icon-button" onClick={goToSettings}>
      <SvgIcon svg={require("../../icons/full-settings.svg")}/>
    </div>;
  }

  renderSupervisor({ id, spec }: any): JSX.Element {
    return <li key={id}>{id}</li>;
  }

  renderSupervisors(): JSX.Element {
    if (this.state && this.state.supervisors) {
      const { supervisors } = this.state;

      if (supervisors.length === 0) {
        const message = STRINGS.noDataSupervisors;
        return <div className="supervisor__message">{message}</div>;
      }
      return <ul className="supervisor__container">{supervisors.map(this.renderSupervisor)}</ul>;
    }
    return null;
  }

  render() {
    const { user, onNavClick, onOpenAbout, customization } = this.props;
    // const { query } = this.state;

    return <div className="home-view">
      <SupervisorHeaderBar
        user={user}
        onNavClick={onNavClick}
        customization={customization}
        title={STRINGS.home}
      >
        <button className="text-button" onClick={onOpenAbout}>
          {STRINGS.infoAndFeedback}
        </button>
        {this.renderSettingsIcon()}
      </SupervisorHeaderBar>

      <div className="container">
        <div className="supervisor">
          {this.renderSupervisors()}
        </div>
      </div>
    </div>;
  }
}
