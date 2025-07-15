var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_LidarDEM_1 = new ol.format.GeoJSON();
var features_LidarDEM_1 = format_LidarDEM_1.readFeatures(json_LidarDEM_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LidarDEM_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LidarDEM_1.addFeatures(features_LidarDEM_1);
var lyr_LidarDEM_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LidarDEM_1, 
                style: style_LidarDEM_1,
                popuplayertitle: 'Lidar DEM',
                interactive: true,
                title: '<img src="styles/legend/LidarDEM_1.png" /> Lidar DEM'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_LidarDEM_1.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_LidarDEM_1];
lyr_LidarDEM_1.set('fieldAliases', {'country_code': 'country_code', 'name': 'Country', 'country_code:1': 'country_code:1', 'subdivision': 'subdivision', 'data_name': 'Data name', 'epsg': 'EPSG', 'datum': 'CRS', 'resolution': 'Resolution [m]', 'resolution_unit': 'resolution_unit', 'format': 'Format', 'cost_model': 'cost_model', 'download_link': 'Download link', 'product_link': 'Product link', 'license_link': 'License link', 'wcs_link': 'WCSlink', });
lyr_LidarDEM_1.set('fieldImages', {'country_code': 'Hidden', 'name': 'TextEdit', 'country_code:1': 'Hidden', 'subdivision': 'Hidden', 'data_name': 'TextEdit', 'epsg': 'TextEdit', 'datum': 'TextEdit', 'resolution': 'TextEdit', 'resolution_unit': 'Hidden', 'format': 'TextEdit', 'cost_model': 'Hidden', 'download_link': 'TextEdit', 'product_link': 'TextEdit', 'license_link': 'TextEdit', 'wcs_link': 'TextEdit', });
lyr_LidarDEM_1.set('fieldLabels', {'name': 'inline label - always visible', 'data_name': 'inline label - visible with data', 'epsg': 'inline label - visible with data', 'datum': 'inline label - visible with data', 'resolution': 'inline label - visible with data', 'format': 'inline label - visible with data', 'download_link': 'inline label - visible with data', 'product_link': 'inline label - visible with data', 'license_link': 'inline label - visible with data', 'wcs_link': 'inline label - visible with data', });
lyr_LidarDEM_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});