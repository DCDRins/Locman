import { createAsyncAction } from 'typesafe-actions';
import { IArticleDTO, ICategoryDTO, IFetchParams, Pagination, MessageReply, IArticle, Message } from '../models';


export const fetchArticleAsync = createAsyncAction(
  '@@article/fetch/request',
  '@@acticle/fetch/success',
  '@@article/fetch/failure',
  '@@article/fetch/cancel',
)<string | number, IArticleDTO, Error>();
  
export const fetchArticleListAsync = createAsyncAction(
  '@@article/fetch list/request',
  '@@acticle/fetch list/success',
  '@@article/fetch list/failure',
  '@@article/fetch list/cancel',
)<IFetchParams, Pagination<IArticleDTO>, Error>();

export const fetchCategoriesAsync = createAsyncAction(
  '@@categories/fetch/request',
  '@@categories/fetch/success',
  '@@categories/fetch/failure',
  '@@categories/fetch/cancel',
)<IFetchParams, Pagination<ICategoryDTO>, Error>(); // как реализовать рекурсивный тип дерева?

export const createArticleAsync = createAsyncAction(
  '@@article/creeate/request',
  '@@acticle/creeate/success',
  '@@article/creeate/failure',
  '@@article/creeate/cancel',
)<IArticle, MessageReply<IArticleDTO>, Error>();

export const createCategoryAsync = createAsyncAction(
  '@@category/creeate/request',
  '@@category/creeate/success',
  '@@category/creeate/failure',
  '@@category/creeate/cancel',
)<ICategoryDTO, MessageReply<ICategoryDTO>, Error>();
    
export const editArticleAsync = createAsyncAction(
  '@@article/edit/request',
  '@@acticle/edit/success',
  '@@article/edit/failure',
  '@@article/edit/cancel',
)<IArticle, MessageReply<IArticleDTO>, Error>(); // toss category.id to categoryId

export const deleteCategoryAsync = createAsyncAction(
  '@@category/delete/request',
  '@@category/delete/success',
  '@@category/delete/failure',
  '@@category/delete/cancel',
)<number[] | string, Message, Error>();

export const deleteArticleAsync = createAsyncAction(
  '@@article/delete/request',
  '@@article/delete/success',
  '@@article/delete/failure',
  '@@article/delete/cancel',
)<string, Message, Error>();

