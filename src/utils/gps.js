//转换常数
var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
var pi = 3.14159265358979324;
var a = 6378245.0;
var ee = 0.00669342162296594323;
 
function transformLon(x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) / 3.0;
  return ret;
}
 
function transformLat(x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0;
  return ret;
}
 
function outOfChina(lat, lon) {
  if (lon < 72.004 || lon > 137.8347) return true;
  if (lat < 0.8293 || lat > 55.8271) return true;
  return false;
}
/*    
 * WGS-84：是国际标准，GPS坐标（Google Earth使用）
 * GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
 * BD-09：百度坐标偏移标准，Baidu Map使用
 */
     
/**
 * wgLat 纬度
 * wgLon 经度
 * WGS-84 到 GCJ-02 的转换（即 GPS 加偏）
 * */
export function WGS84toGCJ02(wgLat, wgLon) {
  var point = {};
  if (outOfChina(wgLat, wgLon)) {
    point.lat = wgLat;
    point.lng = wgLon;
    return point;
  }
  var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
  var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
  var radLat = (wgLat / 180.0) * pi;
  var magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
  var lat = wgLat + dLat;
  var lon = wgLon + dLon;
  point.lat = lat;
  point.lng = lon;
  return point;
}
/**
 * wgLat 纬度
 * wgLon 经度
 * BD-09转换GCJ-02
 * 百度转google
 * */
export function BD09toGCJ02(bd_lat, bd_lon) {
  var point = {};
  var x = bd_lon - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var gg_lon = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  point.lat = gg_lat;
  point.lng = gg_lon;
  return point;
}
 
/**
 * gg_lat 纬度
 * gg_lon 经度
 * GCJ-02转换BD-09
 * Google地图经纬度转百度地图经纬度
 * */
export function GCJ02toBD09(gg_lat, gg_lon) {
  var point = {};
  var x = gg_lon;
  var y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var bd_lon = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  point.lat = bd_lat;
  point.lng = bd_lon;
  return point;
}

/**
 * gg_lat 纬度
 * gg_lon 经度
 * GCJ-02转换BD-09
 * Google地图经纬度转百度地图经纬度
 * */
export function WGS84toBD09(lat, lng) {
  let posGC = WGS84toGCJ02(lat, lng)
  let pointBD = GCJ02toBD09(posGC.lat, posGC.lng)
  return pointBD;
}

/**
 * lat 串口原始纬度
 * lon 串口原始经度
 * WGS-02转换GCJ-02
 * GCJ-02转换BD-09
 * */
export function GPStoBD09(lat, lng) {
  let pointWgs = GPStoWGS84(lat, lng)
  let posGC = WGS84toGCJ02(pointWgs.lat, pointWgs.lng)
  let pointBD = GCJ02toBD09(posGC.lat, posGC.lng)
  return pointBD;
}

/**
 * lat 串口原始纬度
 * lon 串口原始经度
 * 原始GPS数据转换WGS84
 * */
export function GPStoWGS84(lat, lng) {
  var point = {};
  let latWgs = parseInt(lat / 100) + (lat - parseInt(lat / 100) * 100) / 60;
  let lngWgs = parseInt(lng / 100) + (lng - parseInt(lng / 100) * 100) / 60;
  point.lat = latWgs;
  point.lng = lngWgs;
  return point;
}