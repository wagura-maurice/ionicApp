angular.module("demo", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","demo.controllers", "demo.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "demo" ;
		$rootScope.appLogo = "data/images/avatar/pic6.jpg" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = true ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "demo",
				storeName : "demo",
				description : "The offline datastore for demo app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("demo.profile");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("demo",{
		url: "/demo",
			abstract: true,
			templateUrl: "templates/demo-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("demo.about_us", {
		url: "/about_us",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.faqs", {
		url: "/faqs",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.form_login", {
		url: "/form_login",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-form_login.html",
						controller: "form_loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.form_order", {
		url: "/form_order",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-form_order.html",
						controller: "form_orderCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.form_user", {
		url: "/form_user",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-form_user.html",
						controller: "form_userCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.home", {
		url: "/home",
		cache:false,
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.order", {
		url: "/order",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-order.html",
						controller: "orderCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("demo.profile", {
		url: "/profile",
		views: {
			"demo-side_menus" : {
						templateUrl:"templates/demo-profile.html",
						controller: "profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/demo/profile");
});
