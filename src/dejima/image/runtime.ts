/* tslint:disable */
/* eslint-disable */
/**
 * 物件画像API
 * <!-- この文書はOpenAPIの description に埋め込まれて利用されることが想定されている。 -->  ## 想定利用ケースとAPIが提供する機能  物件を広告するホームページやスマホアプリでの利用を想定した機能を提供する。 具体例として以下のような利用を想定している。  * 物件詳細画面のように単一の物件に関連する画像をまとめて取得する場合 * 物件一覧画面のように多数の物件の一部の画像(外観写真や間取り図)のサムネイルを取得する場合  これらに対応して以下の３つの機能を実装している。  * 物件を指定して、その物件に関連する画像メタデータを取得する * 複数の物件を指定して、関連するすべての画像メタデータをまとめて取得する * 画像ファイルを（必要ならば）縮小して取得する  ## リソース補足  ### 画像種別（kind）について  画像を特定するための情報。 1つの物件に紐づく画像の中では画像種別はユニークになっており、 いい物件Oneで画像を登録したときの「登録位置」に応じて決まる。  賃貸物件（rent）と売買物件（sale）で共通の画像種別が用いられる。 ただし、どちらかにしか用いられない画像種別も存在する。  具体的な画像種別と対応するコード値は以下の表の通りである。 連番の部分については「〜」で省略されている。  | kind | kind_code | rent | sale | | :--- | :-------- | :--- | :--- | | 間取り | 1 | ○ | | | 玄関 | 2 | ○ | | | リビング | 3 | ○ | | | キッチン | 4 | ○ | | | ベッドルーム | 5 | ○ | | | ベッドルーム | 6 | ○ | | | ベランダ | 7 | ○ | | | レインズ用チラシ画像 | 8 | ○ | ○ | | チラシ | 9 | ○ | ○ | | 外観 | 10 | ○ | ○ | | 地図 | 11 | ○ | | | ランドマーク | 12 | ○ | | | その他内観画像1～6 | 13〜18 | ○ | | | その他外観画像1～6 | 19〜24 | ○ | | | その他内観画像7～42 | 25〜60 | ○ | | | 建物パノラマ画像1～5 | p1〜p5 | ○ | ○ | | 区画パノラマ画像1～5 | p6〜p10 | ○ | ○ | | 周辺施設画像1～ | i1〜 | ○ | ○ | | 売主コメント1～ | u1〜 | | ○ | | 構造・設備1～ | k1〜 | | ○ | | その他画像 | 99 | | ○ |  ### 画像カテゴリー（category）について  補助的な画像についての情報。 賃貸物件、売買物件、周辺施設画像の計３グループが存在する。 画像カテゴリーがnullのこともある。  #### 賃貸物件（rent）の category 一覧  ```text 間取り、玄関、リビング、キッチン、ベッドルーム、風呂画像、ベランダ、レインズ用チラシ画像、チラシ、外観、地図、その他、エントランス、ロビー、駐車場、その他共有部分、その他部屋・スペース、トイレ、洗面所、収納、庭、セキュリティ、その他設備、眺望、内装、子供部屋、地図（共通）、ダイニング、洋室、和室、ロフト、屋上、倉庫、周辺環境 ```  #### 売買物件（sale）の category 一覧  ```text 間取図・土地図、現地写真、内観写真（その他）、同仕様写真（外観）、同仕様写真（その他内観）、完成予想図（外観）、完成予想図（内観）、眺望写真、造成完了予想図、建物プラン例（その他）、共用部写真（その他）、現地写真（庭）、現地写真（玄関）、現地写真（バルコニー）、現地写真（駐車場）、現地写真（前面道路含む現地写真）、現地写真（その他）、モデルルーム写真、モデルハウス写真、展示場／ショウルーム、内観写真（リビング）、内観写真（浴室）、内観写真（キッチン）、内観写真（リビング以外の居室）、内観写真（トイレ）、内観写真（洗面台・洗面所）、内観写真（収納）、共用部写真（エントランス）、共用部写真（ロビー）、共用部写真（駐車場）、区画図、土地図＋建物プラン例、分譲済街並み写真、航空写真、高台写真、同仕様写真（リビング）、同仕様写真（浴室）、同仕様写真（キッチン）、街並完成予想図、建物プラン例（外観写真）、建物プラン例（内観写真）、建物プラン例（パース・外観）、建物プラン例（パース・内観）、建物プラン例（間取り図）、その他、全体区画図、現地案内図、交通アクセス図、路線図、内観写真（内装）、内観写真（子供部屋）、内観写真（寝室）、設備、発電・温水設備、冷暖房・空調設備、防犯設備、その他設備、構造・工法・仕様、駅、公園、高校・高専、中学校、小学校、幼稚園・保育園、スーパー、周辺の街並み、ショッピングセンター、コンビニ、ドラッグストア、ホームセンター、病院、郵便局、役所、図書館、銀行、警察署・交番、その他環境写真、ベッドルーム、ダイニング、洋室、和室、ロフト、屋上、倉庫 ```  #### 画像種別（kind）が周辺施設画像のときの category 一覧  ```text 総合病院、内科、小児科、小学校、中学校、幼稚園、保育所、公園、スーパー、コンビ二、ショッピング施設、公共施設、海または川、高速道路入り口、コインランドリー、ランドマーク、郵便局、銀行、レストラン、その他、ドラッグストア、ホームセンター、高校・高専、役所、図書館、警察署・交番、駅、周辺の街並み、商店街、歯科、大学・短大、専門学校、インターチェンジ ```  ###  媒体コード（baitai_code）について  「媒体」とはいい物件Oneからデータを出向する先のサービスの総称である。 具体的にはSUUMO賃貸やレインズ売買、貴社HP等を指す。  いい物件Oneでは、媒体毎に画像を出稿する/しないを制限することができる。  画像を登録した直後は全媒体に出稿する状態になっている。 その状態から、画像毎に出稿禁止の設定ができる。 パノラマ画像を登録した直後は出稿しない媒体も存在するような設定になっている。  いい物件Oneで画像出稿禁止に設定されていた場合、画像メタデータ取得時にサーバでフィルターされることがある。 具体的に指定するコード値については別途補足資料参照。  ## コンテンツの更新タイミング  当APIではコンテンツキャッシュ（CDN）を利用している。  いい物件Oneで募集画像を更新してから当APIのレスポンスに反映されるまでにはタイムラグが存在し、 画像メタデータの取得は最大10分程度、画像データの取得は長期にわたって更新されないことがある。  画像メタデータに含まれる画像URL（ `url` ）は画像の更新に追従して URL を更新する仕組みがある。 画像URLを直接埋め込むのではなく、 画像メタデータを取得してから画像URLを動的に埋め込むことでキャシュを回避する使い方が想定されている。  ## オリジン間リソース共有 (CORS)  * ブラウザ上で稼働する JavaScript から呼び出し可能で、SPAでも利用可能 * preflight 用に OPTIONS を許可 * 基本的に `Access-Control-Allow-Origin: *` で応答するため、どのドメインからでも利用可能
 *
 * The version of the OpenAPI document: 2.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export const BASE_PATH = 'http://localhost'.replace(/\/+$/, '');

const isBlob = (value: any) =>
  typeof Blob !== 'undefined' && value instanceof Blob;

/**
 * This is the base class for all generated API classes.
 */
