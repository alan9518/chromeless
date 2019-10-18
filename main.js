/* ==========================================================================
 * Node Module To Scan SP Sites Looking for Redirection
 * 08/01/2019
 * Alan Medina Silva
 ========================================================================== */



// --------------------------------------
// Import Dependences
// --------------------------------------
    const puppeteer = require('puppeteer');
    const oktaPage = 'https://login.microsoftonline.com/common/oauth2/authorize?client_id=4345a7b9-9a63-4910-a426-35363201d503&response_mode=form_post&response_type=code+id_token&scope=openid+profile&state=OpenIdConnect.AuthenticationProperties%3dv55adkwgG6Mov2g9Itn3dBiVttM46SieHdxACblB3yL_T5qNEoijHFxjfjhfxF7CyfzpQ1dzlMStVmHJbUE21VNHH96vrSv8JclMA46FJh5vWBUlqZttPlFcDoavJkIY&nonce=636825709737011379.ODNkNzg5MjctYzE4Mi00NzU0LWExNjgtMWZlY2E1ZDU3YzcwYmM1NTkxZGUtZTIzYS00NjQ5LWFkZmYtNDRhNzA3N2Y3YzU1&redirect_uri=https%3a%2f%2fwww.office.com%2f&ui_locales=en-US&mkt=en-US&sso_reload=true'; 
    let redirectsCountArray = [];
    let noRedirectsArray = [];
    const sites = [
        {name : 'smart_replenishment', url : 'https://flextronics365.sharepoint.com/sites/br_project/smart_replenishment'},
        {name : 'admin_flex_ireland',url:'https://flextronics365.sharepoint.com/sites/admin_flex_ireland' },
        {name : 'coopersville_automotive' , url : 'https://flextronics365.sharepoint.com/sites/coopersville_automotive/engineeringprojects'},
        {name : 'smart_replenishment',url : 'https://flextronics365.sharepoint.com/sites/1017007'},
        {name : '8bqa',url:'https://flextronics365.sharepoint.com/sites/8bqa'},
        {name : 'rfq',url:'https://flextronics365.sharepoint.com/sites/advanced_sourcing_/rfq'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/aeg/ProdProcAE'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/aguas_quote'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/althofen_intranet/fm/brandschutz'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/althofen_intranet/vsm_strategie'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/am_business_excellence'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/americas_hris/hris_operations_forum'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/asia_regional_finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/asiaonematerials/irp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/asiaonematerials/leadtime'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/austin_cser'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/austin_so_process'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/automation_mx'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/b3_south_gdl'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/bay_area_facilities'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/br_project/imo'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/br_project/lenovo_moto_manaus'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/br_project/recof'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/br_project/smart_replenishment'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/br_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/brazil_cockpit/mech_cockpit'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/brazil_cockpit/pcba_cockpit'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/bristol'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/brq'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/business_development_team__shammy_khan'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/business_excellence_tijuana_otay'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ccm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cec_accounts/cisco'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cec_finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cec_finance/cec_finance_reports'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cec_non_focal_account'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cec_storage_server__ci3'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cesfactoryquality/apps/olvoting'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cesfactoryquality/elementum_onboard/alt_itrck'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cff'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cisco_plan_and_purchase'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ciscogdldf/it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ciscogdlpcba/it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ciscogdlpcba/Quality'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/clt_finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/coe/coe_internal'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/columbiasc/hr'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/columbiasc/pm/team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/connected_intelligence'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/coopersville_automotive/engineeringprojects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/core_applications/service_delivery_mgmt'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corpdev/bravo'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corpdev/danel'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corpdev/edelweiss'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corpdev/hazel'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corpdev/jupiter'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corporate_it_security/dlp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/corporatequalitysolutions/golden_eye'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cqss_wearable/quality_assurance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cref/facilities_nth_america'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/cref/knowledge_sharing'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ctg_core'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ctg_global_technical_program_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/customsolutionsdev/EscalationMatrix'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/customsolutionsdev/eScrap'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/customsolutionsdev/GDH/BISite'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/dcci_activity'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/dcst_engineering'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/design_engineering_it/de_leadership_team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/design_engineering_it/fcad'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/fts'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/gcat'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/mdm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/design_engineering/sceptre'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/disaster_rapid_response'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ea_content_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ediscovery'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ee_commodity_management/gp_bqa'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/efreight/wiki'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ehs'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/emea_hr/emea_talent_development'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/emea_it_pmo/EMEA_Projects/SDB_Integration'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/emea_it_regional_ops_team/emea_it_pmo/emea_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/emeafinance/hrs_emea_finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/emeafinance/inv_emea_finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/engineering_ptp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/enterprise_solutions/blockchainsolutions'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/enterprise_solutions/flexware'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/enterprise_solutions/pmo'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/enterprise_solutions/pmo_private'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/enterprise_solutions/sales/kriba_workspace'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/farmington_automotive/automotive_product_design_reviews'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/farmington_automotive/cust_req'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/fit_brazil'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/fit_brazil/openstack'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_living__it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_packaging_solutions/subsite'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_penang/planning'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_services'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_solutions/flex_solutions_team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flex_zhuhai'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/facmaintenance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/is'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/material/planning'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/material/purchasing'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/oceope'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/opex/begemba'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/procurement'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/program'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/program/oceprog'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/program/supplierdayasiadiscussion'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/qualityassurance/productqualitysystem'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/qualityassurance/sussqe'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/showcase'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/sitedirectory/genworkflow'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/xrxope'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/xrxope/printhead'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/xrxope/xeroxprod'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/flexpraihome/xrxope/xrxeng'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/fplc/tjqualp4'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gac_fca_k8_plgm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_ace_general_apps/it_americas_news'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_americas'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_che_ap_eu_mgt_report'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_chennai_finance/gbs_cost_accounting/cas_regions'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_chennai_finance/gbs_cost_accounting/cas_regions/mech_senai_880_jv'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_chennai_finance/gbs_cost_accounting/penang'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_chennai_finance/ww_reporting/vba_automation'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_cmpees_global'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_dashboard'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_engineering_amer'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_engineering_mpdm_emea'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_eq_timisoara'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_guad_travel_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_guad_treasury'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_idm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_it_chennai/fpl_2016'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_it_pune'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_it_pune/flex_link'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_nsc_ghd_test'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_pune/india_sites'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_pune_fa_ejv'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbs_shenzhen_it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gbseq_int/sharenet'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gdj_south_campus/b6_pm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gdj_south_campus/bus_dev_gdl_sur'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gdl_norte_b24/aereos_b24'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gdl_ops_north'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gdlmb16industriale/rates'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_citizenship'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_idm_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_logistics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_ops_asia_2_mm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_ops_emea/emea_operations/pcba_cork'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_ops_emea/emea_region_projects/line_scheduling'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_ops_emea/emea_region_projects/wfd_dl'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_ops_emea/emea_region_projects/wfd_idl'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_projects_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_projects_/local_hr_lean_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/global_smi/bmt'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gpsc_iei'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gpsc_team_files'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gpsc2'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gss/milpitas'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gss/zhuhai'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gss_ireland_bd_tracker'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gss_milpitas_services'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/gump_b24_whs'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/high_velocity_solutions/jagqms'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/high_velocity_solutions/localsupp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/high_velocity_solutions/npi'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/honeywell_sharepoint_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/hrit/hrit_production_support'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/hvs'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/icon/sandbox'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_austin_/iei_schlumberger_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_business_group/analystdaybodpresidentday'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_business_group/industrial_home'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_members_only'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_members_only/finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_members_only/iei_leadership'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/iei_members_only/solar_generation'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/infineon_collaboration__'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/innovation_labs_product_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/internal_patch_pump_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/intranet_althofen/finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/intranet_irving/anncouncements'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/investments'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/israel'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/it_gdl_north/gdl_wip_inventory'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/it_lou'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/it_platform/it_platform_office'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itcommunications/pluggedin'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itcommunications/team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itdao/mssql/support'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/adss/mps'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/cdt'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/cdt/team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/flexcloud'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/mps'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/pmo/1006039iwanpilot'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/pmo/1010008win10upgrade'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/pmo/1010096jabberclient'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itgso/pmo/1010775nextgenwan'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itmxsubregion/gdlnorth/moceimme_solution_for_mex'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itmxsubregion/materials_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itmxsubregion/mxsharedservices'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itmxsubregion/mxsharedservices/steering_committee'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itmxsubregion/pmo/nee'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itnews'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itpulse'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/itse'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ivalua'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/jag_manufacturing_mfg/cfc'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/jag_manufacturing_mfg/logistics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/jaguariuna/jaguariuna_standard_time/lean'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/jrz_operations_plastics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/juarez_automotive/operations'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/kallang_sqe'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/kinaxis_business_site'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/legal/litigationdispute'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/lenovo_commercial_repair_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/louisville/gopro'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/louisville/hpdemo'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/louisville/republicwireless'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/lvl_finance/customer_on_boarding'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/m2m'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/managementsystems/wwpm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mandadeals'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mantenimiento_de_edifcios'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mci_ict/budget'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mci_ict/erp_system'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mcs_office_it_team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/medical/amgen_avanti'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/medical/health_solutions_innovation_and_technology'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/memphis_clc7'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/memphis_engineering/gump'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mexico_logistics_team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mexico_logistics_team/regionalfreightteam'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/milan_site/rd_and_engineering_staff'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mirlo'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mitel_phone_odm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mobilecoe'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mpp_solutions/delivery_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mpp_solutions/materials_projects'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/mpp_solutions/our_people'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/netwoven/site4'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/new_business_ventures'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/nexteer'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/nextracker'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/nfd_it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/novoflex'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/npi_project_management/baxter_npi'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/npi_project_management/medtronic_dxterity'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/nw2/site1'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ottawa_design/design_validation_centre'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ottawa_design/programmanagement'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_b11'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_juarez_846'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_juarez_846/plum_juarez'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/customer_reporting_portal/hallmark_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/customer_reporting_portal/hallmark_/milpitas_safety_program'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/metaswitch'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_bldg_admin'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_business_dev'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_engineering'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_human_resources'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_lean_academy'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_logistics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_operations'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_milpitas/milpitas_sustain_business'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pcba_sorocaba/bu_ctg_iei_power'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/penang_p2_be_and_training'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/philips_healthcare_'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/piit'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/piit/piitinternal'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/process_engineer_b1_gump'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/process_engineering'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/program_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/programming_center'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pslcp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ptp_ehs'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/ptp_program_dept'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pull_programs__walt/edi_fsp_mexico'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pull_programs__walt/forecast_230'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/pull_programs__walt/pull_program_waterfalls'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/quality/dashboard'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/quality_guadalajara_north/b24_incoming_site'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/quality_guadalajara_north/supplier_quality_site'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/eh_and_s'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/ibm_cft'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/inventory_and_planing'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/it'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/logistics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/plant_manager'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/raleigh/senior_leadership'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/robotics'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/scope/customer_schneider'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/senai/senaimedical'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/shanghai_design_center/project_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sharepoint/team/DigitalAsset'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sharepoint_training'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/shenzhen_fuyong'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/shenzhen_it_metric'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/singapore/kallang/add_account/malibu'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/singapore/kallang/add_account/rfqdoc'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/smp'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sonus_austin_site'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sony'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sp_prov_rtn'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sri/business_excellence'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sri/cip_sri_finance_koi'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sri/cip_sws_scrap_sales'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sri/cip2cyclecountprocess'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/sscm'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/staging'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/strategy'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tczew/it/development/teamportal'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tdc/lessons_learned'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tdc_npi_sharepoint'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tech_business_development'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tech_roadmap_council'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/test_development'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/test_eng_b12'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/test_engineering_cp_cpk'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/testmeta'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/testretentionphase2/testdb_move'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/thailandia_rrh'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tia'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tijuana_otay_industrial_engineering'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tijuana_otay_transfer'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/timisoara/operations/material'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tml_mexico_team/wip_bonepile_reports'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tooling'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/training_department'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/trieste/finance'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/trieste/hr'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/trieste/program_management'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/trieste/quality'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/tw_it_ap'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/uk_bus_development_team'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/usa_services'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/vienna/flexviennaentrancescreen'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/wave_machines_reduction'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/web_solutions/imm/PRJ_SPWorkflowMigration'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/web_solutions/itcommunications'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/webdev_sandbox/digitalasset'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/whip_hungary/whip_hris'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/wtg'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/wuzhong_mechanicals'},
        {name : 'smart_replenishment',url:'https://flextronics365.sharepoint.com/sites/zhuhai_inventory'},

    ]
    
