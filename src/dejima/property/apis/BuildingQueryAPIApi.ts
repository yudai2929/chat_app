/* tslint:disable */
/* eslint-disable */
/**
 * ES 物件API
 * （株）いい生活 が提供予定の 物件情報API のインターフェイス仕様書  いい物件Oneに登録した賃貸物件情報を参照する物件参照API仕様について定める。  ※1: 開発中のため、実際のリリース時の仕様は異なる場合がございます。  ※2: 売買物件に関する仕様に関してはα版であり、今後大きな仕様の見直しを行う可能性がございます。  ## リソース仕様  ### 通信仕様  HTTP/2 および HTTP/1.1 をサポートする。通信はTLSで暗号化されたHTTPSのみを許可する。  ### リクエストヘッダ  リクエストヘッダには以下の指定を必須とする。  | No. | リクエストヘッダのフィールド名 | 指定値 | |:---:|:-------------------------------|:-------| | 1 | Accept | application/json | | 2 | X-Api-Key | 弊社が指定するキー。ご利用のお客様を特定するためのもの。 |  Acceptヘッダには、常にapplication/json を指定する。 これにより、レスポンスがJSONであることを指示する。  ### データフォーマットと文字コード  データフォーマットはJSON、文字コードはUTF-8とする。  ### データ型  通常のJSONの型以外に擬似型としていくつかのデータ型を用意している。 これは、JSON標準では表現しきれないデータや、不動産特有のデータを扱うために定義したもので使用する。 また、ここに記載の無いデータ型については、 OpenAPI Specification (Version 3.0.2) の DataTypes に準拠する。  * [DataTypes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#data-types)   | No. | 型 | 説明 | |:---:|:---|:-----| | 1 | string | JSON標準の文字列 | | 2 | int | JSON標準の整数 | | 3 | float | JSON標準の浮動小数点数 | | 4 | bool | JSON標準の真偽値 | | 5 | datetime | ISO8611フォーマットの日付時刻を表す文字列。YYYY-MM-DDTHH:MM:SS。 <br> 例: 2015-08-26T19:16:03 = 2015年8月26日19時16分03秒 | | 6 | date | ISO8611フォーマットの日付を表す文字列。YYYY-MM-DD。 <br> 例: 2015-08-26 = 2015年8月26日 | | 7 | datejun | 後述 |  #### datejun型  いい生活独自の日付と旬を表すフォーマット。YYYYMMJDD。  * YYYY: 西暦年 * MM: 月。01～12。ただし00とすることにより、年単位までの精度の数字を表現可能。 * J: 旬。1=上旬、2=中旬、3=下旬。 0とすることで月単位までの精度の数字を表現可能。 * DD: 日。01～31。ただし00とすることにより、旬単位までの精度の数字を表現可能。日単位の精度の場合、1～10日までは旬を1、11～20日までは旬を2、21日以降は旬を3と指定する必要がある。 * 例:     * 201900000 = 2019年     * 201901000 = 2019年1月     * 201903100 = 2019年3月上旬     * 201912300 = 2019年12月下旬     * 201906105 = 2019年6月5日     * 201908216 = 2019年8月16日  ## 検索パラメータ  ### OR 検索  パラメータタイプが `array` のキーについては、クエリパラメータで複数指定を行った場合、 指定された値のいずれかに一致する対象を検索する（ OR 検索）。  ex) `?layout_type_code=1&layout_type_code=2`  ### ソート順  `*.order` という名前のパラメータでソート順を指定可能。ascを指定したとき昇順、descを指定したとき降順となる。  ex) `?price.order=desc`  基本的にソート順は一つだけ指定する。
 *
 * The version of the OpenAPI document: 6.1.3
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import {
  Building,
  BuildingFromJSON,
  BuildingToJSON,
  BuildingList,
  BuildingListFromJSON,
  BuildingListToJSON,
  HTTPValidationError,
  HTTPValidationErrorFromJSON,
  HTTPValidationErrorToJSON,
  Order,
  OrderFromJSON,
  OrderToJSON,
} from '../models';

export interface GetBuildingRequest {
  buildingGuid: string;
}

export interface SearchBuildingRequest {
  startIndex?: number;
  itemsPerPage?: number;
  buildingGuid?: Array<string>;
  buildingTypeCode?: Array<number>;
  structureCode?: Array<number>;
  siteAreaFrom?: number;
  siteAreaTo?: number;
  siteAreaOrder?: Order;
  buildingName?: string;
  buildingFurigana?: string;
  prefecture?: string;
  prefectureCode?: Array<number>;
  city?: Array<string>;
  cityCode?: Array<number>;
  town?: Array<string>;
  jisCode?: Array<number>;
  address?: Array<string>;
  customerKey?: Array<number>;
  tatemonoGuid?: Array<string>;
}

/**
 * no description
 */