export class BaseAPI {
  private middleware: Middleware[];

  constructor(protected configuration = new Configuration()) {
    this.middleware = configuration.middleware;
  }

  withMiddleware<T extends BaseAPI>(this: T, ...middlewares: Middleware[]) {
    const next = this.clone<T>();
    next.middleware = next.middleware.concat(...middlewares);
    return next;
  }

  withPreMiddleware<T extends BaseAPI>(
    this: T,
    ...preMiddlewares: Array<Middleware['pre']>
  ) {
    const middlewares = preMiddlewares.map((pre) => ({ pre }));
    return this.withMiddleware<T>(...middlewares);
  }

  withPostMiddleware<T extends BaseAPI>(
    this: T,
    ...postMiddlewares: Array<Middleware['post']>
  ) {
    const middlewares = postMiddlewares.map((post) => ({ post }));
    return this.withMiddleware<T>(...middlewares);
  }

  protected async request(context: RequestOpts): Promise<Response> {
    const { url, init } = this.createFetchParams(context);
    const response = await this.fetchApi(url, init);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response;
  }

  private createFetchParams(context: RequestOpts) {
    let url = this.configuration.basePath + context.path;
    if (
      context.query !== undefined &&
      Object.keys(context.query).length !== 0
    ) {
      // only add the querystring to the URL if there are query parameters.
      // this is done to avoid urls ending with a "?" character which buggy webservers
      // do not handle correctly sometimes.
      url += '?' + this.configuration.queryParamsStringify(context.query);
    }
    const body =
      context.body instanceof FormData ||
      context.body instanceof URLSearchParams ||
      isBlob(context.body)
        ? context.body
        : JSON.stringify(context.body);

    const headers = Object.assign(
      {},
      this.configuration.headers,
      context.headers
    );
    const init = {
      method: context.method,
      headers: headers,
      body,
      credentials: this.configuration.credentials,
    };
    return { url, init };
  }