// --------------------------------------
// Connect to Site
// --------------------------------------
    async function startSearch() {
        
        const browser = await puppeteer.launch({
            headless : true,
            defaultViewport : null
        });
    
        const homeSelector = '#O365_NavHeader > div._1W4a_PldI1IWcRIs4jdtBx > div:nth-child(5) > span > span';


        // Do Login 
        let loginpage =  await browser.newPage();
        await loginpage.goto(oktaPage);

        await performLogin(loginpage);

        // Wait for the Office 365 Home Page to Load
        await loginpage.waitForSelector(homeSelector)
        


        // Test Sites
       try {
            await testSites(browser)
            console.log('finsished')
       }
       catch(error ) {
           console.log("​catch -> error", error)
           
       }
    
    
    }



    // --------------------------------------
    // Scan Sharepoint Sites and 
    // Look for the Ones that Redirect
    // --------------------------------------


    async function testSites(browser) {
        const siteInfoSelector = '#ui-id-1'
        let redirectionsCount = 0;
        let noRedirectedSitesCount = 0;
        
        console.log("​testSites -> sites.length", sites.length)
        
        for(let sitesIterator = 0; sitesIterator < sites.length ; sitesIterator ++) {

                let sitePage = await browser.newPage();
         
                    await sitePage.goto(sites[sitesIterator].url, {waitUntil : 'networkidle2'});


                    try {
                        await sitePage.waitForSelector(siteInfoSelector);
                        redirectsCountArray.push({name: sites[sitesIterator].url})
                        redirectionsCount++;

                    }
                    catch(error) {
                            noRedirectsArray.push({name: sites[sitesIterator].url})
							
                            noRedirectedSitesCount++
                    }

                   
			        // console.log("site ", sites[sitesIterator].url)
                    console.log('page',sitePage.url())


        }

        console.log("​testSites -> redirectionsCount", redirectionsCount)
        console.log("​testSites -> noRedirectedSitesCount", noRedirectedSitesCount)

        console.log("​testSites -> redirectsCountArray", redirectsCountArray);


        console.log("​​testSites -> noRedirectsArray", noRedirectsArray)


    }


    
    // --------------------------------------
    // Do Okta Login
    // Look for the Ones that Redir
    // --------------------------------------
    
    async function performLogin(page) {
        const emailField = '#i0116';
        const buttonSelector = '#idSIButton9';

        const checkBoxSelector = '#KmsiCheckboxField';
        const noLoggedIcSelector = '#idBtn_Back';
        const keepLoggedInSelector = '#idSIButton9'

        

        await page.click(emailField);
        await page.keyboard.type('alan.medina@flex.com')  ;
        await page.click(buttonSelector);

        await page.waitForNavigation();


        // await page.waitForSelector('input[type="password"]', { visible: true })
        await page.waitForSelector(checkBoxSelector)
        console.log("​performLogin -> page.url()", page.url())
        
            await page.click(checkBoxSelector);
            await page.click(keepLoggedInSelector);    
            await page.waitForNavigation();
    
    }
   

    async function startSearchMultiple2(browser) {


         

        puppeteer.launch({headless : false, defaultViewport : null}).then(async browser => {
            const promises=[];

            
            const sites = [
                // {name : 'rfq', url : 'https://flextronics365.sharepoint.com/sites/advanced_sourcing_/rfq/SitePages/Home.aspx'},
                // {name : 'smart_replenishment', url : 'https://flextronics365.sharepoint.com/sites/br_project/smart_replenishment/SitePages/Home.aspx'},
                {name : 'admin_flex_ireland',url:'https://flextronics365.sharepoint.com/sites/admin_flex_ireland' }
            ]
            
        

            // Iterate Sites
            sites.map((site)=> {
                console.log('Page Spawned  ' + site.name, site.url)
                promises.push(browser.newPage().then(async page => {

                    await page.goto(site.url);
                    // await page.waitForNavigation();
                    await page.waitForNavigation({ waitUntil: 'networkidle2' });

                   
                    await performLogin(page);

                    // Check if site is redirected




                }))

                browser.close()
            })


            await Promise.all(promises)

            // console.log("​startSearchMultiple -> promises 2", promises)

            // browser.close();
          });
    }

    async function startSearchMultiple() {


         

        puppeteer.launch({headless : false, defaultViewport : null}).then(async browser => {
            const promises=[];

            // Iterate Sites
            sites.map((site)=> {
                console.log('Page Spawned  ' + site.name, site.url)
                promises.push(browser.newPage().then(async page => {

                    await page.goto(site.url);
                    // await page.waitForNavigation();
                    await page.waitForNavigation({ waitUntil: 'networkidle2' });

                   
                    await performLogin(page);

                }))

                 browser.close()
            })


            await Promise.all(promises)

            // console.log("​startSearchMultiple -> promises 2", promises)

            // browser.close();
          });
    }







// Start script
     startSearch();