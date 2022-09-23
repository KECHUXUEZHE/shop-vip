export default function createUsers () {
  var users = [
    {
      username: 'admin',
      nickname: 'Charlie',
      password: '123456',
      avatar: 'https://img1.baidu.com/it/u=2340445378,3135783876&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      id: 1,
      phone: 13755813395,
      createDate: Date.now()
    },
    {
      username: 'admin2',
      nickname: 'Tony',
      password: '000000',
      avatar: 'https://img2.baidu.com/it/u=3062813899,1142128231&fm=253&fmt=auto&app=138&f=JPEG?w=479&h=500',
      id: 2,
      phone: 13788554665,
      createDate: Date.now()
    },
    {
      username: 'admin3',
      nickname: 'Jack',
      password: '666666',
      avatar: 'https://img2.baidu.com/it/u=1249099614,3534836312&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=448',
      id: 3,
      phone: 15922247896,
      createDate: Date.now()
    },
    {
      username: 'admin4',
      nickname: 'Bob',
      password: '123456',
      avatar: 'https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      id: 4,
      phone: 10044668224,
      createDate: Date.now()
    }
  ]
  JSON.parse(localStorage.getItem('users'))
    ? (users = JSON.parse(localStorage.getItem('users')))
    : localStorage.setItem('users', JSON.stringify(users))
}

export function pick (obj, keys) {
  const result = {}
  keys.forEach(item => {
    result[item] = obj[item]
  })
  return result
}
// 修改
export function editData (data, key) {
  const all = JSON.parse(localStorage.getItem(key))
  const keys = Object.keys(data)
  all.forEach((item, index) => {
    if (item.id === data.id) {
      keys.forEach(k => {
        item[k] = data[k]
      })
    }
  })
  localStorage.setItem(key, JSON.stringify(all))
  console.log(data)
  return { message: '执行成功!', err: 0 }
}
// 新增
export function addData (data, key, vailds) {
  const all = JSON.parse(localStorage.getItem(key))
  const length = all.length
  const info = data
  if (vailds) {
    for (let i = 0; i < length; i++) {
      const item = all[i]
      for (let j = 0; j < vailds.length; j++) {
        const vaildsMsg = vailds[j]
        const keys = Object.keys(vaildsMsg)
        if (item[keys[0]] === data[keys[0]]) {
          return { message: vaildsMsg[keys[0]] + '重复了', err: 1 }
        }
      }
    }
  }
  info.id = all[length - 1].id + 1
  info.createDate = Date.now()
  all.push(info)
  localStorage.setItem(key, JSON.stringify(all))
  return { message: '执行成功', err: 0 }
}

export function delData (ids, key) {
  console.log(ids)
  let all = JSON.parse(localStorage.getItem(key))
  // 筛选数据中id不等于传入id的数据，相当于删除操作
  ids.forEach(item1 => {
    all = all.filter(item2 => {
      return item1 !== item2.id
    })
  })
  // 存储删除后的数据
  localStorage.setItem(key, JSON.stringify(all))
}
// var stusTab = [
//   { id: 1, stu_id: 101, name: '张三', major_id: 1901, major_name: '软件工程', course_id: 1, course_name: '高等数学', score: 98 },
//   { id: 2, stu_id: 102, name: '李四', major_id: 1902, major_name: '计算机科学与技术', course_id: 2, course_name: '大学英语', score: 96 },
//   { id: 3, stu_id: 103, name: '王五', major_id: 1903, major_name: '网络工程', course_id: 3, course_name: 'Vue框架', score: 66 },
//   { id: 4, stu_id: 104, name: '小张', major_id: 1904, major_name: '物联网工程', course_id: 4, course_name: '计算机组成原理', score: 55 },
//   { id: 5, stu_id: 105, name: '小强', major_id: 1905, major_name: '土木工程', course_id: 5, course_name: '工程力学', score: 77 }
// ]
var stusTab = [
  { id: 1, id_card: 101, name: '张三', phone: 13755813395, address: '东华理工' },
  { id: 2, id_card: 102, name: '李四', phone: 13755813395, address: '华东交大' },
  { id: 3, id_card: 103, name: '王五', phone: 13755813395, address: '江西农大' },
  { id: 4, id_card: 104, name: '小张', phone: 13755813395, address: '南昌航空' },
  { id: 5, id_card: 105, name: '小强', phone: 13755813395, address: '南昌大学' }
]
// var courseTree = [
//   {
//     major_id: 1901,
//     major_name: '软件工程',
//     children: [
//       { course_id: 1, name: '高等数学' },
//       { course_id: 4, name: '计算机组成原理' },
//       { course_id: 3, name: 'Vue框架' }
//     ]
//   },
//   {
//     major_id: 1902,
//     major_name: '计算机科学与技术',
//     children: [
//       { course_id: 1, name: '高等数学' },
//       { course_id: 2, name: '大学英语' },
//       { course_id: 4, name: '计算机组成原理' }
//     ]
//   },
//   {
//     major_id: 1903,
//     major_name: '网络工程',
//     children: [
//       { course_id: 1, name: '高等数学' },
//       { course_id: 4, name: '计算机组成原理' },
//       { course_id: 6, name: '计算机网络' }
//     ]
//   },
//   {
//     major_id: 1904,
//     major_name: '物联网工程',
//     children: [
//       { course_id: 1, name: '高等数学' },
//       { course_id: 4, name: '计算机组成原理' },
//       { course_id: 7, name: '物联网导论' }
//     ]
//   },
//   {
//     major_id: 1905,
//     major_name: '土木工程',
//     children: [
//       { course_id: 1, name: '高等数学' },
//       { course_id: 4, name: '计算机组成原理' },
//       { course_id: 5, name: '工程力学' }
//     ]
//   }
// ]
export function createTab (obj, key) {
  const data = obj
  const tab = localStorage.getItem(key)
  tab || localStorage.setItem(key, JSON.stringify(data))
}
createTab(stusTab, 'stuTab')
// createTab(courseTree, 'courseTree')
