(function() {
  var orderForType;

  orderForType = {
    'FixedProfile': -2000,
    'PacProfile': -1000,
    'VirtualProfile': 1000,
    'SwitchProfile': 2000,
    'RuleListProfile': 3000
  };

  angular.module('omegaDecoration', []).value('profileIcons', {
    'DirectProfile': 'glyphicon-transfer',
    'SystemProfile': 'glyphicon-off',
    'AutoDetectProfile': 'glyphicon-file',
    'FixedProfile': 'glyphicon-globe',
    'PacProfile': 'glyphicon-file',
    'VirtualProfile': 'glyphicon-question-sign',
    'RuleListProfile': 'glyphicon-list',
    'SwitchProfile': 'glyphicon-retweet'
  }).constant('profileOrder', function(a, b) {
    var diff;
    diff = (orderForType[a.profileType] | 0) - (orderForType[b.profileType] | 0);
    if (diff !== 0) {
      return diff;
    }
    if (a.name === b.name) {
      return 0;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  }).constant('getVirtualTarget', function(profile, options) {
    if ((profile != null ? profile.profileType : void 0) === 'VirtualProfile') {
      return options != null ? options['+' + profile.defaultProfileName] : void 0;
    }
  }).directive('omegaProfileIcon', function(profileIcons, getVirtualTarget) {
    return {
      restrict: 'A',
      template: '<span ng-style="{color: color || getColor(profile)}"\n  ng-class="{\'virtual-profile-icon\': isVirtual(profile)}"\n  class="glyphicon {{icon || getIcon(profile)}}">\n</span>',
      scope: {
        'profile': '=?omegaProfileIcon',
        'icon': '=?icon',
        'color': '=?color',
        'options': '=options'
      },
      link: function(scope, element, attrs, ngModel) {
        scope.profileIcons = profileIcons;
        scope.isVirtual = function(profile) {
          return (profile != null ? profile.profileType : void 0) === 'VirtualProfile';
        };
        scope.getIcon = function(profile) {
          var type, _ref, _ref1;
          type = profile != null ? profile.profileType : void 0;
          type = (_ref = (_ref1 = getVirtualTarget(profile, scope.options)) != null ? _ref1.profileType : void 0) != null ? _ref : type;
          return profileIcons[type];
        };
        return scope.getColor = function(profile) {
          var color;
          color = void 0;
          while (profile) {
            color = profile.color;
            profile = getVirtualTarget(profile, scope.options);
          }
          return color;
        };
      }
    };
  }).directive('omegaProfileInline', function() {
    return {
      restrict: 'A',
      template: '<span omega-profile-icon="profile" options="options"></span>\n{{dispName ? dispName(profile) : profile.name}}',
      scope: {
        'profile': '=omegaProfileInline',
        'dispName': '=?dispName',
        'options': '=options'
      }
    };
  }).directive('omegaHtml', function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
        var getHtml, locals;
        locals = {
          $profile: function(profile, dispName, options) {
            if (profile == null) {
              profile = 'profile';
            }
            if (dispName == null) {
              dispName = 'dispNameFilter';
            }
            if (options == null) {
              options = 'options';
            }
            return "<span class=\"profile-inline\" omega-profile-inline=\"" + profile + "\"\n  disp-name=\"" + dispName + "\" options=\"" + options + "\"></span>";
          }
        };
        getHtml = function() {
          return scope.$eval(attrs.omegaHtml, locals);
        };
        return scope.$watch(getHtml, function(html) {
          element.html(html);
          return $compile(element.contents())(scope);
        });
      }
    };
  });

}).call(this);
