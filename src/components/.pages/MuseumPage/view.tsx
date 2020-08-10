import React from 'react'
import Ground from '../../.ui/Ground'
import GroundImage1 from '../../../assets/fake_content/ground_images/6.jpg'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import Group from '../../.ui/Group'
import * as actions from '../../../actions'
import { OrganizationListBaseState } from '../../../reducers/organization-reducer'
import { ReactComponent as PatternIcon } from '../../../assets/icons/patterns/pattern.svg'
import { onPageItemsCount } from '../../../common/constants'
import Museum from '../../.ui/Museum'
import Div from '../../.ui/Div'
import Field from '../../.ui/.office/Field'
import Icon from '../../.ui/Icon'
import classNames from '../../../lib/classNames'
import Button from '../../.ui/Button'
import ISelect from '../../.ui/ISelect'
import { CatalogState } from '../../../reducers/catalog-reducer'
import { OrganizationFilters } from '../../../models'
import isInViewport from '../../../lib/isInViewport'
import { IFetchParamsExtended } from '../../../.types/types'

export interface DispatchedMuseumPageProps {
  fetchOrganizationList: typeof actions.organizationActions.fetchOrganizationList.request,
  fetchCitiesList: typeof actions.catalogActions.fetchCitiesListAsync.request,
}
export interface StoredMuseumPageProps {
  organizationList: OrganizationListBaseState;
  catalog: CatalogState;
}
export interface InjectedMuseumPageProps extends DispatchedMuseumPageProps, StoredMuseumPageProps { }

type State = typeof initialState & OrganizationFilters & { }
const initialState = Object.freeze({
  
})

export default class MuseumPage extends React.Component<InjectedMuseumPageProps, {}> {
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
    const { fetchOrganizationList } = this.props;
    fetchOrganizationList({ page: 1, onPage: 3 })
    window.addEventListener('scroll', this._loadMore)
    window.scrollTo({
      top: 250,
      behavior: "smooth"
    });
  }

  _loadMore = e => {
    const { fetchOrganizationList, organizationList: { data }} = this.props
    const {  } = this.state
    const { loader: { current: loader } } = this
    if (!this._isMounted || !loader) return false;
    if (!data || !isInViewport(loader, 100)) return false;
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
      const params: IFetchParamsExtended<OrganizationFilters> = {
        page: currentPage! + 1,
        onPage: 3,
      }
      fetchOrganizationList(params)
    }, 150)
  }

  filter = () => {
    const { } = this.state
    const { fetchOrganizationList } = this.props
    const params: IFetchParamsExtended<OrganizationFilters> = {
      page: 1,
      onPage: onPageItemsCount,
      resetStore: true,
    }
    fetchOrganizationList(params)
  }

  reset = () => {
    const { fetchOrganizationList } = this.props
    this.setState({
      started: false,
      notFinished: false,
      educationProgram: undefined,
      location: undefined,
    })
    const params: IFetchParamsExtended<OrganizationFilters> = {
      page: 1,
      onPage: onPageItemsCount,
      resetStore: true,
    }
    fetchOrganizationList(params)
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
    const base = "Museum-Page";
    const {
      organizationList: {
        data,
        isLoading,
        error,
      },
      catalog: {
        cities: {
          data: cities,
          isLoading: isCitiesLoading,
          error: citiesError,
        },
      }
    } = this.props;
    const { list: orgs } = { ...data }
    return (
      <UIPage className={base}>
        <Ground stretch limit mask="dark-left" solid src={GroundImage1} />
        <Section header="Фильтры" unfollow type="dev" className={`${base}__filter-container`}>
          <Div className={`${base}__filter`}>
            <ISelect
              title="Город"
              onInputChange={this.updateCitiesList}
              onClick={this.updateCitiesList}
              onChange={this.handleSelect}
              name="location"
              isLoading={isCitiesLoading}
              options={cities.map(({ id, city }) => ({ value: id, label: city }))}
            />
            <Div both>
              <Button
                level="secondary"
                stretched="x"
                // onClick={this.filter}
              >
                Применить фильтр
              </Button>
            </Div>
            <Div both>
              <Button
                level="office-secondary"
                stretched="x"
                // onClick={this.reset}
              >
                Сбросить
              </Button>
            </Div>
          </Div>
        </Section>
        <Section>
          <Div className={classNames(`${base}__splitter`, {
              'isLoading': isLoading
            })}
          >
            <Icon svg={PatternIcon} size={50} />
          </Div>
        </Section>
        {orgs && orgs.map(org => (
          <Section
            align="align-center"
            key={org.id}
            header={org.organization.shortName}
            side={(
              <div className={`${base}__side`}>
                {org.organization.city && (
                  <Field
                    readonly
                    title="Город"
                    showTitle
                    field={{ city: org.organization.city.name }}
                  />
                )}
                {org.category && (
                  <Field
                    readonly
                    title="Категория организации"
                    showTitle
                    field={{ category: org.category.name }}
                  />
                )}
                {org.organization.phone && (
                  <Field
                    readonly
                    title="Телефон"
                    showTitle
                    field={{ phone: `${org.organization.phone}` }}
                  />
                )}
              </div>
            )}
          >
            <Museum data={org} />
          </Section>
        ))}
        <div ref={this.loader} style={{ height: '10px' }} />
      </UIPage>
    )
  }
}
