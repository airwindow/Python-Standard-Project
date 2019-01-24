!function(a){jQuery.extend({debug:function(){if(window.debug=window.debug||[],args=jQuery.makeArray(arguments),"object"==typeof this)var a=args.length?args[0]:window.debug.length,b=this;else var a=args.length>1?args.pop():window.debug.length,b=args[0];return window.debug[a]=b,"undefined"!=typeof console&&console.log(a,b),this}}),jQuery.fn.debug=jQuery.debug}(jQuery);;
var contentanalysis=contentanalysis||{};!function($,$$){$.extend($$,{contentanalysisPrevAnalyzerTab:"",contentanalysisPrevReportTab:"",contentanalysisCurrentAnalyzerTab:"",contentanalysisCurrentReportTab:"",contentanalysisReportActiveTab:{},init:function(){$$.contentanalysis_contentanalysisui()},contentanalysis_contentanalysisui:function(){$("#modalContent div.analyzers h3.analyzer").size()>0&&($$.contentanalysis_show_analyzer_tab($("div.analyzers h3.analyzer").get(0)),$("div.analyzers h3.analyzer").mousedown(function(){$$.contentanalysis_show_analyzer_tab(this)}),$("h3.contentanalysis-report-tab").mousedown(function(){$$.contentanalysis_show_report_tab(this)}))},contentanalysis_back:function(){$$.contentanalysis_show_analyzer_tab(contentanalysisPrevAnalyzerTab)},contentanalysis_show_analyzer_tab:function(a){$("div.analysis-results div.analyzer-analysis:eq("+$(".analyzers h3.analyzer").index(a)+")").children(".content-analysis-tab:first").addClass("active"),$("div.analysis-results div.analyzer-analysis").hide(),$(".analyzers h3.analyzer").removeClass("active"),$(a).addClass("active"),$("div.analysis-results div.analyzer-analysis:eq("+$(".analyzers h3.analyzer").index(a)+")").show(),$(".content-analysis-results").hide();var b=$(a).attr("id"),c=b.split("-"),d=c[3];$$.contentanalysisReportActiveTab[d]?$$.contentanalysis_show_report_tab($("#contentanalysis-report-tab-"+d+"-"+$$.contentanalysisReportActiveTab[d])):$$.contentanalysis_show_report_tab($("#contentanalysis-report-tab-"+d+"-0")),$$.contentanalysisPrevAnalyzerTab=$$.contentanalysisCurrentAnalyzerTab,$$.contentanalysisCurrentAnalyzerTab=a},contentanalysis_show_report_tab:function(a){var b=$(a).attr("id"),c=b.split("-");$$.contentanalysisReportActiveTab[c[3]]=c[4],$("h3.contentanalysis-report-tab").removeClass("active"),$(a).addClass("active"),$(".contentanalysis-results-section").hide();var d=$("#contentanalysis-report-tabs-"+c[3]),e=$("#contentanalysis-report-tabs-"+c[3]).position(),g=($("#contentanalysis-report-tabs-"+c[3]).offset(),d.height()),h=e.top+g+"px",j=(e.left+"px",b.replace("tab","results")),k=j.replace("-"+c[4],"");$("#"+k).css("top",h),$("#"+j).show(),$$.contentanalysisPrevReportTab=$$.contentanalysisCurrentReportTab,$$.contentanalysisCurrentReportTab=a},contentanalysis_inline_analysis:function(){Drupal.settings.contentanalysis.display_dialog=0,Drupal.settings.contentanalysis.display_inline=1,$("#contentanalysis-buttons").after('<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div><div class="message">'+Drupal.t("Analyzing...")+"</div></div>"),$$.contentanalysis_analyze()},contentanalysis_dialog_analysis:function(){Drupal.settings.contentanalysis.display_dialog=1,Drupal.settings.contentanalysis.display_inline=0,$$.contentanalysis_analyze()},contentanalysis_full_analysis:function(){Drupal.settings.contentanalysis.display_dialog=1,Drupal.settings.contentanalysis.display_inline=1,$$.contentanalysis_analyze()},contentanalysis_refresh_analysis:function(a){Drupal.settings.contentanalysis.display_dialog=0,Drupal.settings.contentanalysis.display_inline=1,$(".contentanalysis-refresh-link-"+a).replaceWith('<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>'),$$.contentanalysis_analyze(a)},contentanalysis_analyze:function(analyzer_override){var data={nid:-1,node_type:-1,source:-1,analyzers:-1,title:-1,body:-1,body_summary:-1,page_title:-1,meta_title:-1,meta_keywords:-1,meta_description:-1,path_alias:-1,path_pathauto:-1,url:-1,page:-1,body_input_filter:-1,hidden:-1,code:Drupal.settings.contentanalysis.code,action:-1};if(analyzer_override&&(data.action="refresh"),$("#contentanalysis-page-analyzer-form").html())data.source="admin-form",data.body=$("[name=input]").val(),data.nid=$("[name=input_nid]").val(),data.url=$("[name=input_url]").val(),""==data.body&&(data.body=-1),""==data.nid&&(data.nid=-1),""==data.url&&(data.url=-1);else if($(".node-form").html()){data.source="node-edit-form","object"==typeof tinyMCE&&tinyMCE.get("edit-body-und-0-value").hide();var ckeditor=!1;$("#cke_edit-body-und-0-value").html()&&($("#wysiwyg-toggle-edit-body-und-0-value").click(),ckeditor=!0),data.title=$("#edit-title").val(),data.body=$("#edit-body-und-0-value").val(),null!=$("#edit-body-und-0-summary").val()&&(data.body_summary=$("#edit-body-und-0-summary").val()),data.nid=Drupal.settings.contentanalysis.nid,data.node_type=Drupal.settings.contentanalysis.node_type,data.body_input_filter=$("select[name='body[und][0][format]'] option:selected").val(),null!=$("#edit-page-title").val()&&(data.page_title=$("#edit-page-title").val()),null!=$("#edit-metatags-title-value").val()&&(data.meta_title=$("#edit-metatags-title-value").val()),null!=$("#edit-metatags-keywords-value").val()&&(data.meta_keywords=$("#edit-metatags-keywords-value").val()),null!=$("#edit-metatags-description-value").val()&&(data.meta_description=$("#edit-metatags-description-value").val()),null!=$("#edit-path-alias").val()&&(data.url=window.location.host+Drupal.settings.contentanalysis.base_path+$("#edit-path-alias").val(),data.path_alias=$("#edit-path-alias").val()),null!=$("input[name='path[pathauto]']:checked").val()&&(data.path_pathauto=1),"object"==typeof tinyMCE&&tinyMCE.get("edit-body-und-0-value").show(),ckeditor&&$("#wysiwyg-toggle-edit-body-und-0-value").click()}else data.source="page-link",data.page=$("html").html(),data.url=window.location.href;null!=Drupal.settings.contentanalysis.hidden&&(data.hidden=Drupal.settings.contentanalysis.hidden);var analyzers_arr=new Array;if(analyzer_override)data.analyzers=analyzer_override,analyzers_arr[0]=data.analyzers;else if(null!=$("#contentanalysis_analyzers_override input").val())data.analyzers=$("#contentanalysis_analyzers_override input").val(),analyzers_arr[0]=data.analyzers;else{var i=0;$("#contentanalysis_analyzers .form-checkbox:checked").each(function(){var a=new RegExp(/\[[^\]]+\]/);analyzers_arr[i]=a.exec($(this).attr("name"))[0].replace("]","").replace("[",""),i++}),data.analyzers=analyzers_arr.join(",")}for(var i in analyzers_arr){var aid=analyzers_arr[i],module=Drupal.settings.contentanalysis.analyzer_modules[aid].module;if(eval("typeof "+module+'_contentanalysis_data == "function"')){d=eval(module+"_contentanalysis_data")(aid,data);for(var k in d)eval("data.ao_"+aid+"_"+k+' = "'+d[k]+'";')}}return $("#contentanalysis-buttons").hide(),$.ajax({type:"POST",url:Drupal.settings.contentanalysis.analyze_callback,data:data,dataType:"json",success:function(data,textStatus){if(analyzers_arr=data.inputs.analyzers.split(","),1==Drupal.settings.contentanalysis.display_dialog&&($("#analysis-modal").append(data.main.output),$("#analysis-modal .progress").remove(),$$.contentanalysis_contentanalysisui()),1==Drupal.settings.contentanalysis.display_inline){if("refresh"==data.inputs.action)for(i in analyzers_arr)aid=analyzers_arr[i],$(".contentanalysis-report-"+aid+"-page_title").replaceWith(data.page_title.output),$(".contentanalysis-report-"+aid+"-body").replaceWith(data.body.output),$(".contentanalysis-report-"+aid+"-meta_description").replaceWith(data.meta_description.output),$(".contentanalysis-report-"+aid+"-meta_keywords").replaceWith(data.meta_keywords.output);else{var show_title=!0;if($(".form-item-metatags-title-value").length>0&&($(".form-item-metatags-title-value > .contentanalysis_section_analysis").remove(),$(".form-item-metatags-title-value").append(data.page_title.output),null!=$("#edit-metatags-title-value").val())){var meta_title=$("#edit-metatags-title-value").val();meta_title.indexOf("[node:title]")==-1}show_title&&($(".form-item-title > .contentanalysis_section_analysis").remove(),$(".form-item-title").append(data.page_title.output)),$("#edit-body > .contentanalysis_section_analysis").remove(),$("#edit-body").append(data.body.output),$(".form-item-metatags-description-value").length>0&&null!=data.meta_description&&($(".form-item-metatags-description-value > .contentanalysis_section_analysis").remove(),$(".form-item-metatags-description-value").append(data.meta_description.output)),$(".form-item-metatags-keywords-value").length>0&&null!=data.meta_keywords&&($(".form-item-metatags-keywords-value > .contentanalysis_section_analysis").remove(),$(".form-item-metatags-keywords-value").append(data.meta_keywords.output))}for(var i in analyzers_arr){var aid=analyzers_arr[i];h='<a href="#" class="contentanalysis-refresh-link-'+aid+'" onclick="contentanalysis.contentanalysis_refresh_analysis(\''+aid+"'); return false;\">",h+='<img src="'+Drupal.settings.contentanalysis.path_to_module+'/icons/refresh.png" alt="refresh" />',h+="</a>",$(".contentanalysis-report-"+aid+" label").append(h)}}for(var i in analyzers_arr){var aid=analyzers_arr[i],module=Drupal.settings.contentanalysis.analyzer_modules[aid].module;eval("typeof "+module+'_contentanalysis_analysis_success == "function"')&&eval(module+"_contentanalysis_analysis_success")(aid,data)}"function"==typeof Drupal.behaviors.collapse&&Drupal.behaviors.collapse(),$(".ahah-progress-throbber").remove(),$("#contentanalysis-buttons").show()},error:function(a,b){alert(a.responseText.toString()),$(".ahah-progress-throbber").remove(),$("#contentanalysis-buttons").show()}}),!1}}),Drupal.behaviors.contentanalysisui={attach:function(a,b){$$.init()}},Sliders={},Sliders.changeHandle=function(a,b){var c=jQuery(b.handle).parents("div.slider-widget-container").attr("id");"undefined"!=typeof b.values?jQuery.each(b.values,function(a,b){jQuery("#"+c+"_value_"+a).val(b),jQuery("#"+c+"_nr_"+a).text(b)}):(jQuery("#"+c+"_value_0").val(b.value),jQuery("#"+c+"_nr_0").text(b.value))}}(jQuery,contentanalysis);;
/**
 * @file
 */

