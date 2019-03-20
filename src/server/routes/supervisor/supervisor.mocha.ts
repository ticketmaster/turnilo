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

import * as bodyParser from "body-parser";
import * as express from "express";
import { Express } from "express";
import * as http from "http";
import * as supertest from "supertest";
import { AppSettingsFixtures } from "../../../common/models/app-settings/app-settings.fixtures";
import { supervisorRouter } from "./supervisor";

// describe("url shortener", () => {
//   let app: Express;
//   let server: http.Server;

//   describe("with succesful shortener", () => {
//     before(done => {
//       app = express();
//       app.use(shortenPath, shortenRouter(settingsGetterFactory(SuccessUrlShortenerJS)));
//       server = app.listen(0, done);
//     });

//     after(done => {
//       server.close(done);
//     });

//     it("should shorten url", (testComplete: any) => {
//       callShortener(app)
//         .expect("Content-Type", "application/json; charset=utf-8")
//         .expect(200)
//         .expect({ shortUrl: "http://foobar" }, testComplete);
//     });
//   });

//   describe("without failing shortener", () => {
//     before(done => {
//       app = express();
//       app.use(shortenPath, shortenRouter(settingsGetterFactory(FailUrlShortenerJS)));
//       app.use(bodyParser.json());
//       server = app.listen(0, done);
//     });

//     after(done => {
//       server.close(done);
//     });

//     it("should return error", (testComplete: any) => {
//       callShortener(app)
//         .expect("Content-Type", "application/json; charset=utf-8")
//         .expect(500)
//         .expect({ error: "could not shorten url", message: "error message" }, testComplete);
//     });
//   });
// });
