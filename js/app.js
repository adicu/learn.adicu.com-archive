(function() {

'use strict'

angular.module('learnApp', ['ngAnimate'])
    .controller('BaseCtrl', ['$log', '$http', '$q', '$location', '$anchorScroll', '$timeout', '$scope', function($log, $http, $q, $location, $anchorScroll, $timeout, $scope) {
        $scope.animations = {};
        $scope.topicLookupTable = {};

        $http.get('resources.json').success(function(data) {
            $scope.paths = data.paths;
            $scope.topics = data.topics;

            $scope.topics.topicIds = {};
            angular.forEach($scope.topics, function(topic, idx) {
                $scope.topics.topicIds[topic.name] = topic.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
                $scope.topicLookupTable[topic.name] = topic;
            });

        }).error(function(data) {
            // TODO: error handling for resources.json not available
            $log.error('Could not load resources.json');
        });

        $timeout(function() {
            $scope.animations.showJumbotron = true;
        }, 100);

        $scope.scrollToElement = function(selector, time, verticalOffset) {
            var promise = $q.defer();
            time = typeof(time) != 'undefined' ? time : 1000;
            verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            var element = $(selector);
            var offset = element.offset();
            var offsetTop = offset.top + verticalOffset;
            $('html, body').animate({
                scrollTop: offsetTop
            }, time, function() {
                promise.resolve();
            });

            return promise.promise;
        };

        $scope.activateTopic = function(topic) {
            $scope.scrollToElement('#' + $scope.topics.topicIds[topic], 500, 0).then(function(){
                $scope.topicLookupTable[topic].active = true;
            });
        };
    }])
}());
