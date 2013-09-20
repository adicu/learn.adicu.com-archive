(function() {

'use strict'

angular.module('learnApp', ['ngAnimate'])
    .controller('BaseCtrl', ['$log', '$http', '$location', '$anchorScroll', '$timeout', '$scope', function($log, $http, $location, $anchorScroll, $timeout, $scope) {
        $scope.animations = {};

        $http.get('resources.json').success(function(data) {
            $scope.paths = data.paths;
            $scope.topics = data.topics;

            $scope.topics.topicIds = {};
            angular.forEach($scope.topics, function(topic, idx) {
                $scope.topics.topicIds[topic.name] = topic.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            });

        }).error(function(data) {
            // TODO: error handling for resources.json not available
            $log.error('Could not load resources.json');
        });

        $timeout(function() {
            $scope.animations.showJumbotron = true;
        }, 100);

        $scope.activateTopic = function(topic) {
            $log.log('activating', topic);
            $location.hash($scope.topics.topicIds[topic]);
            $anchorScroll();
        };
    }])
}());
