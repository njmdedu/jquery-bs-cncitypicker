### jquery-city-picker

##Document

### Html:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>jquery-bs-citypicker</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href=".css/index.css" rel="stylesheet">
  </head>
  <body>
    <div class="container ">
      <div class="mydemo">Demo:</div>
      <form class="form-inline">
        <div id="cncity" class="form-group">
          <select data-placeholder = "-请选择-" class="form-control">
          </select>

          <select data-placeholder = "-请选择-" class="form-control">
          </select>

          <select data-placeholder = "-请选择-" class="form-control">
          </select>
        </div>
      </form>
    </div>

    <script src="https://cdn.bootcss.com/jquery/2.2.2/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="./js/jquery.bs.cncitypicker.js"></script>
    <script>   
      var city = $('#cncity').cncitypicker();
    </script>
  </body>
</html>
```
### Property：

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

### Methods

```
getNameByCode

getCodeAndName

getProvinceAndCityByDistrictCode
```

### Events：

```
onProvinceChange

onCityChange

onDistrictChange

```
