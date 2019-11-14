import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Progress, Radio, Row, Collapse, Avatar, Icon } from 'antd'
import { Link } from 'umi'
import { Dispatch } from 'redux'
import { FormComponentProps } from 'antd/es/form'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import moment from 'moment'
import useModal from '@/hook/useModal/index'
import CreateProductFMC from './modules/CreateProductFMC'
import styles from './style.less'
import { BasicListItemDataType } from './data.d'
import EditableLinkGroup from '../components/EditableLinkGroup'
import useRestful from '@/hook/useRestful'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Search } = Input
const { Panel } = Collapse

const features = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
]

interface DevelopProps extends FormComponentProps {
  dispatch: Dispatch<any>
  loading: boolean
}

const Info: React.FC<{
  title: React.ReactNode
  value: React.ReactNode
  bordered?: boolean
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
)

const ListContent = ({
  data: { owner, createdAt, percent, status },
}: {
  data: BasicListItemDataType
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
)

const ProductComponents = ({ components }: { components: any[] }) => (
  <Card
    title='模块'
    className={styles.productCard}
    style={{ marginBottom: 24 }}
    bodyStyle={{ padding: 0 }}
  >
    {[...components, null].map((item: any) =>
      item ? (
        <Card.Grid style={{ width: '25%', padding: 10, textAlign: 'center', cursor: 'pointer' }}>
          <div className={styles.component}>安卓</div>
        </Card.Grid>
      ) : (
        <Card.Grid style={{ width: '25%', padding: 10, textAlign: 'center', cursor: 'pointer' }}>
          <div className={styles.component}>
            <Icon type='plus' style={{ fontSize: 20, color: '#616161' }} />
          </div>
        </Card.Grid>
      ),
    )}
  </Card>
)

const ProductFeature = ({ features }: { features: any[] }) => (
  <Card
    className={styles.productCard}
    style={{ marginBottom: 24 }}
    headStyle={{ borderBottom: '1px solid #e8e8e8' }}
    bodyStyle={{ padding: 0 }}
    title='功能'
  >
    <EditableLinkGroup onAdd={() => {}} links={features} linkElement={Link} />
  </Card>
)

const Develop: React.FC<DevelopProps> = props => {
  const projectAnddevelop = useRestful('/api/xxx/xx')
  const list = projectAnddevelop.get();
  const [ProductModal, ProductModalMethods] = useModal(CreateProductFMC, {
    title: '产品添加',
    width: 640,
  })

  const handleAdd = () => {
    ProductModalMethods.show()
  }

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue='all'>
        <RadioButton value='all'>全部</RadioButton>
        <RadioButton value='progress'>进行中</RadioButton>
        <RadioButton value='waiting'>等待中</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder='请输入' onSearch={() => ({})} />
    </div>
  )

  return (
    <>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title='我的待办' value='8个任务' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='本周任务平均处理时间' value='32分钟' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='本周完成任务数' value='24个任务' />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title='产品列表'
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type='dashed'
              style={{ width: '100%', marginBottom: 8 }}
              icon='plus'
              onClick={handleAdd}
            >
              添加
            </Button>
            <Collapse bordered={false}>
              {list.map(item => (
                <Panel key={item.id} header={<ListContent data={item} />}>
                  <Row gutter={12}>
                    <Col lg={16}>
                      <ProductComponents components={list}></ProductComponents>
                    </Col>
                    <Col lg={8}>
                      <ProductFeature features={features}></ProductFeature>
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </PageHeaderWrapper>
      {[ProductModal]}
    </>
  )
}

Form.create<DevelopProps>()(Develop)
