function sendDataToHubspot(portalId, formGuid, fieldsData){
    jQuery.ajax({
        method: "GET",
        url: "/sites/all/themes/blazeng/templates/additional_templates/_send_data_to_hubspot.php",
        data: {
            portalId: portalId,
            formGuid: formGuid,
            fields: fieldsData
        }
    });
}