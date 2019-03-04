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

import { Response, Router } from "express";
import * as request from "request-promise-native";
import { LOGGER } from "../../../common/logger/logger";
import { Cluster } from "../../../common/models/cluster/cluster";
import { SwivRequest } from "../../utils/general/general";

let router = Router();

router.get("/", (req: SwivRequest, res: Response) => {
  req
    .getSettings()
    .then(appSettings => appSettings.clusters)
    .then(checkClusters)
    .then(clusterHealths => emitHealthStatus(clusterHealths, res))
    .catch(reason => {
      LOGGER.log(`Readiness check error: ${reason.message}`);
      res.status(unhealthyHttpStatus).send({ status: ClusterHealthStatus.unhealthy, message: reason.message });
    });
});

const unhealthyHttpStatus = 503;
const healthyHttpStatus = 200;

enum ClusterHealthStatus {
  healthy = "healthy",
  unhealthy = "unhealthy"
}

const statusToHttpStatusMap: { [status in ClusterHealthStatus]: number } = {
  healthy: healthyHttpStatus,
  unhealthy: unhealthyHttpStatus
};

interface ClusterHealth {
  url: string;
  status: ClusterHealthStatus;
  message: string;
}

const checkClusters = (clusters: Cluster[]): Promise<ClusterHealth[]> => {
  const promises = clusters
    .filter(cluster => (cluster.type === "druid"))
    .map(checkDruidCluster);

  return Promise.all(promises);
};

const checkDruidCluster = (cluster: Cluster): Promise<ClusterHealth> => {
  const { url } = cluster;
  const loadStatusUrl = `${url}/druid/broker/v1/loadstatus`;

  return request
    .get(loadStatusUrl, { json: true, timeout: cluster.healthCheckTimeout })
    .promise()
    .then(loadStatus => {
      const { inventoryInitialized } = loadStatus;

      if (inventoryInitialized) {
        return { url, status: ClusterHealthStatus.healthy, message: "" };
      } else {
        return { url, status: ClusterHealthStatus.unhealthy, message: "inventory not initialized" };
      }
    })
    .catch(reason => {
      let reasonMessage: string;
      if (reason != null && reason instanceof Error) {
        reasonMessage = reason.message;
      }
      return { url, status: ClusterHealthStatus.unhealthy, message: `connection error: '${reasonMessage}'` };
    });
};

const emitHealthStatus = (clusterHealths: ClusterHealth[], response: Response) => {
  const unhealthyClusters = clusterHealths.filter(({ status }) => status === ClusterHealthStatus.unhealthy);
  unhealthyClusters.forEach(({ message, url }: ClusterHealth) => {
    LOGGER.log(`Unhealthy cluster url: ${url}. Message: ${message}`);
  });

  const isSomeUnhealthy = unhealthyClusters.length > 0;
  const overallHealthStatus = isSomeUnhealthy ? ClusterHealthStatus.unhealthy : ClusterHealthStatus.healthy;

  const httpState = statusToHttpStatusMap[overallHealthStatus];

  response.status(httpState).send({ status: overallHealthStatus, clusters: clusterHealths });
};

export = router;