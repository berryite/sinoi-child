import Form from './components/form'
import Table from './components/table/simple-table'
import Pagination from './components/pagination'
import Button from './components/button'
import Group from './components/form/group/simple-group'
import Upload from './components/form/upload'
import Text from './components/form/text'
import Tabs from './components/tabs'
import Dialog from './components/dialog'
import Footer from './components/footer'
import FormItem from './components/form/item'
import PageHeader from './components/page-header'
import Box from './components/box'
import { ElTabPane as TabPane, ElInput as Input } from 'element-plus'


const components = {
  Form,
  FormItem,
  Table,
  Pagination,
  Button,
  Tabs,
  Upload,
  Text,
  Group,
  Dialog,
  Footer,
  TabPane,
  Input,
  PageHeader,
  Box
}

const install = (Vue) => {
  Object.keys(components).forEach((name) => {
    const component = components[name]
    Vue.component('s' + name, component)
  })
}

export default {
  install,
}
