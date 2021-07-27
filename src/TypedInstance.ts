import type { Instance, Query, RequestOptions } from 'moysklad'
import type {
  Account,
  Collection,
  CompanyAccountCollectionEndpoint,
  CounterpartyReport,
  DomineEntityCollectionEndpoint,
  DomineEntityEndpoint,
  EntityByMetaType,
  EntityRef,
  Expand,
  ImplementedDocumentsMetaType,
  Meta,
  Patch,
  PrefilledDocument,
  PrefilledDocumentEndpoint
} from 'moysklad-api-model'

export interface QueryWithExpand<T extends string | undefined> extends Query {
  expand?: T
}

export type TypedInstance = {
  //#region GET entity/{Company}/{id}/accounts
  /**
   * `entity/{Company}/{id}/accounts`
   *
   * @param path `entity/{Company}/{id}/accounts`
   * @param query
   * @param options
   */
  GET<P extends CompanyAccountCollectionEndpoint, E extends string | undefined>(
    path: P,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<Expand<Collection<Account>, E>>
  //#endregion

  //#region GET entity/{type}/{id}
  /**
   * `entity/{type}/{id}`
   *
   * @param path `entity/{type}/{id}`
   * @param query
   * @param options
   */
  GET<P extends DomineEntityEndpoint, E extends string | undefined>(
    path: P,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<
    P extends DomineEntityEndpoint<infer M>
      ? Expand<EntityByMetaType[M], E>
      : never
  >
  //#endregion

  //#region GET entity/{type}
  /**
   * `entity/{type}`
   *
   * @param path `entity/{type}`
   * @param query
   * @param options
   */
  GET<P extends DomineEntityCollectionEndpoint, E extends string | undefined>(
    path: P,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<
    P extends DomineEntityCollectionEndpoint<infer M>
      ? Expand<Collection<EntityByMetaType[M]>, E>
      : never
  >
  //#endregion

  //#region POST entity/{type} - массовое обновление/создание сущностей
  /**
   * `entity/{type}`
   *
   * @param path `entity/{type}`
   * @param query
   * @param options
   */
  POST<P extends DomineEntityCollectionEndpoint, E extends string | undefined>(
    path: P,
    payload: P extends DomineEntityCollectionEndpoint<infer M>
      ? Array<Patch<M> & { meta?: Meta<M> }>
      : never,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<
    P extends DomineEntityCollectionEndpoint<infer M>
      ? Array<Expand<EntityByMetaType[M], E>>
      : never
  >
  //#endregion

  //#region POST report/counterparty
  /**
   * `report/counterparty`
   *
   * @param path `report/counterparty`
   * @param query
   * @param options
   */
  POST(
    path: 'report/counterparty',
    payload: {
      counterparties: Array<{
        counterparty: EntityRef<'counterparty'>
      }>
    },
    query?: null,
    options?: RequestOptions
  ): Promise<CounterpartyReport>
  //#endregion

  //#region POST entity/{type} - создание сущности
  /**
   * `entity/{type}`
   *
   * @param path `entity/{type}`
   * @param query
   * @param options
   */
  POST<P extends DomineEntityCollectionEndpoint, E extends string | undefined>(
    path: P,
    payload: P extends DomineEntityCollectionEndpoint<infer M>
      ? Patch<M>
      : never,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<
    P extends DomineEntityCollectionEndpoint<infer M>
      ? Expand<EntityByMetaType[M], E>
      : never
  >
  //#endregion

  //#region PUT entity/{type}/new
  /**
   * `entity/{type}/new`
   *
   * @param path `entity/{type}/new`
   * @param query
   * @param options
   */
  PUT<P extends PrefilledDocumentEndpoint, E extends string | undefined>(
    path: P,
    payload: any, // TODO PUT entity/{type}/new payload
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): P extends PrefilledDocumentEndpoint<infer M>
    ? Promise<
        M extends ImplementedDocumentsMetaType
          ? Expand<PrefilledDocument<M>, E>
          : unknown
      >
    : never
  //#endregion

  //#region PUT entity/{type}/{id}
  /**
   * `entity/{type}/{id}`
   *
   * @param path `entity/{type}/{id}`
   * @param query
   * @param options
   */
  PUT<P extends string, E extends string | undefined>(
    path: P,
    payload: P extends DomineEntityEndpoint<infer M> ? Patch<M> : unknown,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<
    P extends DomineEntityEndpoint<infer M>
      ? Expand<EntityByMetaType[M], E>
      : unknown
  >
  //#endregion

  //#region DELETE
  DELETE<P extends string>(
    path: P, // TODO DELETE paths
    options?: RequestOptions
  ): Promise<void>
  //#endregion
} & Omit<Instance, 'GET' | 'POST' | 'PUT' | 'DELETE'>
