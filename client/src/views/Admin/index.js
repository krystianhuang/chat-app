import { Table, Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import request from '../../services/request'

const { Column } = Table

const Admin = () => {
  const [list, setList] = useState([])

  const getList = useCallback(async () => {
    try {
      const res = await request({ url: '/user/reportedList' })
      setList(res.data)
    } catch (error) {}
  }, [])

  useEffect(() => {
    getList()
  }, [getList])

  const onClick = async (v, type) => {
    if (type === 'pass') {
      const res = await request({
        url: '/user/disable',
        method: 'put',
        data: { user: v }
      })
      getList()
      return
    }

    await request({
      url: '/user/noPassReport',
      method: 'put',
      data: { user: v }
    })
    getList()
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: 30 }}>Report List</h3>

      <Table rowKey='_id' dataSource={list}>
        <Column title='Reporter' dataIndex='reportName' align='center' />
        <Column title='Username' dataIndex='name' align='center' />
        <Column
          title={<div style={{ textAlign: 'center' }}>Reason</div>}
          dataIndex='reason'
        />

        <Column
          title='Avatar'
          align='center'
          dataIndex='avatar'
          render={v => <img src={v} alt='avatar' style={{ maxWidth: 240 }} />}
        />

        <Column
          title='Action'
          align='center'
          render={v => (
            <div>
              <Button onClick={() => onClick(v, 'pass')} danger type='link'>
                Pass
              </Button>
              <Button onClick={() => onClick(v)} type='link'>
                No Pass
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  )
}

export default Admin
