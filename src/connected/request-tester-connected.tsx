import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { useEffect, HTMLAttributes } from 'react';
// import { Article, Category } from '../models/knowledge';
// import cuid from 'cuid';
// import getDateFormat from '../lib/getDateFormat';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  auth: actions.clientActions.authAsync.request,
  // articles
  fetchArticle: actions.knowledgeActions.fetchArticleAsync.request,
  fetchArticleList: actions.knowledgeActions.fetchArticleListAsync.request,
  fetchCategoriesList: actions.knowledgeActions.fetchCategoriesAsync.request,
  createCategory: actions.knowledgeActions.createCategoryAsync.request,
  createArticle: actions.knowledgeActions.createArticleAsync.request,
  editArticle: actions.knowledgeActions.editArticleAsync.request,
  // events
  fetchEvent: actions.eventActions.fetchEventAsync.request,
  fetchEventList: actions.eventActions.fetchEventListAsync.request,
  fetchUserEventList: actions.eventActions.fetchUserEventListAsync.request,
}, dispatch);

type InjectedDispatchedProps = {
  auth: typeof actions.clientActions.authAsync.request;
  // articles
  fetchArticle: typeof actions.knowledgeActions.fetchArticleAsync.request;
  fetchArticleList: typeof actions.knowledgeActions.fetchArticleListAsync.request;
  fetchCategoriesList: typeof actions.knowledgeActions.fetchCategoriesAsync.request;
  createCategory: typeof actions.knowledgeActions.createCategoryAsync.request;
  createArticle: typeof actions.knowledgeActions.createArticleAsync.request;
  editArticle: typeof actions.knowledgeActions.editArticleAsync.request;
  // events
  fetchEvent: typeof actions.eventActions.fetchEventAsync.request;
  fetchEventList: typeof actions.eventActions.fetchEventListAsync.request;
  fetchUserEventList: typeof actions.eventActions.fetchUserEventListAsync.request;
} & HTMLAttributes<HTMLDivElement>

export const Tester = ({
  auth,
}: InjectedDispatchedProps) => {
  useEffect(() => {
   // queries here
  });

  return (
  <div></div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Tester);