(function ($) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, settings) {
    if (!settings.hasOwnProperty('extlink')) {
      return;
    }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (settings.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (settings.extlink.extInclude) {
      extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (settings.extlink.extExclude) {
      extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (settings.extlink.extCssExclude) {
      extCssExclude = settings.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (settings.extlink.extCssExplicit) {
      extCssExplicit = settings.extlink.extCssExplicit;
    }

    // Define the jQuery method (either 'append' or 'prepend') of placing the icon, defaults to 'append'.
    var extIconPlacement = settings.extlink.extIconPlacement || 'append';

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not(.' + settings.extlink.extClass + ', .' + settings.extlink.mailtoClass + '), area:not(.' + settings.extlink.extClass + ', .' + settings.extlink.mailtoClass + ')', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          external_links.push(this);
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (settings.extlink.extClass) {
      Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass, extIconPlacement);
    }

    if (settings.extlink.mailtoClass) {
      Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass, extIconPlacement);
    }

    if (settings.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).attr('target', settings.extlink.extTarget);
      // Add rel attributes noopener and noreferrer.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the values noopener and noreferrer.
        if (val == null) {
          return 'noopener noreferrer';
        }
        // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
        if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          if (val.indexOf('noreferrer') === -1) {
            return val + ' noreferrer';
          }
          // Both noopener and noreferrer exist. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener and noreferrer to val.
        else {
          return val + ' noopener noreferrer';
        }
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (settings.extlink.extAlert) {
        return confirm(settings.extlink.extAlertText);
      }
    };

    $(external_links).click(function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   * @param {string} icon_placement
   *   'append' or 'prepend' the icon to the link.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name, icon_placement) {
    var $links_to_process;
    if (Drupal.settings.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }
    $links_to_process.addClass(class_name);
    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if ($link.css('display') === 'inline' || $link.css('display') === 'inline-block') {
        if (class_name === Drupal.settings.extlink.mailtoClass) {
          $link[icon_placement]('<span class="' + class_name + '" aria-label="' + Drupal.settings.extlink.mailtoLabel + '"></span>');
        }
        else {
          $link[icon_placement]('<span class="' + class_name + '" aria-label="' + Drupal.settings.extlink.extLabel + '"></span>');
        }
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, settings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, settings);
    }
  };

})(jQuery);
;
