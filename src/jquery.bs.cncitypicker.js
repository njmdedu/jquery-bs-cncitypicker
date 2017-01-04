/*
1、引用类型问题用$.extend([],obj1,obj2)解决
2、事件代理问题用$.proxy(function,this)解决
3、注意：autoSelect和autoSelectFromUrl如果都设置成true，优先autoSelectFromUrl
*/
;(function($, window, document,undefined) {
    var CnCityPicker = function(ele, opt) {
        this.$element = $(ele),
        this.defaults = {
            //---------------------------------------属性--------------------------------------
            //设置从url里获取的参数
            autoSelectFromUrl: false,
            selectFromUrl:{
              province_param: 'province',
              city_param: 'city',
              district_param: 'district',
            },

            validate: false,
            //暂时不需要默认选中功能
            autoSelect: false,
            province: {
              code: '',
              placeholder: '-请选择-'
            },
            city: {
              code: '',
              placeholder: '-请选择-'
            },
            district: {
              code: '',
              placeholder: '-请选择-'
            },
            onProvinceChange: function(){

            },
            onCityChange: function(){

            },
            onDistrictChange: function(){

            }
        },
        this.options = $.extend({}, this.defaults, opt),
        //设置配置好的中国地理位置区域数据
        this.citydata = $.chinaLocationData;
        //保存当前选中的省市区数据，后面的数据都是从这里取，第一次还是从this.citydata里面获取数据
        this.pcd ={
          'provinces' : [],
          'citys' : [],
          'districts' : []
        }
    }
    //方法
    CnCityPicker.prototype = {
      //---------------------------------------私有方法--------------------------------------
        _init: function() {
            var self = this;
            //从DOM中获取用户写好的省市区select的DOM
            var $selects = self.$element.find('select');

            //根据选中的select设置省市区的$元素
            $.each(['province', 'city', 'district'], function(i, type){
              self['$'+type] = $selects.eq(i);
            });
            //-------------------------------------------------
            if(self.options.autoSelectFromUrl){
              self.options.province.code = self.getParamFromUrl(self.options.selectFromUrl.province_param);
              self.options.city.code = self.getParamFromUrl(self.options.selectFromUrl.city_param);
              self.options.district.code = self.getParamFromUrl(self.options.selectFromUrl.district_param);
            }
            //------------------------------------------------
            self._event();
            //------------------------------------------------
            self.reset();
            //------------------------------------------------
            if(self.options.validate){
              setInterval(function () {
                self._validate();
              }, 100);
            }

            //self.options.autoSelectFromUrl = false;
            return self;
        },
        _event: function(){
          var self = this;
          if (self.$province) {
            self.$province.on('change.cncitypicker', (self.onChangeProvince = $.proxy(function(){
              self._output('city');
              self._output('district');
              //触发onProvinceChange事件
              $.proxy(self.options.onProvinceChange , self.$province)();
            }, self)));
          }

          if (self.$city) {
            self.$city.on('change.cncitypicker', (self.onChangeCity = $.proxy(function(){
              self._output('district');

              //触发onProvinceChange事件
              $.proxy(self.options.onCityChange , self.$city)();
            }, self)));
          }

          if(self.$district){
            self.$district.on('change.cncitypicker',(self.onChangeDistrict = $.proxy(function(){
              //触发onDistrictChange事件
              $.proxy(self.options.onDistrictChange , self.$district)();
            },self)))
          }
        },
        _removeEvent: function() {
          var self = this;

          if (self.$province) {
            self.$province.off('change.cncitypicker');
          }

          if (self.$city) {
            self.$city.off('change.cncitypicker');
          }
        },
        _output: function(type){
          var self = this;
          var options = self.options;
          var citydata = self.citydata;
          var $select = self['$'+type];
          var code;

          if (!$select || !$select.length) {
            return;
          }

          switch (type) {
            case 'province':
              code = "";
              break;
            case 'city':
              //self.options.district.value
              //获取已选择的省code，然后到self.pcd.province里面查询，返回所属的市数据
              code = self.$province && (self.$province.find(':selected').data('code').toString() || "");
              break;
            case 'district':
              ////获取已选择的市code，然后到self.pcd.city里面查询，返回所属的市数据
              code = self.$city && (self.$city.find(':selected').data('code').toString() || "");
              break;
          }

          var cncity = self._getCityList(type,code);
          var placeholder = self.options[type].placeholder;
          if (placeholder) {
            cncity.unshift({
              code: '',
              name: placeholder,
              selected: true
            });
          }

          if (cncity.length) {
            $select.html(self._getDomList(cncity));
          } else {
            $select.empty();
          }
        },
        _getDomList:function(data){
          const options = this.options;
          const list = [];

          $.each(data, function(i, n){
            const attrs = [
              'data-code="' + n.code + '"',
              'data-text="' + n.name + '"',
              'value = "' + n.name + '"'
            ];
            if (n.selected) {
              attrs.push('selected');
            }
            list.push('<option '+ attrs.join(' ') + '>'+ n.name +'</option>');
          });
          return list.join('');
        },
        _getCityList:function(type, code) {
          var self = this;
          var data = [];
          switch (type) {
            case 'province':
              $.each(self.citydata,function(index, obj){
                data.push({
                  name : obj.name,
                  code : obj.code,
                  sub : obj.sub,
                  selected: self.options.autoSelectFromUrl && obj.code == self.options.province.code
                });
              });
              self.pcd.provinces = $.extend([], data);
              break;
            case 'city':
              $.each(self.pcd.provinces,function(index, obj){
                if(obj.code === code){
                  $.each(obj.sub,function(i,o){
                    data.push({
                      name : o.name,
                      code : o.code,
                      sub : o.sub,
                      selected: self.options.autoSelectFromUrl && o.code == self.options.city.code
                    });
                  })
                  return false;
                }
              });
              self.pcd.citys = $.extend([], data);
              break;
            case 'district':
              $.each(self.pcd.citys,function(index, obj){
                if(obj.code === code){
                  $.each(obj.sub,function(i,o){
                    data.push({
                      name : o.name,
                      code : o.code,
                      sub : o.sub,
                      selected: self.options.autoSelectFromUrl && o.code == self.options.district.code
                    });
                  })
                  return false;
                }
              });
              self.pcd.districts = $.extend([], data);
              break;
          }
          return data;
        },
        _getCodeObj:function(data, fixValue, interval){
          var obj;
          $.each(data, function(index, arr){
            if(arr.code.substring((interval-1)*2, 2*interval) == fixValue ){
              obj = arr;
              return false;
            }
          });
          return obj;
        },
        //验证select是否选中，根据用户设置的validate来判断，默认validata=false
        _validate:function(){
          var self = this;

          var province = self.$province.find(':selected').data('code').toString();
          var city = self.$city.find(':selected').data('code').toString();
          var district = self.$district.find(':selected').data('code').toString();

          if(!province){
            self.$province.addClass('has-error');
          }else{
            self.$province.removeClass('has-error');
          }
          if(!city){
            self.$city.addClass('has-error');
          }else{
            self.$city.removeClass('has-error');
          }
          if(!district){
            self.$district.addClass('has-error');
          }else{
            self.$district.removeClass('has-error');
          }
          //todo:这里要不要释放内存
        },
        //---------------------------------------公有方法--------------------------------------
        reset:function(){
          const self = this;

          self._output('province');
          self._output('city');
          self._output('district');
        },
        destory:function(){
          //todo:
        },
        //根据code获取相应名称城市
        getNameByCode:function(code){
          var self = this;
          var name = '';
          if(!code){
            throw '方法：getNameByCode，参数：code不能为空';
          }
          if(typeof code != 'string'){
            code = code.toString();
          }
          if(code.length > 6){
            throw '方法：getNameByCode，参数：code长度超过最大限度';
          }

          var fix = [];
          fix.push(code.substring(0,2));
          fix.push(code.substring(2,4));
          fix.push(code.substring(4,6));

          var reData = self.citydata;
          for(var i=1; i<=3; i++){
            reData = self._getCodeObj(reData, fix[i-1], i);
            if(reData.code == code){
              name = reData.name;
              break;
            }
            reData = reData.sub;
          }
          return name;
        },
        //获取选中的代码和名称
        getCodeAndName:function(){
          var self = this;
          var data = {
            name:[],
            code:[]
          };

          var provinceCode = self.$province && (self.$province.find(':selected').data('code').toString() || "");
          var provinceName = self.$province && (self.$province.find(':selected').data('text').toString() || "");
          var cityCode = self.$city && (self.$city.find(':selected').data('code').toString() || "");
          var cityName = self.$city && (self.$city.find(':selected').data('text').toString() || "");
          var districtCode = self.$district && (self.$district.find(':selected').data('code').toString() || "");
          var districtName = self.$district && (self.$district.find(':selected').data('text').toString() || "");

          if(provinceCode && provinceName){
            data.code.push(provinceCode);
            data.name.push(provinceName);
            if(cityCode && cityName){
              data.code.push(cityCode);
              data.name.push(cityName);
              if(districtCode && districtName){
                data.code.push(districtCode);
                data.name.push(districtName);
              }
            }
          }
          return data;
        },
        //根据区县获取所在的省和市
        getProvinceAndCityByDistrictCode:function(code){
          var self = this;
          var names = [];
          if(!code){
            throw '方法：getProvinceAndCityByDistrictCode，参数：code不能为空';
          }
          if(typeof code != 'string'){
            code = code.toString();
          }
          if(code.length > 6){
            throw '方法：getNameByCode，参数：code长度超过最大限度';
          }
          if(code.substring(4) == "00"){
            throw '方法：getProvinceAndCityByDistrictCode，参数：code不能为省和市，只能是区县';
          }

          var fix = [];
          fix.push(code.substring(0,2));
          fix.push(code.substring(2,4));

          var reData = self.citydata;
          reData = self._getCodeObj(reData, fix[0], 1);
          names.push(reData.name);

          reData = self._getCodeObj(reData.sub, fix[1], 2);
          names.push(reData.name);
          return names.join(',');
        },
        //从url中获取参数是param的值
        getParamFromUrl: function(param){
          var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r != null){
            return unescape(r[2]);
          }return '';
        },
    }

    $.fn.cncitypicker = function(options) {
        var cncitypicker = new CnCityPicker(this, options);
        return cncitypicker._init();
    }
})(jQuery, window, document);
