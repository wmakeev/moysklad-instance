import type { Query, RequestOptions, Instance } from 'moysklad'
import type {
  Collection,
  DocumentTemplateEndpoint,
  DomineEntityCollectionEndpoint,
  DomineEntityEndpoint,
  EntityByMetaType,
  Expand,
  Meta,
  Patch,
  Template
} from 'moysklad-api-model'

export interface QueryWithExpand<T extends string | undefined> extends Query {
  expand?: T
}

/**
 * Реализованные типы (для поддержки Template)
 */
type _TemplateMetaType = 'invoicein' | 'invoiceout' | 'customerorder'

export type TypedInstance = {
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
  ): P extends DomineEntityEndpoint<infer M>
    ? Expand<EntityByMetaType[M], E>
    : never
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
  ): P extends DomineEntityCollectionEndpoint<infer M>
    ? Expand<Collection<M>, E>
    : never
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
  ): P extends DomineEntityCollectionEndpoint<infer M>
    ? Array<Expand<EntityByMetaType[M], E>>
    : never
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
  ): P extends DomineEntityCollectionEndpoint<infer M>
    ? Expand<EntityByMetaType[M], E>
    : never
  //#endregion

  //#region PUT entity/{type}/new
  /**
   * `entity/{type}/new`
   *
   * @param path `entity/{type}/new`
   * @param query
   * @param options
   */
  PUT<P extends DocumentTemplateEndpoint, E extends string | undefined>(
    path: P,
    payload: any, // TODO PUT entity/{type}/new payload
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): P extends DocumentTemplateEndpoint<infer M>
    ? M extends _TemplateMetaType
      ? Expand<Template<EntityByMetaType[M]>, E>
      : unknown
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
  ): P extends DomineEntityEndpoint<infer M>
    ? Expand<EntityByMetaType[M], E>
    : unknown
  //#endregion

  //#region DELETE
  DELETE<P extends string>(
    path: P, // TODO DELETE paths
    options?: RequestOptions
  ): Promise<void>
  //#endregion
} & Omit<Instance, 'GET' | 'POST' | 'PUT' | 'DELETE'>
