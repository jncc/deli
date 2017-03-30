export const data = [
    {
        id: "lidar-dtm",
        title: "LiDAR for Scotland Phase I DTM",
        abstract: "The Scottish Public Sector LiDAR Phase I dataset was commissioned by the Scottish Government, SEPA and Scottish Water in 2011. This was commissioned in response to the Flood Risk Management Act (2009). The contract was awarded to Atkins, and the LiDAR data was collected and delivered by Blom. Airbourne LiDAR data was collected for 10 collection areas totalling 11,845 km2 between March 2011 and May 2012. A DTM and DSM were produced from the point clouds, with 1m spatial resolution. The data is licenced under an Open Government Licence.", "metadataDate": "2017-03-01", "keyword": ["Orthoimagery", "Elevation", "Society"], "responsibleOrganisation": "Scottish Government", "spatialReferenceSystem": "EPSG:27700", "metadataLanguage": "\"English", "lineage": "The LiDAR data was collected from an aircraft between March 2011 and May 2012 for 10 collection areas. The point density was a minimum of 1 point/sqm, and approximately 2 points/sqm on average between the 10 collection areas. Blom delivered the raw LAS files alongside DTM and DSMs at 1m resolution in ESRI Grid and ASCII format. They also provided reports detailing the height accuracy and point density for each collection area. The results were delivered between 1st July 2011 and 2nd May 2012.", "datasetReferenceDate": "2016-11-15", "metadataPointOfContact": "Scottish Government, GI-SAT@gov.scot (Geographic Information Science and Analysis Team (GI-SAT), Directorate for Digital), Victoria Quay, Edinburgh, Scotland, EH6 6QQ, United Kingdom",
        "data": {
            "download": {
                "type": "GeoTIFF",
                "url": "https://s3-eu-west-1.amazonaws.com/scotland-gov-gi/lidar-1/processed/DTM/lidar-1-dtm.tif",
                "size": 34750538578
            },
            "wms": {
                "base_url": "https://eo.jncc.gov.uk/geoserver/ows",
                "name": "scotland:lidar-1-dtm"
            }
        },
    },
    {
        id: "lidar-dsm",
        title: "LiDAR for Scotland Phase I DSM",
        abstract: "The Scottish Public Sector LiDAR Phase I dataset was commissioned by the Scottish Government, SEPA and Scottish Water in 2011. This was commissioned in response to the Flood Risk Management Act (2009). The contract was awarded to Atkins, and the LiDAR data was collected and delivered by Blom. Airbourne LiDAR data was collected for 10 collection areas totalling 11,845 km2 between March 2011 and May 2012. A DTM and DSM were produced from the point clouds, with 1m spatial resolution. The data is licenced under an Open Government Licence.", "metadataDate": "2017-03-01", "keyword": ["Orthoimagery", "Elevation", "Society"], "responsibleOrganisation": "Scottish Government", "spatialReferenceSystem": "EPSG:27700", "metadataLanguage": "\"English", "lineage": "The LiDAR data was collected from an aircraft between March 2011 and May 2012 for 10 collection areas. The point density was a minimum of 1 point/sqm, and approximately 2 points/sqm on average between the 10 collection areas. Blom delivered the raw LAS files alongside DTM and DSMs at 1m resolution in ESRI Grid and ASCII format. They also provided reports detailing the height accuracy and point density for each collection area. The results were delivered between 1st July 2011 and 2nd May 2012.", "datasetReferenceDate": "2016-11-15", "metadataPointOfContact": "Scottish Government, GI-SAT@gov.scot (Geographic Information Science and Analysis Team (GI-SAT), Directorate for Digital), Victoria Quay, Edinburgh, Scotland, EH6 6QQ, United Kingdom",
        "data": {
            "download": {
                "type": "GeoTIFF",
                "url": "https://s3-eu-west-1.amazonaws.com/scotland-gov-gi/lidar-1/processed/DSM/lidar-1-dsm.tif",
                "size": 36028513767
            },
            "wms": {
                "base_url": "https://eo.jncc.gov.uk/geoserver/ows",
                "name": "scotland:lidar-1-dsm"
            }
        },

    },
];
