# jquery-bs-cncitypicker

A simple jQuery plugin for picking provinces, cities and districts of China.

## Table of contents

- [Property](#property)
- [Methods](#methods)
- [Events](#events)

## API

### Requirement:

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

## Property

### autoSelectFromUrl:bool

是否自动从url获取省市区参数code选中相应select，默认：false

### selectFromUrl:object

设置从url获取省市区参数code对应的参数名，object键值对如下：

```
{
  province_param:'province',
  city_param:'city',
  district_param:'district'
}
```

### validate:bool

是否验证select是否已经选中值，默认：false

### province:object

设置省的默认值code和未选中时的提示，object键值对如下：

```
{
  code:'',
  placeholder:'-请选择省-'
}
```

### city:object

设置市的默认值code和未选中时的提示，object键值对如下：

```
{
  code:'',
  placeholder:'-请选择市-'
}
```

### district:object

设置区的默认值code和未选中时的提示，object键值对如下：

```
{
  code:'',
  placeholder:'-请选择市-'
}
```

## Methods

### getNameByCode(code)

根据code获取相应名称城市

### getCodeAndName()

获取选中的代码和名称

### getProvinceAndCityByDistrictCode(code)

根据区县code获取所在的省和市

### getParamFromUrl(param)

从url中获取参数是param的值


## Events

### onProvinceChange

当改变省份时触发事件

### onCityChange

当改变城市时触发事件

### onDistrictChange

当改变区域时触发事件

eg:

```
$('#cncity').cncitypicker({
    onProvinceChange:function(){

    },
    onCityChange:function(){

    },
    onDistrictChange:function(){

    }
});
```
[⬆ back to top](#table-of-contents)
