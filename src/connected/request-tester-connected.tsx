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
  // articles
  // fetchArticle,
  // fetchArticleList,
  // fetchCategoriesList,
  // createCategory,
  // createArticle,
  // editArticle,
  // // events
  // fetchEvent,
  // fetchEventList,
  // fetchUserEventList,
}: InjectedDispatchedProps) => {
  // const randomName = cuid();

  useEffect(() => {
    auth({ login: "mevas16268@janmail.org", password: "password" });
    // auth({ login: "admin", password: "Fh,bljk2012" });
    // fetchCategoriesList({ page: 1, onPage: 20 });
    // createCategory(new Category(randomName).serialize());
    // createArticle(new Article(randomName, 'text', { id: 1, name: 'name' }).serialize());
    // fetchArticle("zagolovok");
    // fetchArticleList({ page: 1, onPage: 20 });
    // fetchEvent("posesenie_muzea11113");
    // fetchEventList({ page: 1, onPage: 20 });
    // fetchUserEventList({ page: 1, onPage: 20 });
    // editArticle(Article.deserialize({
    //   id: 5,
    //   title: 'Заголовок',
    //   text: randomName,
    //   characterCode: 'zagolovok',
    //   createdAt: '19 декабря 2019 в 12:06',
    //   category: {
    //     id: 5, name: 'Sub-Обучение'
    //   }
    // }).serialize());
});

  return (
  <div></div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Tester);
