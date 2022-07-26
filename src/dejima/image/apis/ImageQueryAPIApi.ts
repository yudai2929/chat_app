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

import * as runtime from '../runtime';
import {
  ErrorResponse,
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  HTTPValidationError,
  HTTPValidationErrorFromJSON,
  HTTPValidationErrorToJSON,
  MetadataResponse,
  MetadataResponseFromJSON,
  MetadataResponseToJSON,
} from '../models';

export interface BulkGetMetadataRentRentListGetRequest {
  propertyKey: string;
  baitaiCode?: number;
  kindCode?: string;
}

export interface BulkGetMetadataSaleSaleListGetRequest {
  propertyKey: string;
  baitaiCode?: number;
  kindCode?: string;
}

export interface GetImageRentRentImgPropertyKeyFilenameGetRequest {
  propertyKey: string;
  filename: string;
  size?: string;
}

export interface GetImageSaleSaleImgPropertyKeyFilenameGetRequest {
  propertyKey: string;
  filename: string;
  size?: string;
}

export interface GetMetadataRentRentPropertyKeyGetRequest {
  propertyKey: string;
  baitaiCode?: number;
  kindCode?: string;
}

export interface GetMetadataSaleSalePropertyKeyGetRequest {
  propertyKey: string;
  baitaiCode?: number;
  kindCode?: string;
}

/**
 * no description
 */