  private fetchApi = async (url: string, init: RequestInit) => {
    let fetchParams = { url, init };
    for (const middleware of this.middleware) {
      if (middleware.pre) {
        fetchParams =
          (await middleware.pre({
            fetch: this.fetchApi,
            ...fetchParams,
          })) || fetchParams;
      }
    }
    let response = await this.configuration.fetchApi(
      fetchParams.url,
      fetchParams.init
    );
    for (const middleware of this.middleware) {
      if (middleware.post) {
        response =
          (await middleware.post({
            fetch: this.fetchApi,
            url,
            init,
            response: response.clone(),
          })) || response;
      }
    }
    return response;
  };

  /**
   * Create a shallow clone of `this` by constructing a new instance
   * and then shallow cloning data members.
   */
  private clone<T extends BaseAPI>(this: T): T {
    const constructor = this.constructor as any;
    const next = new constructor(this.configuration);
    next.middleware = this.middleware.slice();
    return next;
  }
}

export class RequiredError extends Error {
  name: 'RequiredError' = 'RequiredError';
  constructor(public field: string, msg?: string) {
    super(msg);
  }
}

export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
};

export type FetchAPI = WindowOrWorkerGlobalScope['fetch'];

export interface ConfigurationParameters {
  basePath?: string; // override base path
  fetchApi?: FetchAPI; // override for fetch implementation
  middleware?: Middleware[]; // middleware to apply before/after fetch requests
  queryParamsStringify?: (params: HTTPQuery) => string; // stringify function for query strings
  username?: string; // parameter for basic security
  password?: string; // parameter for basic security
  apiKey?: string | ((name: string) => string); // parameter for apiKey security
  accessToken?: string | ((name?: string, scopes?: string[]) => string); // parameter for oauth2 security
  headers?: HTTPHeaders; //header params we want to use on every request
  credentials?: RequestCredentials; //value for the credentials param we want to use on each request
}

export class Configuration {
  constructor(
    private configuration: ConfigurationParameters = {
      basePath: 'https://image-nightly.stg.es-e-bukken.jp',
      apiKey: 'ehk02Zyl76qCuCxzhNVfdLdM51FAa5uRt0TTaZHrD3wT8L3txB',
    }
  ) {}

  get basePath(): string {
    return this.configuration.basePath != null
      ? this.configuration.basePath
      : BASE_PATH;
  }

  get fetchApi(): FetchAPI {
    return this.configuration.fetchApi || window.fetch.bind(window);
  }

