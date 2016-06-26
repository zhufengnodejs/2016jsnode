angular.module('techNodeApp').controller('RoomsCtrl',[ '$rootScope','$scope', '$location', 'socket',function($rootScope,$scope, $location, socket) {
    //获取所有的房间
    socket.emit('getAllRooms');

    //获取所有的房间数据
    socket.on('roomsData', function (rooms) {
        $scope.rooms = $scope._rooms = rooms;
    })

    //搜索房间
    $scope.searchRoom = function () {
        if ($scope.searchKey) {
            $scope.rooms = $scope._rooms.filter(function (room) {
                return room.name.indexOf($scope.searchKey) > -1
            })
        } else {
            $scope.rooms = $scope._rooms;
        }
    }

    //创建新房间
    $scope.createRoom = function () {
        socket.emit('createRoom', {
            name: $scope.searchKey
        })
    }

    //添加新房间
    socket.on('rooms.add', function (room) {
        $scope._rooms.push(room)
        $scope.searchRoom();
    })

    //登陆成功
    $scope.$on('login', function (evt, me) {
        socket.on('joinRoom.' + me._id, function (join) {
            $location.path('/rooms/' + join.room._id)
        })
    })

    //进入房间
    $scope.enterRoom = function (room) {
        socket.emit('joinRoom', {
            user: $rootScope.me,
            room: room
        })
    }

    //其它用户加入房间
    socket.on('joinRoom', function (join) {
        $scope.rooms.forEach(function (room) {
            if (room._id == join.room._id) {
                room.users.push(join.user)
            }
        })
    })

    socket.on('leaveRoom', function(leave) {
        var _userId = leave.user._id;
        $scope.rooms.forEach(function (room) {
            if (room._id == leave.room._id) {
                room.users.splice(room.users.indexOf(leave.user._id),1);
            }
        })
    })
}])