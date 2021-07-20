import type { Query, RequestOptions, Instance } from 'moysklad'
import type { EndpointInterface, HttpMethodPath } from 'moysklad-api-model'

export interface QueryWithExpand<T extends string | undefined> extends Query {
  expand?: T
}

export type TypedInstance = {
  GET<P extends HttpMethodPath['GET'], E extends string | undefined>(
    path: P,
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<EndpointInterface<'GET', P, E>['response']>

  POST<P extends HttpMethodPath['POST'], E extends string | undefined>(
    path: P,
    payload: EndpointInterface<'POST', P>['payload'],
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<EndpointInterface<'POST', P, E>['response']>

  PUT<P extends HttpMethodPath['PUT'], E extends string | undefined>(
    path: P,
    payload: EndpointInterface<'PUT', P>['payload'],
    query?: QueryWithExpand<E> | null,
    options?: RequestOptions
  ): Promise<EndpointInterface<'PUT', P, E>['response']>

  DELETE<P extends HttpMethodPath['DELETE']>(
    path: P,
    options?: RequestOptions
  ): Promise<EndpointInterface<'DELETE', P>['response']>
} & Omit<Instance, 'GET' | 'POST' | 'PUT' | 'DELETE'>
