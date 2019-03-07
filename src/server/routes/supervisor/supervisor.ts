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

import { Request, Response, Router } from "express";
import * as request from "request-promise-native";
import { SettingsGetter } from "../../utils/settings-manager/settings-manager";

export function supervisorRouter(settingsGetter: SettingsGetter) {

  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const { url } = req.query;
    try {
      const settings = await settingsGetter();
      // const host = settings.overlord.host;
      res.json({
        supervisors: [
          {
              "id": "mpe_orders_11022019",
              "spec": {
                  "dataSchema": {
                      "dataSource": "mpe_orders_11022019",
                      "parser": {
                          "type": "avro_stream",
                          "avroBytesDecoder": {
                              "type": "schema_registry",
                              "url": "http://sr.cf.prd349.prod3.datasciences.tmcs:8081",
                              "capacity": 100
                          },
                          "parseSpec": {
                              "format": "avro",
                              "timestampSpec": {
                                  "format": "iso",
                                  "column": "datetime"
                              },
                              "dimensionsSpec": {
                                  "dimensions": [
                                      "event_id",
                                      "order_id",
                                      "session_id",
                                      "seller_provider_id"
                                  ],
                                  "dimensionExclusions": []
                              }
                          }
                      },
                      "metricsSpec": [
                          {
                              "type": "count",
                              "name": "orders"
                          },
                          {
                              "type": "doubleSum",
                              "name": "fee_amount",
                              "fieldName": "fee_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "buyer_fee_amount",
                              "fieldName": "buyer_fee_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "list_amount",
                              "fieldName": "list_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "total_amount",
                              "fieldName": "total_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "seller_fee",
                              "fieldName": "seller_fee",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "markup_amount",
                              "fieldName": "markup_amount",
                              "expression": null
                          }
                      ],
                      "granularitySpec": {
                          "type": "uniform",
                          "segmentGranularity": "HOUR",
                          "queryGranularity": {
                              "type": "none"
                          },
                          "rollup": false,
                          "intervals": null
                      },
                      "transformSpec": {
                          "filter": null,
                          "transforms": [
                              {
                                  "type": "expression",
                                  "name": "fee_amount",
                                  "expression": "cast(fee_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "buyer_fee_amount",
                                  "expression": "cast(buyer_fee_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "list_amount",
                                  "expression": "cast(list_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "total_amount",
                                  "expression": "cast(total_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "seller_fee",
                                  "expression": "cast(seller_fee,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "markup_amount",
                                  "expression": "cast(markup_amount,'DOUBLE')"
                              }
                          ]
                      }
                  },
                  "tuningConfig": {
                      "type": "kafka",
                      "maxRowsInMemory": 1000000,
                      "maxBytesInMemory": 0,
                      "maxRowsPerSegment": 5000000,
                      "maxTotalRows": null,
                      "intermediatePersistPeriod": "PT10M",
                      "basePersistDirectory": "/opt/imply/var/tmp/1549895587236-0",
                      "maxPendingPersists": 0,
                      "indexSpec": {
                          "bitmap": {
                              "type": "concise"
                          },
                          "dimensionCompression": "lz4",
                          "metricCompression": "lz4",
                          "longEncoding": "longs"
                      },
                      "buildV9Directly": true,
                      "reportParseExceptions": false,
                      "handoffConditionTimeout": 0,
                      "resetOffsetAutomatically": false,
                      "segmentWriteOutMediumFactory": null,
                      "workerThreads": null,
                      "chatThreads": null,
                      "chatRetries": 8,
                      "httpTimeout": "PT10S",
                      "shutdownTimeout": "PT80S",
                      "offsetFetchPeriod": "PT30S",
                      "intermediateHandoffPeriod": "P2147483647D",
                      "logParseExceptions": false,
                      "maxParseExceptions": 2147483647,
                      "maxSavedParseExceptions": 0
                  },
                  "ioConfig": {
                      "topic": "mpe_orders_11022019",
                      "replicas": 1,
                      "taskCount": 1,
                      "taskDuration": "PT3600S",
                      "consumerProperties": {
                          "bootstrap.servers": "kf0001.cf.prd349.prod3.datasciences.tmcs:9092",
                          "auto.offset.reset": "earliest",
                          "client.id": "mpe_orders-imply-consumer-11022019",
                          "group.id": "mpe_orders-imply-group-11022019"
                      },
                      "startDelay": "PT5S",
                      "period": "PT30S",
                      "useEarliestOffset": true,
                      "completionTimeout": "PT1800S",
                      "lateMessageRejectionPeriod": null,
                      "earlyMessageRejectionPeriod": null,
                      "skipOffsetGaps": false
                  },
                  "context": null,
                  "suspended": false
              }
          },
          {
              "id": "mpe_buyer_fee_pred_conv_join_11022019",
              "spec": {
                  "dataSchema": {
                      "dataSource": "mpe_buyer_fee_pred_conv_join_11022019",
                      "parser": {
                          "type": "avro_stream",
                          "avroBytesDecoder": {
                              "type": "schema_registry",
                              "url": "http://sr.cf.prd349.prod3.datasciences.tmcs:8081",
                              "capacity": 100
                          },
                          "parseSpec": {
                              "format": "avro",
                              "timestampSpec": {
                                  "format": "iso",
                                  "column": "pred_dttm"
                              },
                              "dimensionsSpec": {
                                  "dimensions": [
                                      "action",
                                      "event_id",
                                      "fee_percent",
                                      "model_type",
                                      "is_explore",
                                      "order_id",
                                      "context",
                                      "probability",
                                      "fee_type",
                                      "session_id",
                                      "convert_dttm",
                                      "user_channel"
                                  ],
                                  "dimensionExclusions": []
                              }
                          }
                      },
                      "metricsSpec": [
                          {
                              "type": "count",
                              "name": "Events"
                          },
                          {
                              "type": "doubleSum",
                              "name": "List Amount",
                              "fieldName": "list_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "Fee Amount",
                              "fieldName": "fee_amount",
                              "expression": null
                          },
                          {
                              "type": "doubleSum",
                              "name": "Total Amount",
                              "fieldName": "total_amount",
                              "expression": null
                          }
                      ],
                      "granularitySpec": {
                          "type": "uniform",
                          "segmentGranularity": "HOUR",
                          "queryGranularity": {
                              "type": "none"
                          },
                          "rollup": false,
                          "intervals": null
                      },
                      "transformSpec": {
                          "filter": null,
                          "transforms": [
                              {
                                  "type": "expression",
                                  "name": "list_amount",
                                  "expression": "cast(list_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "total_amount",
                                  "expression": "cast(total_amount,'DOUBLE')"
                              },
                              {
                                  "type": "expression",
                                  "name": "fee_amount",
                                  "expression": "cast(fee_amount,'DOUBLE')"
                              }
                          ]
                      }
                  },
                  "tuningConfig": {
                      "type": "kafka",
                      "maxRowsInMemory": 1000000,
                      "maxBytesInMemory": 0,
                      "maxRowsPerSegment": 5000000,
                      "maxTotalRows": null,
                      "intermediatePersistPeriod": "PT10M",
                      "basePersistDirectory": "/opt/imply/var/tmp/1549894391932-0",
                      "maxPendingPersists": 0,
                      "indexSpec": {
                          "bitmap": {
                              "type": "concise"
                          },
                          "dimensionCompression": "lz4",
                          "metricCompression": "lz4",
                          "longEncoding": "longs"
                      },
                      "buildV9Directly": true,
                      "reportParseExceptions": false,
                      "handoffConditionTimeout": 0,
                      "resetOffsetAutomatically": false,
                      "segmentWriteOutMediumFactory": null,
                      "workerThreads": null,
                      "chatThreads": null,
                      "chatRetries": 8,
                      "httpTimeout": "PT10S",
                      "shutdownTimeout": "PT80S",
                      "offsetFetchPeriod": "PT30S",
                      "intermediateHandoffPeriod": "P2147483647D",
                      "logParseExceptions": false,
                      "maxParseExceptions": 2147483647,
                      "maxSavedParseExceptions": 0
                  },
                  "ioConfig": {
                      "topic": "mpe_buyer_fee_pred_conv_join_11022019",
                      "replicas": 1,
                      "taskCount": 1,
                      "taskDuration": "PT1800S",
                      "consumerProperties": {
                          "bootstrap.servers": "kf0001.cf.prd349.prod3.datasciences.tmcs:9092",
                          "auto.offset.reset": "earliest",
                          "client.id": "mpe_buyer_fee_pred_conv_join_11022019",
                          "group.id": "mpe_buyer_fee_pred_conv_join_11022019"
                      },
                      "startDelay": "PT5S",
                      "period": "PT30S",
                      "useEarliestOffset": true,
                      "completionTimeout": "PT3600S",
                      "lateMessageRejectionPeriod": null,
                      "earlyMessageRejectionPeriod": null,
                      "skipOffsetGaps": true
                  },
                  "context": null,
                  "suspended": false
              }
          }
        ]
      });
    } catch (error) {
      console.log("error:", error.message);
      if (error.hasOwnProperty("stack")) {
        console.log((<any> error).stack);
      }
      res.status(500).send({
        error: "could not get suprvisor",
        message: error.message
      });
    }
  });
  return router;
}
