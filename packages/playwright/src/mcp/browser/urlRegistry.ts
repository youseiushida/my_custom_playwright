/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class UrlRegistry {
  private _urlToId: Map<string, string> = new Map();
  private _idToUrl: Map<string, string> = new Map();
  private _counter = 1;

  shorten(url: string): string {
    let id = this._urlToId.get(url);
    if (id)
      return id;
    id = `U${this._counter++}`;
    this._urlToId.set(url, id);
    this._idToUrl.set(id, url);
    return id;
  }

  resolve(id: string): string | undefined {
    return this._idToUrl.get(id);
  }

  /**
   * Replace URLs inside arbitrary text with their short ids.
   * Recognizes common schemes (http, https, file, data, about, chrome-extension).
   */
  shortenInText(text: string): string {
    const urlLike = /(https?:\/\/[^\s)'"<>]+|file:[^\s)'"<>]+|data:[^\s)'"<>]+|about:[^\s)'"<>]+|chrome-extension:[^\s)'"<>]+)/g;
    return text.replace(urlLike, match => this.shorten(match));
  }
}