export class BuildingQueryAPIApi extends runtime.BaseAPI {
  /**
   * building_guidで建物情報を取得する
   * Get Building
   */
  async getBuildingRaw(
    requestParameters: GetBuildingRequest
  ): Promise<runtime.ApiResponse<Building>> {
    if (
      requestParameters.buildingGuid === null ||
      requestParameters.buildingGuid === undefined
    ) {
      throw new runtime.RequiredError(
        'buildingGuid',
        'Required parameter requestParameters.buildingGuid was null or undefined when calling getBuilding.'
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters['X-Api-Key'] = this.configuration.apiKey('X-Api-Key'); // APIKeyHeader authentication
    }

    const response = await this.request({
      path: `/building/building/{building_guid}/`.replace(
        `{${'building_guid'}}`,
        encodeURIComponent(String(requestParameters.buildingGuid))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      BuildingFromJSON(jsonValue)
    );
  }

  /**
   * building_guidで建物情報を取得する
   * Get Building
   */
  async getBuilding(requestParameters: GetBuildingRequest): Promise<Building> {
    const response = await this.getBuildingRaw(requestParameters);
    return await response.value();
  }

  /**
   * 建物一覧を取得する
   * Search Building
   */
  async searchBuildingRaw(
    requestParameters: SearchBuildingRequest
  ): Promise<runtime.ApiResponse<BuildingList>> {
    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.startIndex !== undefined) {
      queryParameters['start_index'] = requestParameters.startIndex;
    }

    if (requestParameters.itemsPerPage !== undefined) {
      queryParameters['items_per_page'] = requestParameters.itemsPerPage;
    }

    if (requestParameters.buildingGuid) {
      queryParameters['building_guid'] = requestParameters.buildingGuid;
    }

    if (requestParameters.buildingTypeCode) {
      queryParameters['building_type_code'] =
        requestParameters.buildingTypeCode;
    }

    if (requestParameters.structureCode) {
      queryParameters['structure_code'] = requestParameters.structureCode;
    }

    if (requestParameters.siteAreaFrom !== undefined) {
      queryParameters['site_area.from'] = requestParameters.siteAreaFrom;
    }

    if (requestParameters.siteAreaTo !== undefined) {
      queryParameters['site_area.to'] = requestParameters.siteAreaTo;
    }

    if (requestParameters.siteAreaOrder !== undefined) {
      queryParameters['site_area.order'] = requestParameters.siteAreaOrder;
    }

    if (requestParameters.buildingName !== undefined) {
      queryParameters['building_name'] = requestParameters.buildingName;
    }

    if (requestParameters.buildingFurigana !== undefined) {
      queryParameters['building_furigana'] = requestParameters.buildingFurigana;
    }

    if (requestParameters.prefecture !== undefined) {
      queryParameters['prefecture'] = requestParameters.prefecture;
    }

    if (requestParameters.prefectureCode) {
      queryParameters['prefecture_code'] = requestParameters.prefectureCode;
    }

    if (requestParameters.city) {
      queryParameters['city'] = requestParameters.city;
    }

    if (requestParameters.cityCode) {
      queryParameters['city_code'] = requestParameters.cityCode;
    }

    if (requestParameters.town) {
      queryParameters['town'] = requestParameters.town;
    }

    if (requestParameters.jisCode) {
      queryParameters['jis_code'] = requestParameters.jisCode;
    }

    if (requestParameters.address) {
      queryParameters['address'] = requestParameters.address;
    }

    if (requestParameters.customerKey) {
      queryParameters['customer_key'] = requestParameters.customerKey;
    }

    if (requestParameters.tatemonoGuid) {
      queryParameters['tatemono_guid'] = requestParameters.tatemonoGuid;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters['X-Api-Key'] = this.configuration.apiKey('X-Api-Key'); // APIKeyHeader authentication
    }

    const response = await this.request({
      path: `/building/building/search/`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      BuildingListFromJSON(jsonValue)
    );
  }

  /**
   * 建物一覧を取得する
   * Search Building
   */
  async searchBuilding(
    requestParameters: SearchBuildingRequest
  ): Promise<BuildingList> {
    const response = await this.searchBuildingRaw(requestParameters);
    return await response.value();
  }
}