  get middleware(): Middleware[] {
    return this.configuration.middleware || [];
  }

  get queryParamsStringify(): (params: HTTPQuery) => string {
    return this.configuration.queryParamsStringify || querystring;
  }

  get username(): string | undefined {
    return this.configuration.username;
  }

  get password(): string | undefined {
    return this.configuration.password;
  }

  get apiKey(): ((name: string) => string) | undefined {
    const apiKey = this.configuration.apiKey;
    if (apiKey) {
      return typeof apiKey === 'function' ? apiKey : () => apiKey;
    }
    return undefined;
  }

  get accessToken(): ((name: string, scopes?: string[]) => string) | undefined {
    const accessToken = this.configuration.accessToken;
    if (accessToken) {
      return typeof accessToken === 'function'
        ? accessToken
        : () => accessToken;
    }
    return undefined;
  }

  get headers(): HTTPHeaders | undefined {
    return this.configuration.headers;
  }

  get credentials(): RequestCredentials | undefined {
    return this.configuration.credentials;
  }
}

export type Json = any;
export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';
export type HTTPHeaders = { [key: string]: string };
export type HTTPQuery = {
  [key: string]:
    | string
    | number
    | null
    | boolean
    | Array<string | number | null | boolean>
    | HTTPQuery;
};
export type HTTPBody = Json | FormData | URLSearchParams;
export type ModelPropertyNaming =
  | 'camelCase'
  | 'snake_case'
  | 'PascalCase'
  | 'original';

export interface FetchParams {
  url: string;
  init: RequestInit;
}

export interface RequestOpts {
  path: string;
  method: HTTPMethod;
  headers: HTTPHeaders;
  query?: HTTPQuery;
  body?: HTTPBody;
}

export function exists(json: any, key: string) {
  const value = json[key];
  return value !== null && value !== undefined;
}

export function querystring(params: HTTPQuery, prefix: string = ''): string {
  return Object.keys(params)
    .map((key) => {
      const fullKey = prefix + (prefix.length ? `[${key}]` : key);
      const value = params[key];
      if (value instanceof Array) {
        const multiValue = value
          .map((singleValue) => encodeURIComponent(String(singleValue)))
          .join(`&${encodeURIComponent(fullKey)}=`);
        return `${encodeURIComponent(fullKey)}=${multiValue}`;
      }
      if (value instanceof Object) {
        return querystring(value as HTTPQuery, fullKey);
      }
      return `${encodeURIComponent(fullKey)}=${encodeURIComponent(
        String(value)
      )}`;
    })
    .filter((part) => part.length > 0)
    .join('&');
}

export function mapValues(data: any, fn: (item: any) => any) {
  return Object.keys(data).reduce(
    (acc, key) => ({ ...acc, [key]: fn(data[key]) }),
    {}
  );
}

export function canConsumeForm(consumes: Consume[]): boolean {
  for (const consume of consumes) {
    if ('multipart/form-data' === consume.contentType) {
      return true;
    }
  }
  return false;
}

export interface Consume {
  contentType: string;
}

export interface RequestContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
}

export interface ResponseContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
  response: Response;
}

export interface Middleware {
  pre?(context: RequestContext): Promise<FetchParams | void>;
  post?(context: ResponseContext): Promise<Response | void>;
}

export interface ApiResponse<T> {
  raw: Response;
  value(): Promise<T>;
}

export interface ResponseTransformer<T> {
  (json: any): T;
}

export class JSONApiResponse<T> {
  constructor(
    public raw: Response,
    private transformer: ResponseTransformer<T> = (jsonValue: any) => jsonValue
  ) {}

  async value(): Promise<T> {
    return this.transformer(await this.raw.json());
  }
}

export class VoidApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<void> {
    return undefined;
  }
}

export class BlobApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<Blob> {
    return await this.raw.blob();
  }
}

export class TextApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<string> {
    return await this.raw.text();
  }
}