export class ImageQueryAPIApi extends runtime.BaseAPI {
  /**
   * 賃貸物件の画像メタデータをバルクで取得する
   * Bulk Get Metadata Rent
   */
  async bulkGetMetadataRentRentListGetRaw(
    requestParameters: BulkGetMetadataRentRentListGetRequest
  ): Promise<runtime.ApiResponse<Array<MetadataResponse>>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling bulkGetMetadataRentRentListGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.propertyKey !== undefined) {
      queryParameters['property_key'] = requestParameters.propertyKey;
    }

    if (requestParameters.baitaiCode !== undefined) {
      queryParameters['baitai_code'] = requestParameters.baitaiCode;
    }

    if (requestParameters.kindCode !== undefined) {
      queryParameters['kind_code'] = requestParameters.kindCode;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/rent/list/`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(MetadataResponseFromJSON)
    );
  }

  /**
   * 賃貸物件の画像メタデータをバルクで取得する
   * Bulk Get Metadata Rent
   */
  async bulkGetMetadataRentRentListGet(
    requestParameters: BulkGetMetadataRentRentListGetRequest
  ): Promise<Array<MetadataResponse>> {
    const response = await this.bulkGetMetadataRentRentListGetRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * 売買物件の画像メタデータをバルクで取得する
   * Bulk Get Metadata Sale
   */
  async bulkGetMetadataSaleSaleListGetRaw(
    requestParameters: BulkGetMetadataSaleSaleListGetRequest
  ): Promise<runtime.ApiResponse<Array<MetadataResponse>>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling bulkGetMetadataSaleSaleListGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.propertyKey !== undefined) {
      queryParameters['property_key'] = requestParameters.propertyKey;
    }

    if (requestParameters.baitaiCode !== undefined) {
      queryParameters['baitai_code'] = requestParameters.baitaiCode;
    }

    if (requestParameters.kindCode !== undefined) {
      queryParameters['kind_code'] = requestParameters.kindCode;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/sale/list/`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(MetadataResponseFromJSON)
    );
  }

  /**
   * 売買物件の画像メタデータをバルクで取得する
   * Bulk Get Metadata Sale
   */
  async bulkGetMetadataSaleSaleListGet(
    requestParameters: BulkGetMetadataSaleSaleListGetRequest
  ): Promise<Array<MetadataResponse>> {
    const response = await this.bulkGetMetadataSaleSaleListGetRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * 賃貸物件の画像データを取得する  URL構成は変わる可能性がある。 必ず画像メタデータに含まれる `url` を使って画像を取得するべき。
   * Get Image Rent
   */
  async getImageRentRentImgPropertyKeyFilenameGetRaw(
    requestParameters: GetImageRentRentImgPropertyKeyFilenameGetRequest
  ): Promise<runtime.ApiResponse<object>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling getImageRentRentImgPropertyKeyFilenameGet.'
      );
    }

    if (
      requestParameters.filename === null ||
      requestParameters.filename === undefined
    ) {
      throw new runtime.RequiredError(
        'filename',
        'Required parameter requestParameters.filename was null or undefined when calling getImageRentRentImgPropertyKeyFilenameGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.size !== undefined) {
      queryParameters['size'] = requestParameters.size;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/rent/img/{property_key}/{filename}`
        .replace(
          `{${'property_key'}}`,
          encodeURIComponent(String(requestParameters.propertyKey))
        )
        .replace(
          `{${'filename'}}`,
          encodeURIComponent(String(requestParameters.filename))
        ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 賃貸物件の画像データを取得する  URL構成は変わる可能性がある。 必ず画像メタデータに含まれる `url` を使って画像を取得するべき。
   * Get Image Rent
   */
  async getImageRentRentImgPropertyKeyFilenameGet(
    requestParameters: GetImageRentRentImgPropertyKeyFilenameGetRequest
  ): Promise<object> {
    const response = await this.getImageRentRentImgPropertyKeyFilenameGetRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * 売買物件の画像データを取得する  URL構成は変わる可能性がある。 必ず画像メタデータに含まれる `url` を使って画像を取得するべき。
   * Get Image Sale
   */
  async getImageSaleSaleImgPropertyKeyFilenameGetRaw(
    requestParameters: GetImageSaleSaleImgPropertyKeyFilenameGetRequest
  ): Promise<runtime.ApiResponse<object>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling getImageSaleSaleImgPropertyKeyFilenameGet.'
      );
    }

    if (
      requestParameters.filename === null ||
      requestParameters.filename === undefined
    ) {
      throw new runtime.RequiredError(
        'filename',
        'Required parameter requestParameters.filename was null or undefined when calling getImageSaleSaleImgPropertyKeyFilenameGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.size !== undefined) {
      queryParameters['size'] = requestParameters.size;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/sale/img/{property_key}/{filename}`
        .replace(
          `{${'property_key'}}`,
          encodeURIComponent(String(requestParameters.propertyKey))
        )
        .replace(
          `{${'filename'}}`,
          encodeURIComponent(String(requestParameters.filename))
        ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 売買物件の画像データを取得する  URL構成は変わる可能性がある。 必ず画像メタデータに含まれる `url` を使って画像を取得するべき。
   * Get Image Sale
   */
  async getImageSaleSaleImgPropertyKeyFilenameGet(
    requestParameters: GetImageSaleSaleImgPropertyKeyFilenameGetRequest
  ): Promise<object> {
    const response = await this.getImageSaleSaleImgPropertyKeyFilenameGetRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * 賃貸物件の画像メタデータを取得する
   * Get Metadata Rent
   */
  async getMetadataRentRentPropertyKeyGetRaw(
    requestParameters: GetMetadataRentRentPropertyKeyGetRequest
  ): Promise<runtime.ApiResponse<Array<MetadataResponse>>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling getMetadataRentRentPropertyKeyGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.baitaiCode !== undefined) {
      queryParameters['baitai_code'] = requestParameters.baitaiCode;
    }

    if (requestParameters.kindCode !== undefined) {
      queryParameters['kind_code'] = requestParameters.kindCode;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/rent/{property_key}/`.replace(
        `{${'property_key'}}`,
        encodeURIComponent(String(requestParameters.propertyKey))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(MetadataResponseFromJSON)
    );
  }

  /**
   * 賃貸物件の画像メタデータを取得する
   * Get Metadata Rent
   */
  async getMetadataRentRentPropertyKeyGet(
    requestParameters: GetMetadataRentRentPropertyKeyGetRequest
  ): Promise<Array<MetadataResponse>> {
    const response = await this.getMetadataRentRentPropertyKeyGetRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * 売買物件の画像メタデータを取得する
   * Get Metadata Sale
   */
  async getMetadataSaleSalePropertyKeyGetRaw(
    requestParameters: GetMetadataSaleSalePropertyKeyGetRequest
  ): Promise<runtime.ApiResponse<Array<MetadataResponse>>> {
    if (
      requestParameters.propertyKey === null ||
      requestParameters.propertyKey === undefined
    ) {
      throw new runtime.RequiredError(
        'propertyKey',
        'Required parameter requestParameters.propertyKey was null or undefined when calling getMetadataSaleSalePropertyKeyGet.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.baitaiCode !== undefined) {
      queryParameters['baitai_code'] = requestParameters.baitaiCode;
    }

    if (requestParameters.kindCode !== undefined) {
      queryParameters['kind_code'] = requestParameters.kindCode;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/sale/{property_key}/`.replace(
        `{${'property_key'}}`,
        encodeURIComponent(String(requestParameters.propertyKey))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(MetadataResponseFromJSON)
    );
  }

  /**
   * 売買物件の画像メタデータを取得する
   * Get Metadata Sale
   */
  async getMetadataSaleSalePropertyKeyGet(
    requestParameters: GetMetadataSaleSalePropertyKeyGetRequest
  ): Promise<Array<MetadataResponse>> {
    const response = await this.getMetadataSaleSalePropertyKeyGetRaw(
      requestParameters
    );
    return await response.value();
  }
}
