import React, { useEffect, useReducer } from 'react'
import Table from 'antd/lib/table'

const paginationInitial = {
  current: 1,
  pageSize: 10,
}

function useAsyncTable(columns, query, params, options) {
  const [state, dispatch] = useReducer(
    // eslint-disable-next-line no-shadow
    (state, action) => {
      const { payload } = action
      switch (action.type) {
        case 'TOGGLE_LOADING':
          return { ...state, loading: !state.loading }
        case 'SET_QUERY':
          return {
            ...state,
            query: payload.params,
            pagination: paginationInitial,
          }
        case 'SET_PAGINATION':
          return { ...state, pagination: payload.pagination }
        case 'SET_DATA_SOURCE':
          return { ...state, dataSource: payload.dataSource }
        default:
          return state
      }
    },
    {
      loading: false,
      query: null,
      pagination: paginationInitial,
      dataSource: [],
    },
  )
  function handleTableChange(event) {
    if (event) {
      const { current } = event
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          pagination: {
            ...state.pagination,
            current,
          },
        },
      })
    }
  }
  function doQuery() {
    dispatch({
      type: 'TOGGLE_LOADING',
    })
    const { current, pageSize } = state.pagination
    const pagination = {
      current,
      pageSize,
    }
    query({
      ...state.query,
      ...pagination,
    })
      .catch(() => {
        dispatch({
          type: 'TOGGLE_LOADING',
        })
        return {}
      })
      .then(payload => {
        if (payload.pagination && payload.list) {
          const {
            pagination: { total },
          } = payload
          dispatch({
            type: 'TOGGLE_LOADING',
          })
          if (!state.pagination.total) {
            dispatch({
              type: 'SET_PAGINATION',
              payload: {
                pagination: { ...state.pagination, total },
              },
            })
          }
          dispatch({
            type: 'SET_DATA_SOURCE',
            payload: {
              dataSource: payload.list,
            },
          })
        }
      })
  }

  useEffect(() => {
    if (params && JSON.stringify(params) !== JSON.stringify(state.query)) {
      dispatch({
        type: 'SET_QUERY',
        payload: {
          params,
        },
      })
    } else {
      doQuery()
    }
  }, [params, state.pagination.current, state.query])
  return (
    <Table
      columns={columns}
      rowKey={record => record.key}
      pagination={state.pagination}
      dataSource={state.dataSource}
      loading={state.loading}
      onChange={handleTableChange}
      {...options}
    />
  )
}
export default useAsyncTable
