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
      // const settings = await settingsGetter();
      // const host = settings.overlord.host;
      const data = await request
      .get("http://mydruid.com:8081/druid/indexer/v1/supervisor?full", { json: true })
      .promise();

      res.json({
        supervisors: data
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
