"use strict";

app.directive('favoriteSong', function(
    $rootScope,
    SCapiService,
    notificationFactory
) {
    return {
        restrict: 'A',
        scope: {
            favorite: "="
        },
        link: function($scope, elem, attrs) {
            var userId
                , songId;

            elem.bind('click', function() {
                userId = $rootScope.userId;
                songId = attrs.songId;

                if ( this.classList.contains('liked') ) {

                    SCapiService.deleteFavorite(userId, songId)
                        .then(function(status) {
                            if ( typeof status == "object" ) {
                                notificationFactory.success("Song removed from likes!");
                                $scope.favorite = false;
                            }
                        }, function() {
                            notificationFactory.error("Something went wrong!");
                        })
                } else {
                    SCapiService.saveFavorite(userId, songId)
                        .then(function(status) {
                            if ( typeof status == "object" ) {
                                notificationFactory.success("Song added to likes!");
                                $scope.favorite = true;
                            }
                        }, function(status) {
                            notificationFactory.error("Something went wrong!");
                        });
                }

            });
        }
    }
});