# jquery-bs-cncitypicker

A simple jQuery plugin for picking provinces, cities and districts of China.

## Table of contents

- [Property](#Property)
- [Methods](#Methods)
- [Events](#Events)

## API

## Requirement:

Html:
```
<div id="cncity" class="form-group">
  <select data-placeholder = "-请选择-" class="form-control">
  </select>
  <select data-placeholder = "-请选择-" class="form-control">
  </select>
  <select data-placeholder = "-请选择-" class="form-control">
  </select>
</div>
```

Javascript:
```
<script src="https://cdn.bootcss.com/jquery/2.2.2/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="./js/jquery.bs.cncitypicker.js"></script>
```

Usage:
```
var city = $('#cncity').cncitypicker();
```

[⬆ back to top](#table-of-contents)

## Property

```
validate:false,
province: {
  value:'',
  placeholder:'-请选择省-'
},
city : {
  value:'',
  placeholder:'-请选择市-'
},
district : {
  value:'',
  placeholder:'-请选择县-'
},

```

## Methods

```
getNameByCode //根据code获取相应名称城市
eg:city.getNameByCode(code);

getCodeAndName  //获取选中的代码和名称
eg:city.getCodeAndName();

getProvinceAndCityByDistrictCode  //根据区县code获取所在的省和市
eg:city.getProvinceAndCityByDistrictCode(code);
```

## Events

```
onProvinceChange  //当改变省份时触发事件
onCityChange      //当改变城市时触发事件
onDistrictChange  //当改变区域时触发事件

eg:
$('#cncity').cncitypicker({
    onProvinceChange:function(){

    },
    onCityChange:function(){

    },
    onDistrictChange:function(){

    }
});

```
