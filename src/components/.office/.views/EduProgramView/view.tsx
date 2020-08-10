
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import Group from '../../../.ui/Group';
import * as actions from '../../../../actions';
import { ReactComponent as Ico } from '../../../../assets/icons/add.svg';
import Icon from '../../../.ui/Icon';
import Preloader from '../../../.ui/Preloader';
import Button from '../../../.ui/Button';
import Div from '../../../.ui/Div';
import Field from '../../../.ui/.office/Field';
import classNames from '../../../../lib/classNames';
import { previewItemsCount, paginationLimit } from '../../../../common/constants';
import { UserEduProgramListBaseState, SubjectListBaseState, TagsBaseState } from '../../../../reducers/catalog-reducer';
import ISelect from '../../../.ui/ISelect';
import { EducationProgram } from '../../../../models';
import uid from 'uid';
import { ErrorReply } from '../../../../.types/types';

export interface DispatchedEduProgramViewProps {
  fetchUserEduProgramList: typeof actions.catalogActions.fetchUserEduProgramList.request;
  fetchSubjectList: typeof actions.catalogActions.fetchSubjectList.request;
  fetchTagList: typeof actions.catalogActions.fetchTagListAsync.request;
  createProgram: typeof actions.catalogActions.createEduProgram.request;
}
export interface StoredEduProgramViewProps {
  userEduProgramList: UserEduProgramListBaseState;
  subjectList: SubjectListBaseState;
  tagList: TagsBaseState;
}
export type InjectedEduProgramViewProps = DispatchedEduProgramViewProps
& StoredEduProgramViewProps
& { }

interface State {
  program: EducationProgram;
}
const initialState = Object.freeze({
  program: {
    id: uid(),
    class: 1,
    name: '',
    subject: {
      id: 1,
      name: 'Русский язык',
    },
    description: '',
    tags: [],
  }
})

export default class EduProgramView extends Component<InjectedEduProgramViewProps, State> {
  readonly state: State = {
    ...initialState,
  }

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const {
      fetchUserEduProgramList,
      fetchSubjectList,
      fetchTagList,
      subjectList: { data: subjects },
      userEduProgramList: { data },
    } = this.props;
    fetchSubjectList({ page: 1, onPage: paginationLimit })
    fetchUserEduProgramList({ page: 1, onPage: paginationLimit })
    fetchTagList({ search: '' });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const newState = { [name]: value };
    this.setState(({ program }) => ({
      program: {
        ...program,
        ...newState
      },
    }));
  }

  handleTagSelect = selectedOptions => {
    if (!selectedOptions) selectedOptions = []
    this.setState(({ program }) => ({
      program: {
        ...program,
        tags: [...selectedOptions.map(({ value, label }) => ({ id: value, name: label }))],
      }
    }))
  };
  
  handleClassSelect = ({ value }) => this.setState(({ program }) => ({
    program: {
      ...program,
      class: value,
    }
  }))

  handleSelect = (selectedOption, { name }) => this.setState(({ program }) => ({
    program: {
      ...program,
      [name]: (({ value, label }) => ({ id: value, name: label }))(selectedOption),
    }
  }))

  updateSubjectList = (search: string) => {
    const { fetchSubjectList } = this.props;
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchSubjectList({ page: 1, name: search })
    }, 300)
  }

  updateTagList = (search: string) => {
    const { fetchTagList } = this.props;
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchTagList({ search })
    }, 300)
  }

  create = () => {
    const { program } = this.state
    const { createProgram } = this.props
    createProgram({
      ...program,
      subject: program.subject.id,
      tags: program.tags ? program.tags.map(tag => tag.id) : []
    })
  }

  render() {
    const base = 'Edu-Program-View'
    const {
      program,
      program: {
        name,
        description,
        subject,
        class: _class,
      },
    } = this.state;
    const {
      createProgram,
      userEduProgramList: {
        data,
        isLoading,
        error,
      },
      subjectList: {
        data: subjectsData,
        isLoading: isSubjectsLoading,
      },
      tagList: {
        data: {
          list: tagList,
        },
        isLoading: isTagListLoading,
      }
    } = this.props;
    const { errors } = { ...error } as ErrorReply
    const { list: subjects } = { ...subjectsData }
    const { list } = { ...data }
    return (
      <Section className={base}>
        <Div>
          <Group stretched="x" content="center" justify="start">
            <Button
              level="office-tertiary"
              angular
              before={<Icon noStroke svg={Ico} />}
              onClick={this.create}
            >
              Добавить образовательную программу
            </Button>
            {/* <Preloader {...{ isLoading }} size={30} /> */}
          </Group>
          <Group className={`${base}__form`} content="start" justify="start" rotateOnMedia>
            <Field
              field={{ name }}
              title="Название"
              showTitle
              onChange={this.handleChange}
              error={errors && errors['name']}
            />
            <Field
              field={{ description }}
              title="Описание"
              showTitle
              onChange={this.handleChange}
              error={errors && errors['description']}
            />
            <ISelect
              title="Предмет"
              name="subject"
              isLoading={isSubjectsLoading}
              options={subjects && subjects.map(({ id, name }) => ({ value: id, label: name }))}
              defaultValue={(({ id, name }) => ({ value: id, label: name }))(subject)}
              onInputChange={this.updateSubjectList}
              onChange={this.handleSelect}
            />
            <ISelect
              title="Параллель"
              showTitle
              name="class"
              options={[...Array(11)].map((_, idx) => ({ value: idx + 1, label: idx + 1 }))}
              onChange={this.handleClassSelect}
              defaultValue={{ value: 1, label: 1 }}
            />
            <ISelect
              title="Тэги"
              isMulti
              name="tags"
              isLoading={isTagListLoading}
              options={tagList && tagList.map(({ id, name }) => ({ value: id, label: name }))}
              onInputChange={this.updateTagList}
              onChange={this.handleTagSelect}
            />
          </Group>
        </Div>
        {!list && !isLoading && (
          <Div className={`${base}__isEmpty-string`}>
            Вы пока не добавили ни одной образовательной программы
          </Div>
        )}
        {list && (
          list.map(({ id, name, subject, description, class: _class, tags }) => (
            <div key={id} className={`${base}__program`}>
              <Field
                className={`${base}__program-title`}
                field={{ name }}
                title="Название"
                showTitle
                readonly
              />
              <Field
                field={{ description }}
                title="Описание"
                showTitle
                readonly
              />
              <Field
                field={{ subject: subject.name }}
                title="Предмет"
                showTitle
                readonly
              />
              <Field
                field={{ _class: `${_class}` }}
                title="Класс"
                showTitle
                readonly
              />
              {tags && tags.map(({ id, name }) => (
                <Button
                  key={id}
                  before="#"
                  level="tag"
                  size="s"
                  angular
                >
                  {name}
                </Button>
              ))}
            </div>
          ))
        )}
      </Section>
    )
  }
}
