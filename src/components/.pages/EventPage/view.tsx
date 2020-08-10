import React from 'react'
import ReactDOM from 'react-dom'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import * as actions from '../../../actions'
import { StockEventListBaseState } from '../../../reducers/event-reducer'
import { HasRouterProps } from '../../../.types/props'
import Group from '../../.ui/Group'
import 'moment/locale/ru'
import ClosestEvent from '../../ClosestEvent'
import StockContentViewer from '../../StockContentViewer'
import Event from '../../.ui/Event'
import { onPageItemsCount } from '../../../common/constants'
import isInViewport from '../../../lib/isInViewport'
import Div from '../../.ui/Div'
import Preloader from '../../.ui/Preloader'
import { EventFilters } from '../../../models'
import { IFetchParamsExtended } from '../../../.types/types'
import { ReactComponent as PatternIcon } from '../../../assets/icons/patterns/pattern.svg'
import Switch from '../../.ui/Switch'
import ISelect from '../../.ui/ISelect'
import { CitiesBaseState, EventCatalogBaseState, CatalogState } from '../../../reducers/catalog-reducer'
import Field from '../../.ui/.office/Field'
import Icon from '../../.ui/Icon'
import Button from '../../.ui/Button'
import classNames from '../../../lib/classNames'

export interface DispatchedEventPageProps {
  fetchEventList: typeof actions.eventActions.fetchStockEventListAsync.request,
  fetchCitiesList: typeof actions.catalogActions.fetchCitiesListAsync.request,
  fetchEventFormatList: typeof actions.catalogActions.fetchEventFormatList.request,
}
export interface StoredEventPageProps {
  events: StockEventListBaseState;
  catalog: CatalogState;
}
type OwnProps = HasRouterProps & { }
export interface InjectedEventPageProps extends DispatchedEventPageProps, StoredEventPageProps, OwnProps { }

type State = typeof initialState & EventFilters & { }
const initialState = Object.freeze({
  
})

export default class EventPage extends React.Component<InjectedEventPageProps, State> {
  readonly state: State = {
    ...initialState,
    started: false,
    notFinished: false,
  }

  loader: React.RefObject<HTMLDivElement> = React.createRef()
  _intervalId?: NodeJS.Timeout
  _cityIntervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const { fetchEventList, fetchEventFormatList } = this.props
    fetchEventList({ page: 1, onPage: onPageItemsCount });
    fetchEventFormatList({ });
    window.addEventListener('scroll', this._loadMore)
    window.scrollTo({
      top: 350,
      behavior: "smooth"
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._loadMore)
    this._intervalId && clearInterval(this._intervalId)
    this._cityIntervalId && clearInterval(this._cityIntervalId)
    this._isMounted = false;
  }

  _loadMore = e => {
    const { fetchEventList, events: { data }} = this.props
    const { started, educationProgram, notFinished, location } = this.state
    const { loader: { current: loader } } = this
    if (!data || !isInViewport(loader, 100) || !this._isMounted) return false;
    const {
      currentPage,
      totalItems,
      totalPages,
      list,
    } = data
    if (currentPage === totalPages || totalItems === list.length) {
      window.removeEventListener('scroll', this._loadMore);
      return false;
    }
    
    this._intervalId && clearInterval(this._intervalId)
    this._intervalId = setTimeout(() => {
      const params: IFetchParamsExtended<EventFilters> = {
        page: currentPage! + 1,
        onPage: onPageItemsCount,
      }
      params['started'] = started
      notFinished && (params['notFinished'] = !notFinished)
      educationProgram && (params['educationProgram'] = educationProgram)
      location && (params['location'] = location)
      fetchEventList(params)
    }, 150)
  }

  filter = () => {
    const { started, educationProgram, notFinished, location } = this.state
    const { fetchEventList } = this.props
    const params: IFetchParamsExtended<EventFilters> = {
      page: 1,
      onPage: onPageItemsCount,
      resetStore: true,
    }
    params['started'] = started
    notFinished && (params['notFinished'] = !notFinished)
    educationProgram && (params['educationProgram'] = educationProgram)
    location && (params['location'] = location)
    fetchEventList(params)
  }

  reset = () => {
    const { fetchEventList } = this.props
    this.setState({
      started: false,
      notFinished: false,
      educationProgram: undefined,
      location: undefined,
    })
    const params: IFetchParamsExtended<EventFilters> = {
      page: 1,
      onPage: onPageItemsCount,
      resetStore: true,
    }
    fetchEventList(params)
  }

  handleSwitchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const newState = { [name]: checked };
    console.log(newState)
    this.setState({ ...newState });
  }
  
  handleSelect = (selectedOption, { name }) => this.setState({
    [name]: (({ value, label }) => ({ id: value, name: label }))(selectedOption),
  })

  updateCitiesList = (name: string) => {
    const { fetchCitiesList } = this.props;
    this._cityIntervalId && clearInterval(this._cityIntervalId)
    if (!this._isMounted) return;
    this._cityIntervalId = setTimeout(() => {
      fetchCitiesList({ name })
    }, 300)
  }

  render() {
    const base = "Any-Event-Page"
    const {
      started,
      notFinished,
      educationProgram,
      location,
    } = this.state
    const {
      events: {
        data,
        isLoading,
        error
      },
      catalog: {
        cities: {
          data: cities,
          isLoading: isCitiesLoading,
          error: citiesError,
        },
        event: {
          formatList,
        }
      }
    } = this.props;
    const { list: eventList } = { ...data }

    return (
      <UIPage className={base}>
        <ClosestEvent />
        <Section header="Фильтры" unfollow type="dev" className={`${base}__filter-container`}>
          <Div className={`${base}__filter`}>
            <Field
              justify="space-between"
              field={{ started }}
              onChange={this.handleSwitchChange}
            >
              Только текущие мероприятия
            </Field>
            <Field
              justify="space-between"
              field={{ notFinished }}
              onChange={this.handleSwitchChange}
            >
              Закончившиеся мероприятия
            </Field>
            <ISelect
              title="Город"
              onInputChange={this.updateCitiesList}
              onClick={this.updateCitiesList}
              onChange={this.handleSelect}
              name="location"
              isLoading={isCitiesLoading}
              options={cities.map(({ id, city }) => ({ value: id, label: city }))}
            />
            {/* <ISelect
              title="Образовательная программа"
              name="educationProgram"
              onChange={this.handleSelect}
              // options={formatList.data.map(({ id, name }) => ({ value: id, label: name }))}
              isSearchable
              // isLoading={formatList.isLoading}
            /> */}
            <Div both>
              <Button
                level="secondary"
                stretched="x"
                onClick={this.filter}
              >
                Применить фильтр
              </Button>
            </Div>
            <Div both>
              <Button
                level="office-secondary"
                stretched="x"
                onClick={this.reset}
              >
                Сбросить
              </Button>
            </Div>
          </Div>
        </Section>
        <Section>
          <Div className={`${base}__splitter`}>
            <Icon svg={PatternIcon} size={50} className={classNames({ 'isLoading': isLoading})} />
          </Div>
          <Group
            className={`${base}__content`}
            justify="center"
          >
            {eventList && eventList.map(e => (
              <Event key={e.characterCode} charCode={e.characterCode} name={e.name} subtitle={e.location} date={e.startDate} image={e.image && e.image.path} />
            ))}
          </Group>
          <div ref={this.loader} style={{ height: '10px' }} />
        </Section>
      </UIPage>
    )
  }
}
