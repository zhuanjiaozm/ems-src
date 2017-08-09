"use strict";

define(function() {
   var data = [
      {
        "regionRange": "华东",
        "children": [
          {
            "id": "310000",
            "name": "上海市",
            "idxcode": "S",
            "pid": "100000",
            "level": "1",
            "spelling": "Shanghai Shi",
            "regionRange": "1",
            "children": [
              {
                "id": "310100",
                "name": "市辖区",
                "idxcode": "S",
                "pid": "310000",
                "level": "2",
                "spelling": "Shixiaqu",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "310200",
                "name": "县",
                "idxcode": "X",
                "pid": "310000",
                "level": "2",
                "spelling": "Xian",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "320000",
            "name": "江苏省",
            "idxcode": "J",
            "pid": "100000",
            "level": "1",
            "spelling": "Jiangsu Sheng",
            "regionRange": "1",
            "children": [
              {
                "id": "320100",
                "name": "南京市",
                "idxcode": "N",
                "pid": "320000",
                "level": "2",
                "spelling": "Nanjing Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320200",
                "name": "无锡市",
                "idxcode": "W",
                "pid": "320000",
                "level": "2",
                "spelling": "Wuxi Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320300",
                "name": "徐州市",
                "idxcode": "X",
                "pid": "320000",
                "level": "2",
                "spelling": "Xuzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320400",
                "name": "常州市",
                "idxcode": "C",
                "pid": "320000",
                "level": "2",
                "spelling": "Changzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320500",
                "name": "苏州市",
                "idxcode": "S",
                "pid": "320000",
                "level": "2",
                "spelling": "Suzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320600",
                "name": "南通市",
                "idxcode": "N",
                "pid": "320000",
                "level": "2",
                "spelling": "Nantong Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320700",
                "name": "连云港市",
                "idxcode": "L",
                "pid": "320000",
                "level": "2",
                "spelling": "Lianyungang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320800",
                "name": "淮安市",
                "idxcode": "H",
                "pid": "320000",
                "level": "2",
                "spelling": "Huai,an Xian",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "320900",
                "name": "盐城市",
                "idxcode": "Y",
                "pid": "320000",
                "level": "2",
                "spelling": "Yancheng Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "321000",
                "name": "扬州市",
                "idxcode": "Y",
                "pid": "320000",
                "level": "2",
                "spelling": "Yangzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "321100",
                "name": "镇江市",
                "idxcode": "Z",
                "pid": "320000",
                "level": "2",
                "spelling": "Zhenjiang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "321200",
                "name": "泰州市",
                "idxcode": "T",
                "pid": "320000",
                "level": "2",
                "spelling": "Taizhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "321300",
                "name": "宿迁市",
                "idxcode": "S",
                "pid": "320000",
                "level": "2",
                "spelling": "Suqian Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "330000",
            "name": "浙江省",
            "idxcode": "Z",
            "pid": "100000",
            "level": "1",
            "spelling": "Zhejiang Sheng",
            "regionRange": "1",
            "children": [
              {
                "id": "330100",
                "name": "杭州市",
                "idxcode": "H",
                "pid": "330000",
                "level": "2",
                "spelling": "Hangzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330200",
                "name": "宁波市",
                "idxcode": "N",
                "pid": "330000",
                "level": "2",
                "spelling": "Ningbo Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330300",
                "name": "温州市",
                "idxcode": "W",
                "pid": "330000",
                "level": "2",
                "spelling": "Wenzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330400",
                "name": "嘉兴市",
                "idxcode": "J",
                "pid": "330000",
                "level": "2",
                "spelling": "Jiaxing Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330500",
                "name": "湖州市",
                "idxcode": "H",
                "pid": "330000",
                "level": "2",
                "spelling": "Huzhou Shi ",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330600",
                "name": "绍兴市",
                "idxcode": "S",
                "pid": "330000",
                "level": "2",
                "spelling": "Shaoxing Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330700",
                "name": "金华市",
                "idxcode": "J",
                "pid": "330000",
                "level": "2",
                "spelling": "Jinhua Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330800",
                "name": "衢州市",
                "idxcode": "Q",
                "pid": "330000",
                "level": "2",
                "spelling": "Quzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "330900",
                "name": "舟山市",
                "idxcode": "Z",
                "pid": "330000",
                "level": "2",
                "spelling": "Zhoushan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "331000",
                "name": "台州市",
                "idxcode": "T",
                "pid": "330000",
                "level": "2",
                "spelling": "Taizhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "331100",
                "name": "丽水市",
                "idxcode": "L",
                "pid": "330000",
                "level": "2",
                "spelling": "Lishui Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "340000",
            "name": "安徽省",
            "idxcode": "A",
            "pid": "100000",
            "level": "1",
            "spelling": "Anhui Sheng",
            "regionRange": "1",
            "children": [
              {
                "id": "340100",
                "name": "合肥市",
                "idxcode": "H",
                "pid": "340000",
                "level": "2",
                "spelling": "Hefei Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340200",
                "name": "芜湖市",
                "idxcode": "W",
                "pid": "340000",
                "level": "2",
                "spelling": "Wuhu Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340300",
                "name": "蚌埠市",
                "idxcode": "B",
                "pid": "340000",
                "level": "2",
                "spelling": "Bengbu Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340400",
                "name": "淮南市",
                "idxcode": "H",
                "pid": "340000",
                "level": "2",
                "spelling": "Huainan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340500",
                "name": "马鞍山市",
                "idxcode": "M",
                "pid": "340000",
                "level": "2",
                "spelling": "Ma,anshan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340600",
                "name": "淮北市",
                "idxcode": "H",
                "pid": "340000",
                "level": "2",
                "spelling": "Huaibei Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340700",
                "name": "铜陵市",
                "idxcode": "T",
                "pid": "340000",
                "level": "2",
                "spelling": "Tongling Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "340800",
                "name": "安庆市",
                "idxcode": "A",
                "pid": "340000",
                "level": "2",
                "spelling": "Anqing Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341000",
                "name": "黄山市",
                "idxcode": "H",
                "pid": "340000",
                "level": "2",
                "spelling": "Huangshan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341100",
                "name": "滁州市",
                "idxcode": "C",
                "pid": "340000",
                "level": "2",
                "spelling": "Chuzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341200",
                "name": "阜阳市",
                "idxcode": "F",
                "pid": "340000",
                "level": "2",
                "spelling": "Fuyang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341300",
                "name": "宿州市",
                "idxcode": "S",
                "pid": "340000",
                "level": "2",
                "spelling": "Suzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341500",
                "name": "六安市",
                "idxcode": "L",
                "pid": "340000",
                "level": "2",
                "spelling": "Liu,an Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341600",
                "name": "亳州市",
                "idxcode": "B",
                "pid": "340000",
                "level": "2",
                "spelling": "Bozhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341700",
                "name": "池州市",
                "idxcode": "C",
                "pid": "340000",
                "level": "2",
                "spelling": "Chizhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "341800",
                "name": "宣城市",
                "idxcode": "X",
                "pid": "340000",
                "level": "2",
                "spelling": "Xuancheng Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "350000",
            "name": "福建省",
            "idxcode": "F",
            "pid": "100000",
            "level": "1",
            "spelling": "Fujian Sheng ",
            "regionRange": "1",
            "children": [
              {
                "id": "350100",
                "name": "福州市",
                "idxcode": "F",
                "pid": "350000",
                "level": "2",
                "spelling": "Fuzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350200",
                "name": "厦门市",
                "idxcode": "X",
                "pid": "350000",
                "level": "2",
                "spelling": "Xiamen Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350300",
                "name": "莆田市",
                "idxcode": "P",
                "pid": "350000",
                "level": "2",
                "spelling": "Putian Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350400",
                "name": "三明市",
                "idxcode": "S",
                "pid": "350000",
                "level": "2",
                "spelling": "Sanming Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350500",
                "name": "泉州市",
                "idxcode": "Q",
                "pid": "350000",
                "level": "2",
                "spelling": "Quanzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350600",
                "name": "漳州市",
                "idxcode": "Z",
                "pid": "350000",
                "level": "2",
                "spelling": "Zhangzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350700",
                "name": "南平市",
                "idxcode": "N",
                "pid": "350000",
                "level": "2",
                "spelling": "Nanping Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350800",
                "name": "龙岩市",
                "idxcode": "L",
                "pid": "350000",
                "level": "2",
                "spelling": "Longyan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "350900",
                "name": "宁德市",
                "idxcode": "N",
                "pid": "350000",
                "level": "2",
                "spelling": "Ningde Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "360000",
            "name": "江西省",
            "idxcode": "J",
            "pid": "100000",
            "level": "1",
            "spelling": "Jiangxi Sheng",
            "regionRange": "1",
            "children": [
              {
                "id": "360100",
                "name": "南昌市",
                "idxcode": "N",
                "pid": "360000",
                "level": "2",
                "spelling": "Nanchang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360200",
                "name": "景德镇市",
                "idxcode": "J",
                "pid": "360000",
                "level": "2",
                "spelling": "Jingdezhen Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360300",
                "name": "萍乡市",
                "idxcode": "P",
                "pid": "360000",
                "level": "2",
                "spelling": "Pingxiang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360400",
                "name": "九江市",
                "idxcode": "J",
                "pid": "360000",
                "level": "2",
                "spelling": "Jiujiang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360500",
                "name": "新余市",
                "idxcode": "X",
                "pid": "360000",
                "level": "2",
                "spelling": "Xinyu Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360600",
                "name": "鹰潭市",
                "idxcode": "Y",
                "pid": "360000",
                "level": "2",
                "spelling": "Yingtan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360700",
                "name": "赣州市",
                "idxcode": "G",
                "pid": "360000",
                "level": "2",
                "spelling": "Ganzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360800",
                "name": "吉安市",
                "idxcode": "J",
                "pid": "360000",
                "level": "2",
                "spelling": "Ji,an Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "360900",
                "name": "宜春市",
                "idxcode": "Y",
                "pid": "360000",
                "level": "2",
                "spelling": "Yichun Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "361000",
                "name": "抚州市",
                "idxcode": "W",
                "pid": "360000",
                "level": "2",
                "spelling": "Wuzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "361100",
                "name": "上饶市",
                "idxcode": "S",
                "pid": "360000",
                "level": "2",
                "spelling": "Shangrao Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          },
          {
            "id": "370000",
            "name": "山东省",
            "idxcode": "S",
            "pid": "100000",
            "level": "1",
            "spelling": "Shandong Sheng ",
            "regionRange": "1",
            "children": [
              {
                "id": "370100",
                "name": "济南市",
                "idxcode": "J",
                "pid": "370000",
                "level": "2",
                "spelling": "Jinan Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370200",
                "name": "青岛市",
                "idxcode": "Q",
                "pid": "370000",
                "level": "2",
                "spelling": "Qingdao Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370300",
                "name": "淄博市",
                "idxcode": "Z",
                "pid": "370000",
                "level": "2",
                "spelling": "Zibo Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370400",
                "name": "枣庄市",
                "idxcode": "Z",
                "pid": "370000",
                "level": "2",
                "spelling": "Zaozhuang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370500",
                "name": "东营市",
                "idxcode": "D",
                "pid": "370000",
                "level": "2",
                "spelling": "Dongying Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370600",
                "name": "烟台市",
                "idxcode": "Y",
                "pid": "370000",
                "level": "2",
                "spelling": "Yantai Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370700",
                "name": "潍坊市",
                "idxcode": "W",
                "pid": "370000",
                "level": "2",
                "spelling": "Weifang Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370800",
                "name": "济宁市",
                "idxcode": "J",
                "pid": "370000",
                "level": "2",
                "spelling": "Jining Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "370900",
                "name": "泰安市",
                "idxcode": "T",
                "pid": "370000",
                "level": "2",
                "spelling": "Tai,an Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371000",
                "name": "威海市",
                "idxcode": "W",
                "pid": "370000",
                "level": "2",
                "spelling": "Weihai Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371100",
                "name": "日照市",
                "idxcode": "R",
                "pid": "370000",
                "level": "2",
                "spelling": "Rizhao Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371200",
                "name": "莱芜市",
                "idxcode": "L",
                "pid": "370000",
                "level": "2",
                "spelling": "Laiwu Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371300",
                "name": "临沂市",
                "idxcode": "L",
                "pid": "370000",
                "level": "2",
                "spelling": "Linyi Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371400",
                "name": "德州市",
                "idxcode": "D",
                "pid": "370000",
                "level": "2",
                "spelling": "Dezhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371500",
                "name": "聊城市",
                "idxcode": "L",
                "pid": "370000",
                "level": "2",
                "spelling": "Liaocheng Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371600",
                "name": "滨州市",
                "idxcode": "B",
                "pid": "370000",
                "level": "2",
                "spelling": "Binzhou Shi",
                "regionRange": "1",
                "children": null
              },
              {
                "id": "371700",
                "name": "菏泽市",
                "idxcode": "H",
                "pid": "370000",
                "level": "2",
                "spelling": "Heze Shi",
                "regionRange": "1",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "华南",
        "children": [
          {
            "id": "440000",
            "name": "广东省",
            "idxcode": "G",
            "pid": "100000",
            "level": "1",
            "spelling": "Guangdong Sheng",
            "regionRange": "2",
            "children": [
              {
                "id": "440100",
                "name": "广州市",
                "idxcode": "G",
                "pid": "440000",
                "level": "2",
                "spelling": "Guangzhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440200",
                "name": "韶关市",
                "idxcode": "S",
                "pid": "440000",
                "level": "2",
                "spelling": "Shaoguan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440300",
                "name": "深圳市",
                "idxcode": "S",
                "pid": "440000",
                "level": "2",
                "spelling": "Shenzhen Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440400",
                "name": "珠海市",
                "idxcode": "Z",
                "pid": "440000",
                "level": "2",
                "spelling": "Zhuhai Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440500",
                "name": "汕头市",
                "idxcode": "S",
                "pid": "440000",
                "level": "2",
                "spelling": "Shantou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440600",
                "name": "佛山市",
                "idxcode": "F",
                "pid": "440000",
                "level": "2",
                "spelling": "Foshan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440700",
                "name": "江门市",
                "idxcode": "J",
                "pid": "440000",
                "level": "2",
                "spelling": "Jiangmen Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440800",
                "name": "湛江市",
                "idxcode": "Z",
                "pid": "440000",
                "level": "2",
                "spelling": "Zhanjiang Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "440900",
                "name": "茂名市",
                "idxcode": "M",
                "pid": "440000",
                "level": "2",
                "spelling": "Maoming Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441200",
                "name": "肇庆市",
                "idxcode": "Z",
                "pid": "440000",
                "level": "2",
                "spelling": "Zhaoqing Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441300",
                "name": "惠州市",
                "idxcode": "H",
                "pid": "440000",
                "level": "2",
                "spelling": "Huizhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441400",
                "name": "梅州市",
                "idxcode": "M",
                "pid": "440000",
                "level": "2",
                "spelling": "Meizhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441500",
                "name": "汕尾市",
                "idxcode": "S",
                "pid": "440000",
                "level": "2",
                "spelling": "Shanwei Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441600",
                "name": "河源市",
                "idxcode": "H",
                "pid": "440000",
                "level": "2",
                "spelling": "Heyuan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441700",
                "name": "阳江市",
                "idxcode": "Y",
                "pid": "440000",
                "level": "2",
                "spelling": "Yangjiang Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441800",
                "name": "清远市",
                "idxcode": "Q",
                "pid": "440000",
                "level": "2",
                "spelling": "Qingyuan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "441900",
                "name": "东莞市",
                "idxcode": "D",
                "pid": "440000",
                "level": "2",
                "spelling": "Dongguan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "442000",
                "name": "中山市",
                "idxcode": "Z",
                "pid": "440000",
                "level": "2",
                "spelling": "Zhongshan Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "445100",
                "name": "潮州市",
                "idxcode": "C",
                "pid": "440000",
                "level": "2",
                "spelling": "Chaozhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "445200",
                "name": "揭阳市",
                "idxcode": "J",
                "pid": "440000",
                "level": "2",
                "spelling": "Jieyang Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "445300",
                "name": "云浮市",
                "idxcode": "Y",
                "pid": "440000",
                "level": "2",
                "spelling": "Yunfu Shi",
                "regionRange": "2",
                "children": null
              }
            ]
          },
          {
            "id": "450000",
            "name": "广西壮族自治区",
            "idxcode": "G",
            "pid": "100000",
            "level": "1",
            "spelling": "Guangxi Zhuangzu Zizhiqu",
            "regionRange": "2",
            "children": [
              {
                "id": "450100",
                "name": "南宁市",
                "idxcode": "N",
                "pid": "450000",
                "level": "2",
                "spelling": "Nanning Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450200",
                "name": "柳州市",
                "idxcode": "L",
                "pid": "450000",
                "level": "2",
                "spelling": "Liuzhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450300",
                "name": "桂林市",
                "idxcode": "G",
                "pid": "450000",
                "level": "2",
                "spelling": "Guilin Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450400",
                "name": "梧州市",
                "idxcode": "W",
                "pid": "450000",
                "level": "2",
                "spelling": "Wuzhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450500",
                "name": "北海市",
                "idxcode": "B",
                "pid": "450000",
                "level": "2",
                "spelling": "Beihai Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450600",
                "name": "防城港市",
                "idxcode": "F",
                "pid": "450000",
                "level": "2",
                "spelling": "Fangchenggang Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450700",
                "name": "钦州市",
                "idxcode": "Q",
                "pid": "450000",
                "level": "2",
                "spelling": "Qinzhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450800",
                "name": "贵港市",
                "idxcode": "G",
                "pid": "450000",
                "level": "2",
                "spelling": "Guigang Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "450900",
                "name": "玉林市",
                "idxcode": "Y",
                "pid": "450000",
                "level": "2",
                "spelling": "Yulin Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "451000",
                "name": "百色市",
                "idxcode": "B",
                "pid": "450000",
                "level": "2",
                "spelling": "Baise Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "451100",
                "name": "贺州市",
                "idxcode": "H",
                "pid": "450000",
                "level": "2",
                "spelling": "Hezhou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "451200",
                "name": "河池市",
                "idxcode": "H",
                "pid": "450000",
                "level": "2",
                "spelling": "Hechi Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "451300",
                "name": "来宾市",
                "idxcode": "L",
                "pid": "450000",
                "level": "2",
                "spelling": "Laibin Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "451400",
                "name": "崇左市",
                "idxcode": "C",
                "pid": "450000",
                "level": "2",
                "spelling": "Chongzuo Shi",
                "regionRange": "2",
                "children": null
              }
            ]
          },
          {
            "id": "460000",
            "name": "海南省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Hainan Sheng",
            "regionRange": "2",
            "children": [
              {
                "id": "460100",
                "name": "海口市",
                "idxcode": "H",
                "pid": "460000",
                "level": "2",
                "spelling": "Haikou Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "460200",
                "name": "三亚市",
                "idxcode": "S",
                "pid": "460000",
                "level": "2",
                "spelling": "Sanya Shi",
                "regionRange": "2",
                "children": null
              },
              {
                "id": "460300",
                "name": "三沙市",
                "idxcode": null,
                "pid": "460000",
                "level": "2",
                "spelling": null,
                "regionRange": "2",
                "children": null
              },
              {
                "id": "469000",
                "name": "省直辖县级行政区划",
                "idxcode": "s",
                "pid": "460000",
                "level": "2",
                "spelling": "shengzhixiaxianjixingzhengquhua",
                "regionRange": "2",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "华中",
        "children": [
          {
            "id": "410000",
            "name": "河南省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Henan Sheng",
            "regionRange": "3",
            "children": [
              {
                "id": "410100",
                "name": "郑州市",
                "idxcode": "Z",
                "pid": "410000",
                "level": "2",
                "spelling": "Zhengzhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410200",
                "name": "开封市",
                "idxcode": "K",
                "pid": "410000",
                "level": "2",
                "spelling": "Kaifeng Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410300",
                "name": "洛阳市",
                "idxcode": "L",
                "pid": "410000",
                "level": "2",
                "spelling": "Luoyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410400",
                "name": "平顶山市",
                "idxcode": "P",
                "pid": "410000",
                "level": "2",
                "spelling": "Pingdingshan Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410500",
                "name": "安阳市",
                "idxcode": "A",
                "pid": "410000",
                "level": "2",
                "spelling": "Anyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410600",
                "name": "鹤壁市",
                "idxcode": "H",
                "pid": "410000",
                "level": "2",
                "spelling": "Hebi Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410700",
                "name": "新乡市",
                "idxcode": "X",
                "pid": "410000",
                "level": "2",
                "spelling": "Xinxiang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410800",
                "name": "焦作市",
                "idxcode": "J",
                "pid": "410000",
                "level": "2",
                "spelling": "Jiaozuo Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "410900",
                "name": "濮阳市",
                "idxcode": "P",
                "pid": "410000",
                "level": "2",
                "spelling": "Puyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411000",
                "name": "许昌市",
                "idxcode": "X",
                "pid": "410000",
                "level": "2",
                "spelling": "Xuchang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411100",
                "name": "漯河市",
                "idxcode": "L",
                "pid": "410000",
                "level": "2",
                "spelling": "Luohe Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411200",
                "name": "三门峡市",
                "idxcode": "S",
                "pid": "410000",
                "level": "2",
                "spelling": "Sanmenxia Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411300",
                "name": "南阳市",
                "idxcode": "N",
                "pid": "410000",
                "level": "2",
                "spelling": "Nanyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411400",
                "name": "商丘市",
                "idxcode": "S",
                "pid": "410000",
                "level": "2",
                "spelling": "Shangqiu Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411500",
                "name": "信阳市",
                "idxcode": "X",
                "pid": "410000",
                "level": "2",
                "spelling": "Xinyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411600",
                "name": "周口市",
                "idxcode": "Z",
                "pid": "410000",
                "level": "2",
                "spelling": "Zhoukou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "411700",
                "name": "驻马店市",
                "idxcode": "Z",
                "pid": "410000",
                "level": "2",
                "spelling": "Zhumadian Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "419000",
                "name": "省直辖县级行政区划",
                "idxcode": "s",
                "pid": "410000",
                "level": "2",
                "spelling": "shengzhixiaxianjixingzhengquhua",
                "regionRange": "3",
                "children": null
              }
            ]
          },
          {
            "id": "420000",
            "name": "湖北省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Hubei Sheng",
            "regionRange": "3",
            "children": [
              {
                "id": "420100",
                "name": "武汉市",
                "idxcode": "W",
                "pid": "420000",
                "level": "2",
                "spelling": "Wuhan Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420200",
                "name": "黄石市",
                "idxcode": "H",
                "pid": "420000",
                "level": "2",
                "spelling": "Huangshi Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420300",
                "name": "十堰市",
                "idxcode": "S",
                "pid": "420000",
                "level": "2",
                "spelling": "Shiyan Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420500",
                "name": "宜昌市",
                "idxcode": "Y",
                "pid": "420000",
                "level": "2",
                "spelling": "Yichang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420600",
                "name": "襄阳市",
                "idxcode": null,
                "pid": "420000",
                "level": "2",
                "spelling": null,
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420700",
                "name": "鄂州市",
                "idxcode": "E",
                "pid": "420000",
                "level": "2",
                "spelling": "Ezhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420800",
                "name": "荆门市",
                "idxcode": "J",
                "pid": "420000",
                "level": "2",
                "spelling": "Jingmen Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "420900",
                "name": "孝感市",
                "idxcode": "X",
                "pid": "420000",
                "level": "2",
                "spelling": "Xiaogan Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "421000",
                "name": "荆州市",
                "idxcode": "J",
                "pid": "420000",
                "level": "2",
                "spelling": "Jingzhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "421100",
                "name": "黄冈市",
                "idxcode": "H",
                "pid": "420000",
                "level": "2",
                "spelling": "Huanggang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "421200",
                "name": "咸宁市",
                "idxcode": "X",
                "pid": "420000",
                "level": "2",
                "spelling": "Xianning Xian",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "421300",
                "name": "随州市",
                "idxcode": "S",
                "pid": "420000",
                "level": "2",
                "spelling": "Suizhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "422800",
                "name": "恩施土家族苗族自治州",
                "idxcode": "E",
                "pid": "420000",
                "level": "2",
                "spelling": "Enshi Tujiazu Miaozu Zizhizhou",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "429000",
                "name": "省直辖县级行政区划",
                "idxcode": "s",
                "pid": "420000",
                "level": "2",
                "spelling": "shengzhixiaxianjixingzhengquhua",
                "regionRange": "3",
                "children": null
              }
            ]
          },
          {
            "id": "430000",
            "name": "湖南省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Hunan Sheng",
            "regionRange": "3",
            "children": [
              {
                "id": "430100",
                "name": "长沙市",
                "idxcode": "C",
                "pid": "430000",
                "level": "2",
                "spelling": "Changsha Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430200",
                "name": "株洲市",
                "idxcode": "Z",
                "pid": "430000",
                "level": "2",
                "spelling": "Zhuzhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430300",
                "name": "湘潭市",
                "idxcode": "X",
                "pid": "430000",
                "level": "2",
                "spelling": "Xiangtan Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430400",
                "name": "衡阳市",
                "idxcode": "H",
                "pid": "430000",
                "level": "2",
                "spelling": "Hengyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430500",
                "name": "邵阳市",
                "idxcode": "S",
                "pid": "430000",
                "level": "2",
                "spelling": "Shaoyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430600",
                "name": "岳阳市",
                "idxcode": "Y",
                "pid": "430000",
                "level": "2",
                "spelling": "Yueyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430700",
                "name": "常德市",
                "idxcode": "C",
                "pid": "430000",
                "level": "2",
                "spelling": "Changde Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430800",
                "name": "张家界市",
                "idxcode": "Z",
                "pid": "430000",
                "level": "2",
                "spelling": "Zhangjiajie Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "430900",
                "name": "益阳市",
                "idxcode": "Y",
                "pid": "430000",
                "level": "2",
                "spelling": "Yiyang Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "431000",
                "name": "郴州市",
                "idxcode": "C",
                "pid": "430000",
                "level": "2",
                "spelling": "Chenzhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "431100",
                "name": "永州市",
                "idxcode": "Y",
                "pid": "430000",
                "level": "2",
                "spelling": "Yongzhou Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "431200",
                "name": "怀化市",
                "idxcode": "H",
                "pid": "430000",
                "level": "2",
                "spelling": "Huaihua Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "431300",
                "name": "娄底市",
                "idxcode": "L",
                "pid": "430000",
                "level": "2",
                "spelling": "Loudi Shi",
                "regionRange": "3",
                "children": null
              },
              {
                "id": "433100",
                "name": "湘西土家族苗族自治州",
                "idxcode": "X",
                "pid": "430000",
                "level": "2",
                "spelling": "Xiangxi Tujiazu Miaozu Zizhizhou ",
                "regionRange": "3",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "华北",
        "children": [
          {
            "id": "110000",
            "name": "北京市",
            "idxcode": "B",
            "pid": "100000",
            "level": "1",
            "spelling": "Beijing Shi",
            "regionRange": "4",
            "children": [
              {
                "id": "110100",
                "name": "市辖区",
                "idxcode": "S",
                "pid": "110000",
                "level": "2",
                "spelling": "Shixiaqu",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "110200",
                "name": "县",
                "idxcode": "X",
                "pid": "110000",
                "level": "2",
                "spelling": "Xian",
                "regionRange": "4",
                "children": null
              }
            ]
          },
          {
            "id": "120000",
            "name": "天津市",
            "idxcode": "T",
            "pid": "100000",
            "level": "1",
            "spelling": "Tianjin Shi",
            "regionRange": "4",
            "children": [
              {
                "id": "120100",
                "name": "市辖区",
                "idxcode": "S",
                "pid": "120000",
                "level": "2",
                "spelling": "Shixiaqu",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "120200",
                "name": "县",
                "idxcode": "X",
                "pid": "120000",
                "level": "2",
                "spelling": "Xian",
                "regionRange": "4",
                "children": null
              }
            ]
          },
          {
            "id": "130000",
            "name": "河北省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Hebei Sheng",
            "regionRange": "4",
            "children": [
              {
                "id": "130100",
                "name": "石家庄市",
                "idxcode": "S",
                "pid": "130000",
                "level": "2",
                "spelling": "Shijiazhuang Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130200",
                "name": "唐山市",
                "idxcode": "T",
                "pid": "130000",
                "level": "2",
                "spelling": "Tangshan Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130300",
                "name": "秦皇岛市",
                "idxcode": "Q",
                "pid": "130000",
                "level": "2",
                "spelling": "Qinhuangdao Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130400",
                "name": "邯郸市",
                "idxcode": "H",
                "pid": "130000",
                "level": "2",
                "spelling": "Handan Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130500",
                "name": "邢台市",
                "idxcode": "X",
                "pid": "130000",
                "level": "2",
                "spelling": "Xingtai Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130600",
                "name": "保定市",
                "idxcode": "B",
                "pid": "130000",
                "level": "2",
                "spelling": "Baoding Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130700",
                "name": "张家口市",
                "idxcode": "Z",
                "pid": "130000",
                "level": "2",
                "spelling": "Zhangjiakou Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130800",
                "name": "承德市",
                "idxcode": "C",
                "pid": "130000",
                "level": "2",
                "spelling": "Chengde Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "130900",
                "name": "沧州市",
                "idxcode": "C",
                "pid": "130000",
                "level": "2",
                "spelling": "Cangzhou Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "131000",
                "name": "廊坊市",
                "idxcode": "L",
                "pid": "130000",
                "level": "2",
                "spelling": "Langfang Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "131100",
                "name": "衡水市",
                "idxcode": "H",
                "pid": "130000",
                "level": "2",
                "spelling": "Hengshui Shi ",
                "regionRange": "4",
                "children": null
              }
            ]
          },
          {
            "id": "140000",
            "name": "山西省",
            "idxcode": "S",
            "pid": "100000",
            "level": "1",
            "spelling": "Shanxi Sheng ",
            "regionRange": "4",
            "children": [
              {
                "id": "140100",
                "name": "太原市",
                "idxcode": "T",
                "pid": "140000",
                "level": "2",
                "spelling": "Taiyuan Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140200",
                "name": "大同市",
                "idxcode": "D",
                "pid": "140000",
                "level": "2",
                "spelling": "Datong Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140300",
                "name": "阳泉市",
                "idxcode": "Y",
                "pid": "140000",
                "level": "2",
                "spelling": "Yangquan Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140400",
                "name": "长治市",
                "idxcode": "C",
                "pid": "140000",
                "level": "2",
                "spelling": "Changzhi Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140500",
                "name": "晋城市",
                "idxcode": "J",
                "pid": "140000",
                "level": "2",
                "spelling": "Jincheng Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140600",
                "name": "朔州市",
                "idxcode": "S",
                "pid": "140000",
                "level": "2",
                "spelling": "Shuozhou Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140700",
                "name": "晋中市",
                "idxcode": "J",
                "pid": "140000",
                "level": "2",
                "spelling": "Jinzhong Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140800",
                "name": "运城市",
                "idxcode": "Y",
                "pid": "140000",
                "level": "2",
                "spelling": "Yuncheng Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "140900",
                "name": "忻州市",
                "idxcode": "X",
                "pid": "140000",
                "level": "2",
                "spelling": "Xinzhou Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "141000",
                "name": "临汾市",
                "idxcode": "L",
                "pid": "140000",
                "level": "2",
                "spelling": "Linfen Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "141100",
                "name": "吕梁市",
                "idxcode": "L",
                "pid": "140000",
                "level": "2",
                "spelling": "Lvliang Shi",
                "regionRange": "4",
                "children": null
              }
            ]
          },
          {
            "id": "150000",
            "name": "内蒙古自治区",
            "idxcode": "N",
            "pid": "100000",
            "level": "1",
            "spelling": "Nei Mongol Zizhiqu",
            "regionRange": "4",
            "children": [
              {
                "id": "150100",
                "name": "呼和浩特市",
                "idxcode": "H",
                "pid": "150000",
                "level": "2",
                "spelling": "Hohhot Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150200",
                "name": "包头市",
                "idxcode": "B",
                "pid": "150000",
                "level": "2",
                "spelling": "Baotou Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150300",
                "name": "乌海市",
                "idxcode": "W",
                "pid": "150000",
                "level": "2",
                "spelling": "Wuhai Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150400",
                "name": "赤峰市",
                "idxcode": "C",
                "pid": "150000",
                "level": "2",
                "spelling": "Chifeng (Ulanhad)Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150500",
                "name": "通辽市",
                "idxcode": "T",
                "pid": "150000",
                "level": "2",
                "spelling": "Tongliao Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150600",
                "name": "鄂尔多斯市",
                "idxcode": "E",
                "pid": "150000",
                "level": "2",
                "spelling": "Eerduosi Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150700",
                "name": "呼伦贝尔市",
                "idxcode": "H",
                "pid": "150000",
                "level": "2",
                "spelling": "Hulunbeier Shi ",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150800",
                "name": "巴彦淖尔市",
                "idxcode": "B",
                "pid": "150000",
                "level": "2",
                "spelling": "Bayannaoer Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "150900",
                "name": "乌兰察布市",
                "idxcode": "W",
                "pid": "150000",
                "level": "2",
                "spelling": "Wulanchabu Shi",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "152200",
                "name": "兴安盟",
                "idxcode": "H",
                "pid": "150000",
                "level": "2",
                "spelling": "Hinggan Meng",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "152500",
                "name": "锡林郭勒盟",
                "idxcode": "X",
                "pid": "150000",
                "level": "2",
                "spelling": "Xilin Gol Meng",
                "regionRange": "4",
                "children": null
              },
              {
                "id": "152900",
                "name": "阿拉善盟",
                "idxcode": "A",
                "pid": "150000",
                "level": "2",
                "spelling": "Alxa Meng",
                "regionRange": "4",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "西北",
        "children": [
          {
            "id": "610000",
            "name": "陕西省",
            "idxcode": "S",
            "pid": "100000",
            "level": "1",
            "spelling": "Shanxi Sheng ",
            "regionRange": "5",
            "children": [
              {
                "id": "610100",
                "name": "西安市",
                "idxcode": "X",
                "pid": "610000",
                "level": "2",
                "spelling": "Xi,an Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610200",
                "name": "铜川市",
                "idxcode": "T",
                "pid": "610000",
                "level": "2",
                "spelling": "Tongchuang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610300",
                "name": "宝鸡市",
                "idxcode": "B",
                "pid": "610000",
                "level": "2",
                "spelling": "Baoji Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610400",
                "name": "咸阳市",
                "idxcode": "X",
                "pid": "610000",
                "level": "2",
                "spelling": "Xianyang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610500",
                "name": "渭南市",
                "idxcode": "W",
                "pid": "610000",
                "level": "2",
                "spelling": "Weinan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610600",
                "name": "延安市",
                "idxcode": "Y",
                "pid": "610000",
                "level": "2",
                "spelling": "Yan,an Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610700",
                "name": "汉中市",
                "idxcode": "H",
                "pid": "610000",
                "level": "2",
                "spelling": "Hanzhong Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610800",
                "name": "榆林市",
                "idxcode": "Y",
                "pid": "610000",
                "level": "2",
                "spelling": "Yulin Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "610900",
                "name": "安康市",
                "idxcode": "A",
                "pid": "610000",
                "level": "2",
                "spelling": "Ankang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "611000",
                "name": "商洛市",
                "idxcode": "S",
                "pid": "610000",
                "level": "2",
                "spelling": "Shangluo Shi",
                "regionRange": "5",
                "children": null
              }
            ]
          },
          {
            "id": "620000",
            "name": "甘肃省",
            "idxcode": "G",
            "pid": "100000",
            "level": "1",
            "spelling": "Gansu Sheng",
            "regionRange": "5",
            "children": [
              {
                "id": "620100",
                "name": "兰州市",
                "idxcode": "L",
                "pid": "620000",
                "level": "2",
                "spelling": "Lanzhou Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620200",
                "name": "嘉峪关市",
                "idxcode": "J",
                "pid": "620000",
                "level": "2",
                "spelling": "Jiayuguan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620300",
                "name": "金昌市",
                "idxcode": "J",
                "pid": "620000",
                "level": "2",
                "spelling": "Jinchang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620400",
                "name": "白银市",
                "idxcode": "B",
                "pid": "620000",
                "level": "2",
                "spelling": "Baiyin Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620500",
                "name": "天水市",
                "idxcode": "T",
                "pid": "620000",
                "level": "2",
                "spelling": "Tianshui Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620600",
                "name": "武威市",
                "idxcode": "W",
                "pid": "620000",
                "level": "2",
                "spelling": "Wuwei Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620700",
                "name": "张掖市",
                "idxcode": "Z",
                "pid": "620000",
                "level": "2",
                "spelling": "Zhangye Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620800",
                "name": "平凉市",
                "idxcode": "P",
                "pid": "620000",
                "level": "2",
                "spelling": "Pingliang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "620900",
                "name": "酒泉市",
                "idxcode": "J",
                "pid": "620000",
                "level": "2",
                "spelling": "Jiuquan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "621000",
                "name": "庆阳市",
                "idxcode": "Q",
                "pid": "620000",
                "level": "2",
                "spelling": "Qingyang Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "621100",
                "name": "定西市",
                "idxcode": "D",
                "pid": "620000",
                "level": "2",
                "spelling": "Dingxi Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "621200",
                "name": "陇南市",
                "idxcode": "L",
                "pid": "620000",
                "level": "2",
                "spelling": "Longnan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "622900",
                "name": "临夏回族自治州",
                "idxcode": "L",
                "pid": "620000",
                "level": "2",
                "spelling": "Linxia Huizu Zizhizhou ",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "623000",
                "name": "甘南藏族自治州",
                "idxcode": "G",
                "pid": "620000",
                "level": "2",
                "spelling": "Gannan Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              }
            ]
          },
          {
            "id": "630000",
            "name": "青海省",
            "idxcode": "Q",
            "pid": "100000",
            "level": "1",
            "spelling": "Qinghai Sheng",
            "regionRange": "5",
            "children": [
              {
                "id": "630100",
                "name": "西宁市",
                "idxcode": "X",
                "pid": "630000",
                "level": "2",
                "spelling": "Xining Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "630200",
                "name": "海东市",
                "idxcode": null,
                "pid": "630000",
                "level": "2",
                "spelling": null,
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632200",
                "name": "海北藏族自治州",
                "idxcode": "H",
                "pid": "630000",
                "level": "2",
                "spelling": "Haibei Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632300",
                "name": "黄南藏族自治州",
                "idxcode": "H",
                "pid": "630000",
                "level": "2",
                "spelling": "Huangnan Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632500",
                "name": "海南藏族自治州",
                "idxcode": "H",
                "pid": "630000",
                "level": "2",
                "spelling": "Hainan Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632600",
                "name": "果洛藏族自治州",
                "idxcode": "G",
                "pid": "630000",
                "level": "2",
                "spelling": "Golog Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632700",
                "name": "玉树藏族自治州",
                "idxcode": "Y",
                "pid": "630000",
                "level": "2",
                "spelling": "Yushu Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "632800",
                "name": "海西蒙古族藏族自治州",
                "idxcode": "H",
                "pid": "630000",
                "level": "2",
                "spelling": "Haixi Mongolzu Zangzu Zizhizhou",
                "regionRange": "5",
                "children": null
              }
            ]
          },
          {
            "id": "640000",
            "name": "宁夏回族自治区",
            "idxcode": "N",
            "pid": "100000",
            "level": "1",
            "spelling": "Ningxia Huizu Zizhiqu",
            "regionRange": "5",
            "children": [
              {
                "id": "640100",
                "name": "银川市",
                "idxcode": "Y",
                "pid": "640000",
                "level": "2",
                "spelling": "Yinchuan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "640200",
                "name": "石嘴山市",
                "idxcode": "S",
                "pid": "640000",
                "level": "2",
                "spelling": "Shizuishan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "640300",
                "name": "吴忠市",
                "idxcode": "W",
                "pid": "640000",
                "level": "2",
                "spelling": "Wuzhong Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "640400",
                "name": "固原市",
                "idxcode": "G",
                "pid": "640000",
                "level": "2",
                "spelling": "Guyuan Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "640500",
                "name": "中卫市",
                "idxcode": "Z",
                "pid": "640000",
                "level": "2",
                "spelling": "Zhongwei Shi",
                "regionRange": "5",
                "children": null
              }
            ]
          },
          {
            "id": "650000",
            "name": "新疆维吾尔自治区",
            "idxcode": "X",
            "pid": "100000",
            "level": "1",
            "spelling": "Xinjiang Uygur Zizhiqu",
            "regionRange": "5",
            "children": [
              {
                "id": "650100",
                "name": "乌鲁木齐市",
                "idxcode": "U",
                "pid": "650000",
                "level": "2",
                "spelling": "Urumqi Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "650200",
                "name": "克拉玛依市",
                "idxcode": "K",
                "pid": "650000",
                "level": "2",
                "spelling": "Karamay Shi",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652100",
                "name": "吐鲁番地区",
                "idxcode": "T",
                "pid": "650000",
                "level": "2",
                "spelling": "Turpan Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652200",
                "name": "哈密地区",
                "idxcode": "H",
                "pid": "650000",
                "level": "2",
                "spelling": "Hami(kumul) Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652300",
                "name": "昌吉回族自治州",
                "idxcode": "C",
                "pid": "650000",
                "level": "2",
                "spelling": "Changji Huizu Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652700",
                "name": "博尔塔拉蒙古自治州",
                "idxcode": "B",
                "pid": "650000",
                "level": "2",
                "spelling": "Bortala Monglo Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652800",
                "name": "巴音郭楞蒙古自治州",
                "idxcode": "b",
                "pid": "650000",
                "level": "2",
                "spelling": "bayinguolengmengguzizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "652900",
                "name": "阿克苏地区",
                "idxcode": "A",
                "pid": "650000",
                "level": "2",
                "spelling": "Aksu Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "653000",
                "name": "克孜勒苏柯尔克孜自治州",
                "idxcode": "K",
                "pid": "650000",
                "level": "2",
                "spelling": "Kizilsu Kirgiz Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "653100",
                "name": "喀什地区",
                "idxcode": "K",
                "pid": "650000",
                "level": "2",
                "spelling": "Kashi(Kaxgar) Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "653200",
                "name": "和田地区",
                "idxcode": "H",
                "pid": "650000",
                "level": "2",
                "spelling": "Hotan Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "654000",
                "name": "伊犁哈萨克自治州",
                "idxcode": "I",
                "pid": "650000",
                "level": "2",
                "spelling": "Ili Kazak Zizhizhou",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "654200",
                "name": "塔城地区",
                "idxcode": "T",
                "pid": "650000",
                "level": "2",
                "spelling": "Tacheng(Qoqek) Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "654300",
                "name": "阿勒泰地区",
                "idxcode": "A",
                "pid": "650000",
                "level": "2",
                "spelling": "Altay Diqu",
                "regionRange": "5",
                "children": null
              },
              {
                "id": "659000",
                "name": "自治区直辖县级行政区划",
                "idxcode": "z",
                "pid": "650000",
                "level": "2",
                "spelling": "zizhiquzhixiaxianjixingzhengquhua",
                "regionRange": "5",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "西南",
        "children": [
          {
            "id": "500000",
            "name": "重庆市",
            "idxcode": "C",
            "pid": "100000",
            "level": "1",
            "spelling": "Chongqing Shi",
            "regionRange": "6",
            "children": [
              {
                "id": "500100",
                "name": "市辖区",
                "idxcode": "S",
                "pid": "500000",
                "level": "2",
                "spelling": "Shixiaqu",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "500200",
                "name": "县",
                "idxcode": "X",
                "pid": "500000",
                "level": "2",
                "spelling": "Xian",
                "regionRange": "6",
                "children": null
              }
            ]
          },
          {
            "id": "510000",
            "name": "四川省",
            "idxcode": "S",
            "pid": "100000",
            "level": "1",
            "spelling": "Sichuan Sheng",
            "regionRange": "6",
            "children": [
              {
                "id": "510100",
                "name": "成都市",
                "idxcode": "C",
                "pid": "510000",
                "level": "2",
                "spelling": "Chengdu Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510300",
                "name": "自贡市",
                "idxcode": "Z",
                "pid": "510000",
                "level": "2",
                "spelling": "Zigong Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510400",
                "name": "攀枝花市",
                "idxcode": "P",
                "pid": "510000",
                "level": "2",
                "spelling": "Panzhihua Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510500",
                "name": "泸州市",
                "idxcode": "L",
                "pid": "510000",
                "level": "2",
                "spelling": "Luzhou Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510600",
                "name": "德阳市",
                "idxcode": "D",
                "pid": "510000",
                "level": "2",
                "spelling": "Deyang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510700",
                "name": "绵阳市",
                "idxcode": "M",
                "pid": "510000",
                "level": "2",
                "spelling": "Mianyang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510800",
                "name": "广元市",
                "idxcode": "G",
                "pid": "510000",
                "level": "2",
                "spelling": "Guangyuan Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "510900",
                "name": "遂宁市",
                "idxcode": "S",
                "pid": "510000",
                "level": "2",
                "spelling": "Suining Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511000",
                "name": "内江市",
                "idxcode": "N",
                "pid": "510000",
                "level": "2",
                "spelling": "Neijiang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511100",
                "name": "乐山市",
                "idxcode": "L",
                "pid": "510000",
                "level": "2",
                "spelling": "Leshan Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511300",
                "name": "南充市",
                "idxcode": "N",
                "pid": "510000",
                "level": "2",
                "spelling": "Nanchong Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511400",
                "name": "眉山市",
                "idxcode": "M",
                "pid": "510000",
                "level": "2",
                "spelling": "Meishan Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511500",
                "name": "宜宾市",
                "idxcode": "Y",
                "pid": "510000",
                "level": "2",
                "spelling": "Yibin Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511600",
                "name": "广安市",
                "idxcode": "G",
                "pid": "510000",
                "level": "2",
                "spelling": "Guang,an Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511700",
                "name": "达州市",
                "idxcode": "D",
                "pid": "510000",
                "level": "2",
                "spelling": "Dazhou Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511800",
                "name": "雅安市",
                "idxcode": "Y",
                "pid": "510000",
                "level": "2",
                "spelling": "Ya,an Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "511900",
                "name": "巴中市",
                "idxcode": "B",
                "pid": "510000",
                "level": "2",
                "spelling": "Bazhong Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "512000",
                "name": "资阳市",
                "idxcode": "Z",
                "pid": "510000",
                "level": "2",
                "spelling": "Ziyang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "513200",
                "name": "阿坝藏族羌族自治州",
                "idxcode": "A",
                "pid": "510000",
                "level": "2",
                "spelling": "Aba(Ngawa) Zangzu Qiangzu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "513300",
                "name": "甘孜藏族自治州",
                "idxcode": "G",
                "pid": "510000",
                "level": "2",
                "spelling": "Garze Zangzu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "513400",
                "name": "凉山彝族自治州",
                "idxcode": "L",
                "pid": "510000",
                "level": "2",
                "spelling": "Liangshan Yizu Zizhizhou",
                "regionRange": "6",
                "children": null
              }
            ]
          },
          {
            "id": "520000",
            "name": "贵州省",
            "idxcode": "G",
            "pid": "100000",
            "level": "1",
            "spelling": "Guizhou Sheng",
            "regionRange": "6",
            "children": [
              {
                "id": "520100",
                "name": "贵阳市",
                "idxcode": "G",
                "pid": "520000",
                "level": "2",
                "spelling": "Guiyang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "520200",
                "name": "六盘水市",
                "idxcode": "L",
                "pid": "520000",
                "level": "2",
                "spelling": "Liupanshui Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "520300",
                "name": "遵义市",
                "idxcode": "Z",
                "pid": "520000",
                "level": "2",
                "spelling": "Zunyi Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "520400",
                "name": "安顺市",
                "idxcode": "A",
                "pid": "520000",
                "level": "2",
                "spelling": "Anshun Xian",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "520500",
                "name": "毕节市",
                "idxcode": "B",
                "pid": "520000",
                "level": "2",
                "spelling": "Bijie Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "520600",
                "name": "铜仁市",
                "idxcode": "T",
                "pid": "520000",
                "level": "2",
                "spelling": "Tongren Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "522300",
                "name": "黔西南布依族苗族自治州",
                "idxcode": "Q",
                "pid": "520000",
                "level": "2",
                "spelling": "Qianxinan Buyeizu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "522600",
                "name": "黔东南苗族侗族自治州",
                "idxcode": "Q",
                "pid": "520000",
                "level": "2",
                "spelling": "Qiandongnan Miaozu Dongzu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "522700",
                "name": "黔南布依族苗族自治州",
                "idxcode": "Q",
                "pid": "520000",
                "level": "2",
                "spelling": "Qiannan Buyeizu Miaozu Zizhizhou",
                "regionRange": "6",
                "children": null
              }
            ]
          },
          {
            "id": "530000",
            "name": "云南省",
            "idxcode": "Y",
            "pid": "100000",
            "level": "1",
            "spelling": "Yunnan Sheng",
            "regionRange": "6",
            "children": [
              {
                "id": "530100",
                "name": "昆明市",
                "idxcode": "K",
                "pid": "530000",
                "level": "2",
                "spelling": "Kunming Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530300",
                "name": "曲靖市",
                "idxcode": "Q",
                "pid": "530000",
                "level": "2",
                "spelling": "Qujing Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530400",
                "name": "玉溪市",
                "idxcode": "Y",
                "pid": "530000",
                "level": "2",
                "spelling": "Yuxi Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530500",
                "name": "保山市",
                "idxcode": "B",
                "pid": "530000",
                "level": "2",
                "spelling": "Baoshan Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530600",
                "name": "昭通市",
                "idxcode": "Z",
                "pid": "530000",
                "level": "2",
                "spelling": "Zhaotong Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530700",
                "name": "丽江市",
                "idxcode": "L",
                "pid": "530000",
                "level": "2",
                "spelling": "Lijiang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530800",
                "name": "普洱市",
                "idxcode": "S",
                "pid": "530000",
                "level": "2",
                "spelling": "Simao Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "530900",
                "name": "临沧市",
                "idxcode": "L",
                "pid": "530000",
                "level": "2",
                "spelling": "Lincang Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "532300",
                "name": "楚雄彝族自治州",
                "idxcode": "C",
                "pid": "530000",
                "level": "2",
                "spelling": "Chuxiong Yizu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "532500",
                "name": "红河哈尼族彝族自治州",
                "idxcode": "H",
                "pid": "530000",
                "level": "2",
                "spelling": "Honghe Hanizu Yizu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "532600",
                "name": "文山壮族苗族自治州",
                "idxcode": "W",
                "pid": "530000",
                "level": "2",
                "spelling": "Wenshan Zhuangzu Miaozu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "532800",
                "name": "西双版纳傣族自治州",
                "idxcode": "X",
                "pid": "530000",
                "level": "2",
                "spelling": "Xishuangbanna Daizu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "532900",
                "name": "大理白族自治州",
                "idxcode": "D",
                "pid": "530000",
                "level": "2",
                "spelling": "Dali Baizu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "533100",
                "name": "德宏傣族景颇族自治州",
                "idxcode": "D",
                "pid": "530000",
                "level": "2",
                "spelling": "Dehong Daizu Jingpozu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "533300",
                "name": "怒江傈僳族自治州",
                "idxcode": "N",
                "pid": "530000",
                "level": "2",
                "spelling": "Nujiang Lisuzu Zizhizhou",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "533400",
                "name": "迪庆藏族自治州",
                "idxcode": "D",
                "pid": "530000",
                "level": "2",
                "spelling": "Deqen Zangzu Zizhizhou",
                "regionRange": "6",
                "children": null
              }
            ]
          },
          {
            "id": "540000",
            "name": "西藏自治区",
            "idxcode": "X",
            "pid": "100000",
            "level": "1",
            "spelling": "Xizang Zizhiqu",
            "regionRange": "6",
            "children": [
              {
                "id": "540100",
                "name": "拉萨市",
                "idxcode": "L",
                "pid": "540000",
                "level": "2",
                "spelling": "Lhasa Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "540200",
                "name": "日喀则市",
                "idxcode": "X",
                "pid": "540000",
                "level": "2",
                "spelling": "Xigaze Shi",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "542100",
                "name": "昌都地区",
                "idxcode": "Q",
                "pid": "540000",
                "level": "2",
                "spelling": "Qamdo Diqu",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "542200",
                "name": "山南地区",
                "idxcode": "S",
                "pid": "540000",
                "level": "2",
                "spelling": "Shannan Diqu",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "542400",
                "name": "那曲地区",
                "idxcode": "N",
                "pid": "540000",
                "level": "2",
                "spelling": "Nagqu Diqu",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "542500",
                "name": "阿里地区",
                "idxcode": "N",
                "pid": "540000",
                "level": "2",
                "spelling": "Ngari Diqu",
                "regionRange": "6",
                "children": null
              },
              {
                "id": "542600",
                "name": "林芝地区",
                "idxcode": "N",
                "pid": "540000",
                "level": "2",
                "spelling": "Nyingchi Diqu",
                "regionRange": "6",
                "children": null
              }
            ]
          }
        ]
      },
      {
        "regionRange": "东北",
        "children": [
          {
            "id": "210000",
            "name": "辽宁省",
            "idxcode": "L",
            "pid": "100000",
            "level": "1",
            "spelling": "Liaoning Sheng",
            "regionRange": "7",
            "children": [
              {
                "id": "210100",
                "name": "沈阳市",
                "idxcode": "S",
                "pid": "210000",
                "level": "2",
                "spelling": "Shenyang Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210200",
                "name": "大连市",
                "idxcode": "D",
                "pid": "210000",
                "level": "2",
                "spelling": "Dalian Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210300",
                "name": "鞍山市",
                "idxcode": "A",
                "pid": "210000",
                "level": "2",
                "spelling": "AnShan Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210400",
                "name": "抚顺市",
                "idxcode": "F",
                "pid": "210000",
                "level": "2",
                "spelling": "Fushun Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210500",
                "name": "本溪市",
                "idxcode": "B",
                "pid": "210000",
                "level": "2",
                "spelling": "Benxi Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210600",
                "name": "丹东市",
                "idxcode": "D",
                "pid": "210000",
                "level": "2",
                "spelling": "Dandong Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210700",
                "name": "锦州市",
                "idxcode": "J",
                "pid": "210000",
                "level": "2",
                "spelling": "Jinzhou Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210800",
                "name": "营口市",
                "idxcode": "Y",
                "pid": "210000",
                "level": "2",
                "spelling": "Yingkou Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "210900",
                "name": "阜新市",
                "idxcode": "F",
                "pid": "210000",
                "level": "2",
                "spelling": "Fuxin Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "211000",
                "name": "辽阳市",
                "idxcode": "L",
                "pid": "210000",
                "level": "2",
                "spelling": "Liaoyang Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "211100",
                "name": "盘锦市",
                "idxcode": "P",
                "pid": "210000",
                "level": "2",
                "spelling": "Panjin Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "211200",
                "name": "铁岭市",
                "idxcode": "T",
                "pid": "210000",
                "level": "2",
                "spelling": "Tieling Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "211300",
                "name": "朝阳市",
                "idxcode": "C",
                "pid": "210000",
                "level": "2",
                "spelling": "Chaoyang Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "211400",
                "name": "葫芦岛市",
                "idxcode": "H",
                "pid": "210000",
                "level": "2",
                "spelling": "Huludao Shi",
                "regionRange": "7",
                "children": null
              }
            ]
          },
          {
            "id": "220000",
            "name": "吉林省",
            "idxcode": "J",
            "pid": "100000",
            "level": "1",
            "spelling": "Jilin Sheng",
            "regionRange": "7",
            "children": [
              {
                "id": "220100",
                "name": "长春市",
                "idxcode": "C",
                "pid": "220000",
                "level": "2",
                "spelling": "Changchun Shi ",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220200",
                "name": "吉林市",
                "idxcode": "J",
                "pid": "220000",
                "level": "2",
                "spelling": "Jilin Shi ",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220300",
                "name": "四平市",
                "idxcode": "S",
                "pid": "220000",
                "level": "2",
                "spelling": "Siping Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220400",
                "name": "辽源市",
                "idxcode": "L",
                "pid": "220000",
                "level": "2",
                "spelling": "Liaoyuan Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220500",
                "name": "通化市",
                "idxcode": "T",
                "pid": "220000",
                "level": "2",
                "spelling": "Tonghua Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220600",
                "name": "白山市",
                "idxcode": "B",
                "pid": "220000",
                "level": "2",
                "spelling": "Baishan Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220700",
                "name": "松原市",
                "idxcode": "S",
                "pid": "220000",
                "level": "2",
                "spelling": "Songyuan Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "220800",
                "name": "白城市",
                "idxcode": "B",
                "pid": "220000",
                "level": "2",
                "spelling": "Baicheng Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "222400",
                "name": "延边朝鲜族自治州",
                "idxcode": "Y",
                "pid": "220000",
                "level": "2",
                "spelling": "Yanbian Chosenzu Zizhizhou",
                "regionRange": "7",
                "children": null
              }
            ]
          },
          {
            "id": "230000",
            "name": "黑龙江省",
            "idxcode": "H",
            "pid": "100000",
            "level": "1",
            "spelling": "Heilongjiang Sheng",
            "regionRange": "7",
            "children": [
              {
                "id": "230100",
                "name": "哈尔滨市",
                "idxcode": "H",
                "pid": "230000",
                "level": "2",
                "spelling": "Harbin Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230200",
                "name": "齐齐哈尔市",
                "idxcode": "Q",
                "pid": "230000",
                "level": "2",
                "spelling": "Qiqihar Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230300",
                "name": "鸡西市",
                "idxcode": "J",
                "pid": "230000",
                "level": "2",
                "spelling": "Jixi Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230400",
                "name": "鹤岗市",
                "idxcode": "H",
                "pid": "230000",
                "level": "2",
                "spelling": "Hegang Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230500",
                "name": "双鸭山市",
                "idxcode": "S",
                "pid": "230000",
                "level": "2",
                "spelling": "Shuangyashan Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230600",
                "name": "大庆市",
                "idxcode": "D",
                "pid": "230000",
                "level": "2",
                "spelling": "Daqing Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230700",
                "name": "伊春市",
                "idxcode": "Y",
                "pid": "230000",
                "level": "2",
                "spelling": "Yichun Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230800",
                "name": "佳木斯市",
                "idxcode": "J",
                "pid": "230000",
                "level": "2",
                "spelling": "Jiamusi Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "230900",
                "name": "七台河市",
                "idxcode": "Q",
                "pid": "230000",
                "level": "2",
                "spelling": "Qitaihe Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "231000",
                "name": "牡丹江市",
                "idxcode": "M",
                "pid": "230000",
                "level": "2",
                "spelling": "Mudanjiang Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "231100",
                "name": "黑河市",
                "idxcode": "H",
                "pid": "230000",
                "level": "2",
                "spelling": "Heihe Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "231200",
                "name": "绥化市",
                "idxcode": "S",
                "pid": "230000",
                "level": "2",
                "spelling": "Suihua Shi",
                "regionRange": "7",
                "children": null
              },
              {
                "id": "232700",
                "name": "大兴安岭地区",
                "idxcode": "D",
                "pid": "230000",
                "level": "2",
                "spelling": "Da Hinggan Ling Diqu",
                "regionRange": "7",
                "children": null
              }
            ]
          }
        ]
      }
    ]
    return data;    
});